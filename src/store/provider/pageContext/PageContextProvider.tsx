import React from "react";

import PageContext from "./PageContext.tsx";

const PageContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pageContext, setPageContext] = React.useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  return (
    <PageContext value={{ pageContext, setPageContext }}>
      {children}
    </PageContext>
  );
};

export default PageContextProvider;
