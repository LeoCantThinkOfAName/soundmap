import React, { useState, memo } from "react";

// types
import { InfoTypes } from "./../../interfaces/InfoInterface";

// data
import likes from "../map/data.json";

// styles
import style from "./setting.module.scss";

const renderList = (item: InfoTypes) => {
  return (
    <li key={item.id} className={style["item"]}>
      <button className={style["like-btn"]} title={`Unlike ${item.name}`}>
        ❤
      </button>
      <p title={`${item.name}, ${item.date} by ${item.author}`}>{item.name}</p>
      <div>
        <button title={`Go to ${item.name}`}>go</button>
        <button title={`Play This Track.`}>pl</button>
      </div>
    </li>
  );
};

export default function Setting({ active }: { active: boolean }) {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <div className={style["mask"]}>
        <div className={style["setting"]}>
          <div className={style["list-wrapper"]}>
            <div className={style["header"]}>Your Favorite Tracks</div>
            <ul className={style["list"]}>
              {likes.map(item => renderList(item))}
            </ul>
          </div>

          <div className={style["setting-control"]}>
            <div className={style["header"]}>Setting</div>
            <button>Log out</button>
            <div>
              <button>TW</button>
              <button>EN</button>
            </div>
          </div>

          <button
            className={style["close"]}
            title="close"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>
    )
  );
}
