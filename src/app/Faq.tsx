import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React from "react";

import { FAQ_WITH_ID } from "../store/faq.ts";
import CurrentPageContext from "../store/provider/pageContext/CurrentPageContext.tsx";
import MainLayout from "./template/MainLayout.tsx";

const Faq: React.FC = () => {
  const [openIndices, setOpenIndices] = useQueryState(
    "openFaq",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [shouldScroll, setShouldScroll] = React.useState<boolean>(true);

  const toggleDisclosure = (id: string) => {
    setShouldScroll(false);
    setOpenIndices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    window.setTimeout(() => setShouldScroll(true), 100);
  };

  React.useEffect(() => {
    if (openIndices.length && shouldScroll) {
      const el = document.getElementById(openIndices[0]);
      if (el) {
        window.setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = el.getBoundingClientRect().top;
          const buttonEl = document.getElementById(
            `disclosure-${openIndices[0]}-closed`
          );
          if (buttonEl) buttonEl.click();
          window.scrollTo({
            top: elementPosition + window.pageYOffset - headerOffset,
            behavior: "smooth",
          });
          window.setTimeout(() => {
            const blinkClasses = ["bg-indigo-900/40"];
            el.classList.add("transition");
            el.classList.add("duration-400");
            blinkClasses.map((className) => el.classList.add(className));
            window.setTimeout(() => {
              blinkClasses.map((className) => el.classList.remove(className));
            }, 200);
          }, 400);
        }, 100);
      }
    }
  }, [openIndices]);

  return (
    <MainLayout supTitle="Customer Services" title="Frequently Asked Questions">
      <React.Fragment>
        <CurrentPageContext title="FAQ">
          <p>The page contains a list of all the FAQs</p>
        </CurrentPageContext>
        {FAQ_WITH_ID.map((faq) => (
          <div className="mt-8 first:mt-16" key={faq.title}>
            <h2 className="mb-8">{faq.title}</h2>
            <dl className="divide-y divide-gray-900/10">
              {faq.questions.map((question, i) => (
                <Disclosure
                  key={i}
                  as="div"
                  className="group border-gray-900/10 py-6"
                  id={question.id}
                >
                  {({ open }) => (
                    <React.Fragment>
                      <dt>
                        <DisclosureButton
                          id={`disclosure-${question.id}-${open ? "open" : "closed"}`}
                          onClick={() => toggleDisclosure(question.id)}
                          className="flex w-full cursor-pointer items-start justify-between text-left text-gray-900"
                        >
                          <span className="text-base/7 font-semibold">
                            {question.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-6 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="hidden size-6 group-data-[open]:block"
                            />
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel
                        as="dd"
                        className="mt-2 border-gray-900 pr-12"
                      >
                        <p className="text-base/7 text-gray-600">
                          {question.answer}
                        </p>
                      </DisclosurePanel>
                    </React.Fragment>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        ))}
      </React.Fragment>
    </MainLayout>
  );
};

export default Faq;
