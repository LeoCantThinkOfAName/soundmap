import React, { useState, useEffect, useContext } from "react";

// context
import { UserContext } from "./../../context/UserContext";

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
        <button
          className={[style["list-btn"], style["navigate"]].join(" ")}
          title={`Go to ${item.name}`}
        >
          go
        </button>
        <button
          className={[style["list-btn"], style["play"]].join(" ")}
          title={`Play This Track.`}
        >
          pl
        </button>
      </div>
    </li>
  );
};

export default function Setting({
  active,
  setActive,
}: {
  active: boolean;
  setActive: any;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {}, []);

  const handleScroll = (e: any) => {
    if (e.target.scrollTop > 0 && !scrolled) {
      setScrolled(true);
    } else if (e.target.scrollTop == 0) {
      setScrolled(false);
    }
  };

  return (
    active && (
      <div className={style["mask"]}>
        <div className={style["setting"]}>
          <div
            className={
              !scrolled
                ? style["list-wrapper"]
                : style["list-wrapper-double-edges"]
            }
          >
            <div className={style["header"]}>Your Favorite Tracks</div>
            <ul className={style["list"]} onScroll={e => handleScroll(e)}>
              {likes.map(item => renderList(item))}
            </ul>
          </div>

          <div className={style["setting-control"]}>
            <button className={style["logout"]}>Log out</button>
            <div>
              <button className={style["list-btn"]}>TW</button>
              <button className={style["list-btn"]}>EN</button>
            </div>
          </div>

          <button
            className={style["close"]}
            title="close"
            onClick={() => setActive(false)}
          >
            ✕
          </button>
        </div>
      </div>
    )
  );
}
