import React from "react";

const PageContext = React.createContext<{
  pageContext: { title: string; content: string };
  setPageContext: (pageContext: { title: string; content: string }) => void;
}>({
  pageContext: {
    title: "",
    content: "",
  },
  setPageContext: () => {},
});

export default PageContext;
