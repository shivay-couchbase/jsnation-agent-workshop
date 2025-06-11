interface MessagePart {
  role: "user" | "system" | "model";
  content: string;
}

interface Part {
  text: string;
}

interface Content {
  parts: Part[];
  role: string;
}

interface Candidate {
  content: Content;
  finishReason: string;
  avgLogprobs: number;
}

interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

export interface GeminiResponse {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
}

const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

class GeminiLlm {
  private postApi = async (
    messages: Array<MessagePart>,
    temperature: number = 1
  ): Promise<string> => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const requestBody = {
      contents: messages.map((m) => ({
        role: m.role === "user" || m.role === "system" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature },
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const body: GeminiResponse = await resp.json();

    return body.candidates[0].content.parts[0].text;
  };

  public createConversation = (systemPrompt: string) => {
    if (!API_KEY) {
      throw new Error("env VITE_GOOGLE_GENERATIVE_AI_API_KEY is required");
    }
    const messages: Array<MessagePart> = [
      { role: "system", content: systemPrompt },
    ];

    return {
      generate: async (
        prompt: string,
        callback: (text: string) => void = () => {}
      ) => {
        messages.push({ role: "user", content: prompt });
        const generated = await this.postApi(messages);
        messages.push({ role: "model", content: generated });
        callback(generated);
        return generated;
      },
    };
  };
}

export default GeminiLlm;
