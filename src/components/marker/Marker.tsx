import React, { useContext, useEffect } from "react";

// types
import { InfoTypes } from "./../../interfaces/InfoInterface";

// context
import { MainContext } from "./../../context/MainContext";

// style
import style from "./marker.module.scss";

interface propType {
  info: any;
  id: string;
  lat: number;
  lng: number;
}

export default function Marker({ info, id }: propType) {
  const { current, setCurrent } = useContext(MainContext);

  useEffect(() => {}, []);

  const handleClick = (info: InfoTypes) => {
    window.history.pushState(
      null,
      null,
      `/${info.name.replace(/\s+/g, "-")}/${id}`
    );
    setCurrent(info);
  };

  return (
    <div
      onClick={() => handleClick(info)}
      className={`${style.marker} ${
        current && current.id === info.id ? style.active : null
      }`}
    >
      <span className={style.label}>
        <span>{info.name}</span>
      </span>
    </div>
  );
}
