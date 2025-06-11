import React from "react";

import Title from "./main/Title.tsx";

const MainLayout: React.FC<{
  wide?: boolean;
  supTitle?: string;
  title: string;
  children: React.ReactElement | string | Array<React.ReactElement>;
}> = ({ wide = false, supTitle = "", title, children }) => (
  <div className="bg-white">
    <div className="border-b border-gray-200 bg-gray-50 px-4 lg:px-8">
      <div
        className={`mx-auto ${wide ? "max-w-7xl" : "max-w-3xl"} text-base/7 text-gray-700`}
      >
        <div className="py-24">
          <Title supTitle={supTitle} title={title} />
        </div>
      </div>
    </div>
    <div className="bg-white px-6 py-16 lg:px-8">
      <div
        className={`mx-auto ${wide ? "max-w-7xl" : "max-w-3xl"} text-base/7 text-gray-700`}
      >
        <div className="mt-6 text-xl/8">
          {typeof children === "string" ? <p>{children}</p> : children}
        </div>
      </div>
    </div>
  </div>
);

export default MainLayout;
