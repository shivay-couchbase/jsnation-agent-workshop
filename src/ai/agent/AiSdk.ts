import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { z } from "zod";

const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey: API_KEY,
});

class AiSdk {
  public generateText = async (systemPrompt: string, userPrompt: string) => {
    const { text } = await generateText({
      system: systemPrompt,
      model: google("models/gemini-2.0-flash-exp"),
      prompt: userPrompt,
    });

    return text;
  };

  public generateObject = async (systemPrompt: string, userPrompt: string) => {
    const { object } = await generateObject({
      system: systemPrompt,
      model: google("models/gemini-2.0-flash-exp"),
      prompt: userPrompt,
      schema: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          date: z
            .string()
            .date()
            .transform((value) => new Date(value))
            .optional(),
        })
      ),
    });

    console.log(object);

    return object.map((movie) => movie.title).join(", ");
  };
}

export default AiSdk;
