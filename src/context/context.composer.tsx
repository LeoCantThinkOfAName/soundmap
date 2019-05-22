import React from "react";

// context

interface Proptypes {
  children: JSX.Element;
}

function ProviderComposer({
  contexts,
  children,
}: {
  contexts: any;
  children: Proptypes;
}) {
  return contexts.reduceRight(
    (kids: Proptypes, parent: any) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function ContextProvider({ children }: { children: Proptypes }) {
  return <ProviderComposer contexts={[]}>{children}</ProviderComposer>;
}

export { ContextProvider };
