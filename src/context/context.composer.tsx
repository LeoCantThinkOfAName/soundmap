import React from "react";

// contexts
import MainProvider from "./MainContext";
import UserProvider from "./UserContext";

function ProviderComposer({
  contexts,
  children,
}: {
  contexts: any;
  children: any;
}) {
  return contexts.reduceRight(
    (kids: any, parent: any) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function ContextProvider({ children }: { children: any }) {
  return (
    <ProviderComposer contexts={[<MainProvider />, <UserProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
