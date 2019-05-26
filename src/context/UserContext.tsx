import React, { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
