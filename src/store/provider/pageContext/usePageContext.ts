import React from "react";

import PageContext from "./PageContext.tsx";

const usePageContext = () => {
  const pageContext = React.use(PageContext);
  if (!pageContext) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return pageContext;
};

export default usePageContext;
