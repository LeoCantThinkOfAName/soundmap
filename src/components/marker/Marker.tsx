import React, { memo, useContext, useEffect } from "react";

// types
import { InfoTypes } from "./../../interfaces/InfoInterface";

// context
import { MainContext } from "./../../context/MainContext";

// style
import style from "./marker.module.scss";

interface propType {
  item: any;
  id: string;
  lat: number;
  lng: number;
}

export default memo(function Marker({ item, id }: propType) {
  const { current, setCurrent } = useContext(MainContext);
  const handleClick = (info: InfoTypes) => {
    window.history.pushState(
      null,
      null,
      `/${item.fields.name.replace(/\s+/g, "-")}/${id}`
    );
    setCurrent(item);
  };

  return (
    <div
      onClick={() => handleClick(item)}
      className={`${style.marker} ${
        current && current.sys.id === id ? style.active : null
      }`}
    >
      <span className={style.label}>
        <span>{item.fields.name}</span>
      </span>
    </div>
  );
});
