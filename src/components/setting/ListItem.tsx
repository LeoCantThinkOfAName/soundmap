import React, { useContext } from "react";

// components
import LikeButton from "./../likeButton/LikeButton";

// style
import style from "./setting.module.scss";

export default function ListItem(
  item: any,
  setMapProps: any,
  mapProps: any,
  setCurrent: any
) {
  const handleNav = (target: any) => {
    setMapProps({
      ...mapProps,
      center: {
        lat: item.fields.coord.lat,
        lng: item.fields.coord.lon,
      },
    });
  };

  const handlePlay = (target: any) => {
    const audio = document.querySelector("audio");
    audio.src = item.fields.audio;
    setCurrent(target);
    audio.addEventListener("canplaythrough", () => {
      audio.play();
    });
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
        <button
          className={[style["list-btn"], style["navigate"]].join(" ")}
          title={`Go to ${item.fields.name}`}
          onClick={() => handleNav(item)}
        >
          <i className="sm-compass" />
        </button>
        <button
          className={[style["list-btn"], style["play"]].join(" ")}
          title={`Play This Track.`}
          onClick={() => handlePlay(item)}
        >
          <i className="sm-play" />
        </button>
      </div>
    </li>
  );
}
