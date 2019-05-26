import React, { createContext, useState } from "react";

// types
import { InfoTypes } from "./../interfaces/InfoInterface";

export const MainContext = createContext<any>(null);

export default function MainProvider({ children }: any) {
  const [current, setCurrent] = useState<InfoTypes | undefined>(undefined);

  return (
    <MainContext.Provider value={{ current, setCurrent }}>
      {children}
    </MainContext.Provider>
  );
}
