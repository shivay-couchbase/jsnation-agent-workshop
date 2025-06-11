const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

class FeatureExtractionGemini {
  private postApi = async (text: string): Promise<Array<number>> => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${API_KEY}`;

    const requestBody = {
      model: "models/text-embedding-004",
      content: {
        parts: [{ text }],
      },
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const body: { embedding: { values: Array<number> } } = await resp.json();
    return body.embedding.values;
  };
  public extract = async (text: string): Promise<Array<number>> => {
    if (!API_KEY) {
      throw new Error("GOOGLE_AI_STUDIO_API_KEY is required in localStorage");
    }
    return await this.postApi(text);
  };
}

export default FeatureExtractionGemini;
