/**
 * Utility to check WebLLM model storage status
 */

export interface ModelStorageInfo {
  isModelCached: boolean;
  totalStorageUsed: number;
  modelFiles: string[];
  storageQuota: number;
  storageUsage: number;
}

/**
 * Check if WebLLM models are downloaded and cached
 */
export const checkWebLLMStorage = async (): Promise<ModelStorageInfo> => {
  try {
    // Check IndexedDB for model cache
    const databases = await indexedDB.databases();
    const mlcCache = databases.find(db => 
      db.name?.includes('mlc') || 
      db.name?.includes('webllm') ||
      db.name?.includes('cache')
    );

    // Check storage quota and usage
    const storageEstimate = await navigator.storage.estimate();
    const totalStorageUsed = storageEstimate.usage || 0;
    const storageQuota = storageEstimate.quota || 0;

    // Check if we have significant storage usage (likely models)
    const isModelCached = totalStorageUsed > 1000000000; // > 1GB suggests models are cached

    // Try to get more specific cache info
    let modelFiles: string[] = [];
    
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        const modelCaches = cacheNames.filter(name => 
          name.includes('model') || 
          name.includes('mlc') || 
          name.includes('webllm')
        );
        
        for (const cacheName of modelCaches) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          modelFiles.push(...requests.map(req => req.url));
        }
      } catch (error) {
        console.warn('Could not access cache API:', error);
      }
    }

    return {
      isModelCached,
      totalStorageUsed,
      modelFiles,
      storageQuota,
      storageUsage: totalStorageUsed,
    };
  } catch (error) {
    console.error('Error checking WebLLM storage:', error);
    return {
      isModelCached: false,
      totalStorageUsed: 0,
      modelFiles: [],
      storageQuota: 0,
      storageUsage: 0,
    };
  }
};

/**
 * Format bytes to human readable format
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Clear WebLLM model cache
 */
export const clearWebLLMCache = async (): Promise<boolean> => {
  try {
    // Clear IndexedDB
    const databases = await indexedDB.databases();
    for (const db of databases) {
      if (db.name?.includes('mlc') || db.name?.includes('webllm')) {
        const deleteRequest = indexedDB.deleteDatabase(db.name);
        await new Promise((resolve, reject) => {
          deleteRequest.onsuccess = () => resolve(true);
          deleteRequest.onerror = () => reject(deleteRequest.error);
        });
      }
    }

    // Clear Cache API
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const modelCaches = cacheNames.filter(name => 
        name.includes('model') || 
        name.includes('mlc') || 
        name.includes('webllm')
      );
      
      await Promise.all(modelCaches.map(name => caches.delete(name)));
    }

    return true;
  } catch (error) {
    console.error('Error clearing WebLLM cache:', error);
    return false;
  }
}; 