import React from "react";
import { useParams } from "react-router";

import { PAGES_FLAT } from "../store/pages.ts";
import CurrentPageContext from "../store/provider/pageContext/CurrentPageContext.tsx";
import MainLayout from "./template/MainLayout.tsx";

const Page: React.FC = () => {
  const { p1, p2 } = useParams();
  const id = [p1, p2].filter(Boolean).join("-");
  const mainPage = PAGES_FLAT[p1 as string];
  const isMainPage = !p2;
  const page = PAGES_FLAT[id] || {
    title: "404",
    content: "Page not found",
  };

  return (
    <MainLayout supTitle={!isMainPage ? mainPage.title : ""} title={page.title}>
      <React.Fragment>
        <CurrentPageContext title={page.title}>
          <p>Content Page About {page.title}</p>
        </CurrentPageContext>
        {page.content}
      </React.Fragment>
    </MainLayout>
  );
};

export default Page;
