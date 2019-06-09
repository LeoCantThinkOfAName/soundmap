import React from "react";
import { Translation } from "react-i18next";

// components
import LikeButton from "./../likeButton/LikeButton";

// style
import style from "./setting.module.scss";

export default function ListItem(
  item: any,
  setCurrent: any,
  setPlay: any,
  setCenter: any
) {
  const handleNav = () => {
    setCenter({
      lat: item.fields.coord.lat,
      lng: item.fields.coord.lon,
    });
  };

  const handlePlay = () => {
    setCurrent(item);
    setCenter({
      lat: item.fields.coord.lat,
      lng: item.fields.coord.lon,
    });
    setPlay(true);
  };

  return (
    <li key={item.sys.id} className={style["item"]}>
      <LikeButton item={item} liked={true} />
      <p
        title={`${item.fields.name}, ${item.fields.date} by ${
          item.fields.author
        }`}
      >
        {item.fields.name}
      </p>
      <div>
        <Translation>
          {t => (
            <button
              className={[style["list-btn"], style["navigate"]].join(" ")}
              title={`${t("buttons.goto")} ${item.fields.name}`}
              onClick={() => handleNav()}
            >
              <i className="sm-compass" />
            </button>
          )}
        </Translation>
        <Translation>
          {t => (
            <button
              className={[style["list-btn"], style["play"]].join(" ")}
              title={`${t("buttons.play")} This Track.`}
              onClick={() => handlePlay()}
            >
              <i className="sm-play" />
            </button>
          )}
        </Translation>
      </div>
    </li>
  );
}
