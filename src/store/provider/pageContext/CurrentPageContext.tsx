import React from "react";
import { renderToString } from "react-dom/server";
import showdown from "showdown";

import usePageContext from "./usePageContext.ts";

const converter = new showdown.Converter();

const CurrentPageContext: React.FC<{
  title: string;
  children: React.ReactElement | string | Array<React.ReactNode | string>;
}> = ({ title, children }) => {
  const { setPageContext } = usePageContext();
  React.useEffect(() => {
    const html = renderToString(children);
    const htmlWithoutComments = html.replace(/<!--.*?-->/g, "");
    const md = converter
      .makeMarkdown(htmlWithoutComments)
      .replace(/<!--.*?-->/g, "");
    setPageContext({
      title,
      content: md,
    });
  }, [children, setPageContext]);
  return null;
};

export default CurrentPageContext;
