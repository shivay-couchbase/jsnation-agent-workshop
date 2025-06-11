import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { checkWebLLMStorage, formatBytes, clearWebLLMCache, ModelStorageInfo } from "../../utils/checkWebLLMStorage";

const StorageDebugger: React.FC = () => {
  const [storageInfo, setStorageInfo] = React.useState<ModelStorageInfo | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const checkStorage = async () => {
    setIsLoading(true);
    try {
      const info = await checkWebLLMStorage();
      setStorageInfo(info);
    } catch (error) {
      console.error('Failed to check storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCache = async () => {
    if (confirm('Are you sure you want to clear the WebLLM model cache? This will require re-downloading the model.')) {
      setIsLoading(true);
      try {
        await clearWebLLMCache();
        await checkStorage(); // Refresh info
        alert('Cache cleared successfully');
      } catch (error) {
        console.error('Failed to clear cache:', error);
        alert('Failed to clear cache');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Show debug info if in development or if VITE_USE_WEBLLM is enabled
  const showDebugger = import.meta.env.DEV || import.meta.env.VITE_USE_WEBLLM === 'true';

  if (!showDebugger) return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition"
        title="Storage Debugger"
      >
        <InformationCircleIcon className="size-5" />
      </button>

      {isVisible && (
        <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-xl p-4 min-w-80 max-w-md">
          <h3 className="font-bold text-lg mb-3">WebLLM Storage Info</h3>
          
          <div className="space-y-2 mb-4">
            <button
              onClick={checkStorage}
              disabled={isLoading}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Checking...' : 'Check Storage'}
            </button>
            
            {storageInfo && (
              <button
                onClick={handleClearCache}
                disabled={isLoading}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 ml-2"
              >
                Clear Cache
              </button>
            )}
          </div>

          {storageInfo && (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Model Cached:</span>
                <span className={storageInfo.isModelCached ? 'text-green-600' : 'text-red-600'}>
                  {storageInfo.isModelCached ? '✅ Yes' : '❌ No'}
                </span>
                
                <span className="font-medium">Storage Used:</span>
                <span>{formatBytes(storageInfo.storageUsage)}</span>
                
                <span className="font-medium">Storage Quota:</span>
                <span>{formatBytes(storageInfo.storageQuota)}</span>
                
                <span className="font-medium">Usage %:</span>
                <span>
                  {storageInfo.storageQuota > 0 
                    ? `${((storageInfo.storageUsage / storageInfo.storageQuota) * 100).toFixed(1)}%`
                    : 'Unknown'
                  }
                </span>
              </div>

              {storageInfo.modelFiles.length > 0 && (
                <details className="mt-3">
                  <summary className="font-medium cursor-pointer">
                    Model Files ({storageInfo.modelFiles.length})
                  </summary>
                  <div className="mt-2 max-h-32 overflow-y-auto">
                    {storageInfo.modelFiles.map((file, index) => (
                      <div key={index} className="text-xs text-gray-600 truncate">
                        {file}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}

          <div className="mt-3 pt-3 border-t text-xs text-gray-500">
            Using {import.meta.env.VITE_USE_WEBLLM === 'true' ? 'WebLLM' : 'Gemini'} Agent
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageDebugger; 