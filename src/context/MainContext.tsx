import React, { createContext, useState, useEffect } from "react";

// types
import { InfoTypes } from "./../interfaces/InfoInterface";

export const MainContext = createContext<any>(null);

export default function MainProvider({ children }: any) {
  const [current, setCurrent] = useState<InfoTypes | undefined>(undefined);
  const [tracks, setTracks] = useState([]);
  const [play, setPlay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const contentful = require("contentful");
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE,
      accessToken: process.env.REACT_APP_CONTENTFUL_API,
    });
    client
      .getEntries({ content_type: "track" })
      .then((res: any) => setTracks(res.items))
      .catch((err: any) => console.log(err));
  }, []);

  return (
    <MainContext.Provider
      value={{
        current,
        setCurrent,
        tracks,
        setTracks,
        play,
        setPlay,
        loop,
        setLoop,
        shuffle,
        setShuffle,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
