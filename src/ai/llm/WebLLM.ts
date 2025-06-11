import {
  ChatCompletionMessageParam,
  CreateMLCEngine,
  MLCEngine,
} from "@mlc-ai/web-llm";

import { GEMMA_2_9B_CONFIG } from "../../utils/agent/webllm.ts";

class WebLLM {
  private engine: MLCEngine | null = null;

  public createConversation = (systemPrompt: string) => {
    const messages: Array<ChatCompletionMessageParam> = [
      { role: "system", content: systemPrompt },
    ];

    console.log("-- SYSTEM PROMPT --");
    console.log(systemPrompt);

    return {
      generate: async (prompt: string, temperature: number = 1) => {
        messages.push({ role: "user", content: prompt });
        console.log("-- MESSAGES --");
        console.log(messages);

        if (!this.engine) {
          /*
          this.engine = await CreateMLCEngine(GEMMA_2_2B_ID,{
            initProgressCallback: console.log,
          });
           */
          this.engine = await CreateMLCEngine(GEMMA_2_9B_CONFIG.model_id, {
            initProgressCallback: console.log,
            appConfig: {
              model_list: [GEMMA_2_9B_CONFIG],
            },
          });
        }

        await this.engine.chat.completions.create({
          messages,
          temperature,
        });
        const response = await this.engine.getMessage();

        messages.push({ role: "assistant", content: response });
        return response;
      },
    };
  };
}

export default WebLLM;
