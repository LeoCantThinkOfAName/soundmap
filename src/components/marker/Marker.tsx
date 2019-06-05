import React, { memo, useContext } from "react";

// types
import { InfoTypes } from "./../../interfaces/InfoInterface";

// context
import { MainContext } from "./../../context/MainContext";
import { MapContext } from "./../../context/MapContext";

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
  const { setCenter } = useContext(MapContext);

  const handleClick = () => {
    window.history.pushState(
      null,
      null,
      `/${item.fields.name.replace(/\s+/g, "-")}/${id}`
    );
    setCurrent(item);
    setCenter({
      lat: item.fields.coord.lat,
      lng: item.fields.coord.lon,
    });
  };

  return (
    <div
      onClick={() => handleClick()}
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
