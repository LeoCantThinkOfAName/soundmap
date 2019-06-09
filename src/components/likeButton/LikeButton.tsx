import React, { memo, useContext } from "react";
import { useTranslation } from "react-i18next";

// contenxt
import { UserContext } from "./../../context/UserContext";
import { MainContext } from "./../../context/MainContext";

// style
import style from "./likebutton.module.scss";

export default memo(function LikeButton({
  item,
  liked,
}: {
  item: any;
  liked: boolean;
}) {
  const { t } = useTranslation(null, { useSuspense: false });
  const { user, setUser } = useContext(UserContext);
  const { tracks } = useContext(MainContext);

  const handleClick = () => {
    const contentful = require("contentful-management");
    const client = contentful.createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_MANAGEMENT,
    });

    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then((space: any) => space.getEntry(user.contentfulId))
      .then((entry: any) => {
        let newFavs = entry.fields.favorite
          ? entry.fields.favorite["zh-Hant-TW"]
          : [];
        if (liked) {
          newFavs = newFavs.filter(
            (track: any) => track.sys.id !== item.sys.id
          );
        } else {
          if (entry.fields.favorite) {
            newFavs = [
              ...newFavs,
              {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: item.sys.id,
                },
              },
            ];
          } else {
            entry.fields.favorite = {
              "zh-Hant-TW": [],
            };
            newFavs.push({
              sys: {
                type: "Link",
                linkType: "Entry",
                id: item.sys.id,
              },
            });
          }
        }
        entry.fields.favorite["zh-Hant-TW"] = newFavs;
        if (entry.fields.favorite) {
          const newFavs = entry.fields.favorite["zh-Hant-TW"];
          setUser({
            ...user,
            favList: tracks.filter((track: any) =>
              newFavs.find((newTrack: any) => newTrack.sys.id === track.sys.id)
            ),
          });
        } else {
          setUser({ ...user, favList: [] });
        }
        return entry.update();
      })
      .then((entry: any) => {
        entry.publish();
      })
      .catch(console.error);
  };

  return (
    <button
      className={liked ? style["like-btn"] : style["like-btn-unliked"]}
      title={`${liked ? t("buttons.unlike") : t("buttons.like")} ${
        item ? item.fields.name : ""
      }`}
      onClick={() => handleClick()}
    >
      <i className="sm-heart" />
    </button>
  );
});
