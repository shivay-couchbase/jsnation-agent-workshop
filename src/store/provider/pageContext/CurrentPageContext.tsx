import React from "react";
import { renderToString } from "react-dom/server";

import htmlToMd from "../../../utils/converter/htmlToMd.ts";
import usePageContext from "./usePageContext.ts";

const CurrentPageContext: React.FC<{
  title: string;
  children: React.ReactElement | string | Array<React.ReactNode | string>;
}> = ({ title, children }) => {
  const { setPageContext } = usePageContext();
  React.useEffect(() => {
    const html = renderToString(children);
    const htmlWithoutComments = html.replace(/<!--.*?-->/g, "");
    const md = htmlToMd(htmlWithoutComments).replace(/<!--.*?-->/g, "");
    setPageContext({
      title,
      content: md,
    });
  }, [children, setPageContext]);
  return null;
};

export default CurrentPageContext;
