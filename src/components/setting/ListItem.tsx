import React from "react";

// style
import style from "./setting.module.scss";

export default function ListItem(item: any) {
  return (
    <li key={item.sys.id} className={style["item"]}>
      <button
        className={style["like-btn"]}
        title={`Unlike ${item.fields.name}`}
      >
        <i className="sm-heart" />
      </button>
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
        >
          <i className="sm-compass" />
        </button>
        <button
          className={[style["list-btn"], style["play"]].join(" ")}
          title={`Play This Track.`}
        >
          <i className="sm-play" />
        </button>
      </div>
    </li>
  );
}
