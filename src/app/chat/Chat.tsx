import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

import { Loader } from "../../theme";
import cn from "../../utils/classnames.ts";
import ChatForm from "./ChatForm.tsx";

const Chat: React.FC = () => {
  const [chatOpen, setChatOpen] = React.useState<boolean>(false);

  const [thinking, setThinking] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<string>("");

  return (
    <React.Fragment>
      <div
        className={cn(
          "fixed right-4 bottom-24 flex w-md origin-bottom-right flex-col gap-4 rounded-lg border border-purple-400 bg-purple-50 p-6 shadow-xl transition duration-300",
          {
            "translate-x-0 translate-y-16 scale-15 opacity-0": !chatOpen,
          }
        )}
      >
        <h3 className="flex items-center gap-2">
          <SparklesIcon aria-hidden="true" className="size-4" /> Ask the Agent
        </h3>
        <ChatForm
          chatOpen={chatOpen}
          onSubmit={async (prompt) => {
            if (!prompt) {
              setResponse("");
              return;
            }
            setThinking(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setResponse(prompt);
            setThinking(false);
          }}
        />
        {(response.length !== 0 || thinking) && (
          <div className="mt-4">
            {thinking ? (
              <p className="flex items-center gap-3 font-light text-gray-500 italic">
                <Loader size={4} /> thinking..
              </p>
            ) : (
              <p className="font-light text-gray-700 [&>li]:ml-5 [&>ol]:my-2 [&>ol]:ml-4 [&>ol]:list-decimal [&>ul]:my-2 [&>ul]:ml-5 [&>ul]:list-disc">
                {response}
              </p>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => setChatOpen((open) => !open)}
        className="fixed right-4 bottom-4 grid cursor-pointer rounded-full bg-purple-900 p-3 text-white outline-2 outline-offset-4 outline-purple-300 transition hover:outline-4 hover:outline-purple-900 focus:outline-4 focus:outline-purple-900"
      >
        <XMarkIcon
          aria-hidden="true"
          className={cn("col-start-1 row-start-1 size-8 transition", {
            "rotate-90 opacity-0": !chatOpen,
          })}
        />
        <SparklesIcon
          aria-hidden="true"
          className={cn("col-start-1 row-start-1 size-8 transition", {
            "-rotate-90 opacity-0": chatOpen,
          })}
        />
      </button>
    </React.Fragment>
  );
};

export default Chat;
