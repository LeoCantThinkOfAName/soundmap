import React, { memo, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

// context
import { UserContext } from "./../../context/UserContext";
import { MapContext } from "./../../context/MapContext";
import { MainContext } from "./../../context/MainContext";

// components
import ListItem from "./ListItem";

// styles
import style from "./setting.module.scss";

// contentful
import { fetchTracks } from "./../../context/fetchTracks";
import fetchContentful from "../oauth/fetchContentFul";

export default memo(function Setting({
  active,
  setActive,
}: {
  active: boolean;
  setActive: any;
}) {
  const { t, i18n } = useTranslation(null, { useSuspense: false });
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { setCenter } = useContext(MapContext);
  const { setCurrent, setPlay, setTracks } = useContext(MainContext);

  useEffect(() => {}, [user]);

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

  const handleI18n = (lang: string) => {
    i18n.changeLanguage(lang);
    fetchContentful(user.id, lang, (userData: any) => {
      setUser({
        ...user,
        favList: userData.favList,
      });
    });
    fetchTracks(lang, (data: any) => {
      setTracks(data);
    });
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
          <div className={style["header"]}>{t("settings.favorite-tracks")}</div>
          {active && (
            <ul className={style["list"]} onScroll={e => handleScroll(e)}>
              {user.favList.length > 0 &&
                user.favList.map((item: any) =>
                  ListItem(item, setCurrent, setPlay, setCenter)
                )}
            </ul>
          )}
        </div>

        <div className={style["setting-control"]}>
          <button className={style["logout"]} onClick={() => signOut()}>
            {t("buttons.logout")}
          </button>
          <div>
            <button
              className={style["list-btn"]}
              title={t("settings.TW")}
              onClick={() => handleI18n("tw")}
            >
              TW
            </button>
            <button
              className={style["list-btn"]}
              title={t("settings.EN")}
              onClick={() => handleI18n("en")}
            >
              EN
            </button>
          </div>
        </div>

        <button
          className={style["close"]}
          title={t("buttons.close")}
          onClick={() => setActive(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
});
