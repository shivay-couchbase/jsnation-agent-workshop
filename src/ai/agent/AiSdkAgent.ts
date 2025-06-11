import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { tool as aiSdkTool, generateText } from "ai";
import React from "react";

import { Tool } from "../../utils/agent/tool.ts";

const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey: API_KEY,
});

class AiSdkAgent {
  private tools: Record<string, Tool> = {};

  public addTool = (name: string, tool: Tool) => {
    this.tools[name] = tool;
  };
  public processPrompt = async (
    systemPrompt: string,
    userPrompt: string,
    maxRounds: number = 5,
    renderCallback?: (element: React.ReactElement) => void
  ) => {
    const tools = Object.entries(this.tools).reduce(
      (acc, [name, tool]) => ({
        ...acc,
        [name]: aiSdkTool({
          description: tool.description,
          parameters: tool.parameters,
          execute: async (data) => {
            const result = await tool.execute(data);
            if (result.render && renderCallback) {
              renderCallback(result.render());
            }
            return result.nextPrompt;
          },
        }),
      }),
      {}
    );

    const { text } = await generateText({
      system: systemPrompt,
      model: google("models/gemini-2.0-flash-exp"),
      prompt: userPrompt,
      tools,
      maxSteps: maxRounds,
    });

    return text;
  };
}

export default AiSdkAgent;
