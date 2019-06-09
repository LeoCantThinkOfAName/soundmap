import React from "react";

// context provider
import { ContextProvider } from "./context/context.composer";

// i18n
import "./i18n/i18n";

// styles
import "./styles/baseStyle.scss";

// components
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
};

export default App;
