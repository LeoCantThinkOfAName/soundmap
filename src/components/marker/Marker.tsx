import React, { useContext, useEffect } from "react";

// types
import { InfoTypes } from "./../../interfaces/InfoInterface";

// context
import { MainContext } from "./../../context/MainContext";

// style
import style from "./marker.module.scss";

interface propsTypes {
  info: any;
  lat: number;
  lng: number;
}

export default function Marker({ info, lat, lng }: propsTypes) {
  const { current, setCurrent } = useContext(MainContext);

  useEffect(() => {}, []);

  const handleClick = (info: InfoTypes) => {
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
