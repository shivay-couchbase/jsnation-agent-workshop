import React from "react";

import parseXmlFunctionCalls from "../../utils/agent/parseXmlFunctionCalls.ts";
import { Tool } from "../../utils/agent/tool.ts";
import toolsToSystemPrompt from "../../utils/agent/toolsToSystemPrompt.ts";
import WebLLM from "../llm/WebLLM.ts";

class Agent {
  private llm = new WebLLM();

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
    const conversation = this.llm.createConversation(
      `${systemPrompt}\n\n${toolsToSystemPrompt(this.tools)}`
    );
    let nextPrompt: string = userPrompt;
    let finalAnswer: string = "";
    let round = 0;

    while (nextPrompt && round < maxRounds) {
      const response = await conversation.generate(nextPrompt, 0);
      const parsed = parseXmlFunctionCalls(response);

      const toolsToCall = parsed.functionCalls
        .filter((func) => func.name in this.tools)
        .map((func) => this.tools[func.name].execute(func.parameters));

      if (toolsToCall.length === 0) {
        nextPrompt = "";
        finalAnswer = parsed.cleanText;
        continue;
      }

      const functionResults = await Promise.all(toolsToCall);
      nextPrompt = functionResults
        .map((result) => {
          if (result.render && renderCallback) {
            renderCallback(result.render());
          }
          return result.nextPrompt;
        })
        .filter(Boolean)
        .join("\n\n");
    }

    return (
      finalAnswer ||
      "Tell the user that you have not been able to answer the question"
    );
  };
}

export default Agent;
