import { FeatureExtractionPipeline, pipeline } from "@huggingface/transformers";

class FeatureExtraction {
  private pipeline: FeatureExtractionPipeline | null = null;

  public extract = async (text: string): Promise<Array<number>> => {
    if (!this.pipeline) {
      this.pipeline = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
        {
          progress_callback: console.log,
          device: "webgpu",
        }
      );
    }
    const output = await this.pipeline(text, {
      pooling: "mean",
      normalize: true,
    });

    return output.tolist()[0];
  };
}

export default FeatureExtraction;
