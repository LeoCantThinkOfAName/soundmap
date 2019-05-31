import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext<any>(null);

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState(undefined);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    if (user) {
      const contentful = require("contentful");
      const client = contentful.createClient({
        space: "3agv0fuye263",
        accessToken: "JoOiDz4xFPFXPDuhqr9WH20slpNro9adrTnaF74cjzo",
      });
      client
        .getEntries({
          content_type: "user",
          "fields.gid[in]": `${parseInt(user.id)}`,
        })
        .then((res: any) => setFavorite(res.items[0].fields.favorite))
        .catch((err: any) => console.log(err));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, favorite, setFavorite }}>
      {children}
    </UserContext.Provider>
  );
}
