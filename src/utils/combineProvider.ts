import React from "react";

const combineProvider = (...components: Array<any>): any =>
  components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      ({ children }: { children: Array<React.ReactNode> }) =>
        React.createElement(
          AccumulatedComponents,
          {},
          React.createElement(CurrentComponent, {}, children)
        ),
    ({ children }: { children: Array<React.ReactNode> }) =>
      React.createElement(React.Fragment, {}, children)
  );

export default combineProvider;
