import React from "react";

const Title: React.FC<{ supTitle?: string; title: string }> = ({
  supTitle = "",
  title,
}) => (
  <React.Fragment>
    {Boolean(supTitle) && (
      <p className="text-base/7 font-semibold text-indigo-600">{supTitle}</p>
    )}
    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
      {title}
    </h1>
  </React.Fragment>
);

export default Title;
