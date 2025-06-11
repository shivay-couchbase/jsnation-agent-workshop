import React from "react";
import { z } from "zod";

export type ToolParameters = z.ZodTypeAny;

export type Tool<PARAMETERS extends ToolParameters = any> = {
  description?: string;
  parameters: PARAMETERS;
  execute: (args: z.infer<PARAMETERS>) => Promise<{
    nextPrompt: string;
    render?: () => React.ReactElement;
  }>;
  examples: Array<{ query: string; parameters: z.infer<PARAMETERS> }>;
};

const tool = <PARAMETERS extends ToolParameters>(
  definition: Tool<PARAMETERS>
): Tool<PARAMETERS> => definition;

export default tool;
