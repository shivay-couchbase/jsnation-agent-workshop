import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ArrowRightIcon,
  CheckIcon,
  LinkIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { NavLink, useNavigate } from "react-router";
import { z } from "zod";

import AiSdkAgent from "../../ai/agent/AiSdkAgent.ts";
import findSimilarFAQs from "../../ai/vectorSearch/findSimilarFAQs.ts";
import { Category, Color, Size } from "../../store/products.ts";
import usePageContext from "../../store/provider/pageContext/usePageContext.ts";
import { Loader } from "../../theme";
import tool from "../../utils/agent/tool.ts";
import cn from "../../utils/classnames.ts";
import mdToHtml from "../../utils/converter/mdToHtml.ts";
import ChatForm from "./ChatForm.tsx";

const Chat: React.FC = () => {
  const [chatOpen, setChatOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { pageContext } = usePageContext();

  const [thinking, setThinking] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<string>("");
  const [callbackElements, setCallbackElements] = React.useState<
    Array<React.ReactElement>
  >([]);

  const agent = React.useMemo(() => {
    const agent = new AiSdkAgent();

    agent.addTool(
      "openProductOverview",
      tool({
        description: "open the product overview page with the given filters",
        parameters: z.object({
          categories: z
            .array(z.nativeEnum(Category))
            .describe("The categories of the products to display")
            .optional(),
          colors: z
            .array(z.nativeEnum(Color))
            .describe("The colors of the products to display")
            .optional(),
          sizes: z
            .array(z.nativeEnum(Size))
            .describe("The sizes of the products to display")
            .optional(),
        }),
        execute: async (data) => {
          const query = Object.entries(data)
            .filter(([, value]) => value)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
          navigate(`/products?${query}`);
          return {
            nextPrompt: `Tell the user you just opened the product overview with ${query}`,
            render: () => (
              <p
                className={cn(
                  "flex items-center gap-3 rounded-lg border bg-white p-3 text-sm text-gray-500 shadow-md"
                )}
              >
                <CheckIcon className="size-8 text-lime-700" />
                <span>Open Product Overview with {query}</span>
              </p>
            ),
          };
        },
        examples: [
          {
            query: "Show me all the T-Shirts in L",
            parameters: {
              categories: [Category.CLOTHING],
              sizes: [Size.L],
            },
          },
          {
            query: "Show me all red and green products",
            parameters: {
              colors: [Color.RED, Color.GREEN],
            },
          },
        ],
      })
    );

    agent.addTool(
      "faqSearch",
      tool({
        description:
          "if the user asks any questions about the store, search for the right answer in the FAQs",
        parameters: z.object({
          question: z
            .string()
            .nonempty()
            .describe(
              "The exact question the user asked optimized for similarity search."
            ),
        }),
        execute: async ({ question }) => {
          const similarFAQs = await findSimilarFAQs(question);
          const nextPrompt = similarFAQs
            .map(
              (faq) =>
                `Here are more informations to answer the question:\n\n${faq.question + "\n" + faq.answer}`
            )
            .join("\n\n");
          return {
            nextPrompt,
            render: () => (
              <Disclosure
                key={similarFAQs.map((faq) => faq.id).join("-")}
                as="div"
                className="flex flex-col gap-1 rounded-lg border border-purple-300 bg-white p-3 text-sm"
              >
                <DisclosureButton className="group flex cursor-pointer items-center justify-between font-bold">
                  <span className="group-data-[hover]:text-black/80">
                    Sources ({similarFAQs.length})
                  </span>
                  <ChevronDownIcon className="size-4 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel
                  transition
                  as="ul"
                  className="mt-3 flex flex-col"
                >
                  {similarFAQs.map((faq) => (
                    <li
                      className="mt-2 border-t border-gray-200 pt-2 first:mt-0 first:border-0 first:pt-0"
                      key={faq.id}
                    >
                      <NavLink
                        className="group flex w-full items-center gap-1 text-purple-600"
                        to={`/services/faq?openFaq=${faq.id}`}
                      >
                        <LinkIcon className="size-4" />
                        <span>{faq.question}</span>
                        <ArrowRightIcon className="ml-auto size-4 -translate-x-1 opacity-0 transition group-hover:-translate-x-0 group-hover:opacity-100" />
                      </NavLink>
                    </li>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            ),
          };
        },
        examples: [
          {
            query: "What is the return policy?",
            parameters: {
              question: "What is the return policy?",
            },
          },
        ],
      })
    );

    return agent;
  }, [navigate]);

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
              setCallbackElements([]);
              return;
            }
            const systemPrompt = `You are a helpful AI ecommerce assistant
You help the user navigate through the website, find products, and answer questions about products and services.
Do not just make something up. Do not hallucinate.

# Current Page: ${pageContext.title}
${pageContext.content}`;

            setThinking(true);
            const resp = await agent.processPrompt(
              systemPrompt,
              prompt,
              4,
              (render) => setCallbackElements((prev) => [...prev, render])
            );
            setResponse(resp);
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
              <div className="flex flex-col gap-4">
                {callbackElements.map((element) => element)}
                <div
                  className="font-light text-gray-700 [&>li]:ml-5 [&>ol]:my-2 [&>ol]:ml-4 [&>ol]:list-decimal [&>ul]:my-2 [&>ul]:ml-5 [&>ul]:list-disc"
                  dangerouslySetInnerHTML={{ __html: mdToHtml(response) }}
                />
              </div>
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
