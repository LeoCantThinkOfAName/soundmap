import React, { useState, useEffect, useContext } from "react";

// context
import { UserContext } from "./../../context/UserContext";

// components
import ListItem from "./ListItem";

// styles
import style from "./setting.module.scss";

export default function Setting({
  active,
  setActive,
}: {
  active: boolean;
  setActive: any;
}) {
  const [scrolled, setScrolled] = useState(false);
  const { favorite, setUser } = useContext(UserContext);

  useEffect(() => {}, []);

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut();
    setActive(false);
    setUser(null);
  };

  const handleScroll = (e: any) => {
    if (e.target.scrollTop > 0 && !scrolled) {
      setScrolled(true);
    } else if (e.target.scrollTop === 0) {
      setScrolled(false);
    }
  };

  return (
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
          {active && (
            <ul className={style["list"]} onScroll={e => handleScroll(e)}>
              {favorite.map((item: any) => ListItem(item))}
            </ul>
          )}
        </div>

        <div className={style["setting-control"]}>
          <button className={style["logout"]} onClick={() => signOut()}>
            Log out
          </button>
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
  );
}
