import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

import cn from "../../utils/classnames.ts";

const PLACEHOLDER = "How can I help you today?";

const ChatForm: React.FC<{
  className?: string;
  onSubmit: (prompt: string) => void;
  chatOpen: boolean;
}> = ({ className = "", onSubmit, chatOpen }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [activePrompt, setActivePrompt] = React.useState<string>("");
  const [placeholder, setPlaceholder] = React.useState<string>(PLACEHOLDER);

  React.useEffect(() => {
    if (chatOpen) {
      inputRef.current?.focus();
    }
  }, [chatOpen]);

  const onSubmitPrompt = (prompt: string) => {
    setActivePrompt(prompt);
    onSubmit(prompt);
    if (prompt === "") {
      setPlaceholder(PLACEHOLDER);
      window.setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className={cn(className, "flex items-center")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = inputRef.current;
          if (input?.value) {
            onSubmitPrompt(input.value);
            input.value = "";
          }
        }}
        className="relative flex w-full items-center justify-between gap-1 rounded-4xl border border-purple-300 bg-white p-2 shadow-lg"
      >
        {activePrompt ? (
          <p className="px-3 py-3 text-sm font-bold">{activePrompt}</p>
        ) : (
          <input
            ref={inputRef}
            className="flex w-full rounded-full p-3 text-sm focus:ring-1 focus:ring-purple-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={placeholder}
          />
        )}
        {activePrompt ? (
          <button
            type="button"
            onClick={() => onSubmitPrompt("")}
            className="cursor-pointer rounded-full p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <XMarkIcon className="size-5" />
          </button>
        ) : (
          <button className="cursor-pointer rounded-full bg-black p-3 text-white focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none">
            <PaperAirplaneIcon className="size-5" />
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatForm;
