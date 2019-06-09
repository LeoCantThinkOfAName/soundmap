import React, { createContext, useState, useEffect } from "react";

//helper function
import { fetchTracks } from "./fetchTracks";

// types
import { InfoTypes } from "./../interfaces/InfoInterface";

export const MainContext = createContext<any>(null);

export default function MainProvider({ children }: any) {
  const [current, setCurrent] = useState<InfoTypes | undefined>(undefined);
  const [tracks, setTracks] = useState([]);
  const [play, setPlay] = useState(false);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    fetchTracks("zh-Hant-TW", (data: any) => setTracks(data));
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
