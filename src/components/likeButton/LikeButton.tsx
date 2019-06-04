import React, { memo, useContext } from "react";

// contenxt
import { UserContext } from "./../../context/UserContext";

// fucntion
import fetchContentFul from "../oauth/fetchContentFul";

// style
import style from "./likebutton.module.scss";

export default memo(function LikeButton({
  item,
  liked,
}: {
  item: any;
  liked: boolean;
}) {
  const { user, setUser } = useContext(UserContext);

  const handleClick = () => {
    const contentful = require("contentful-management");
    const client = contentful.createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_MANAGEMENT,
    });

    client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
      .then((space: any) => space.getEntry(user.contentfulId))
      .then((entry: any) => {
        if (liked) {
          entry.fields.favorite["zh-Hant-TW"] = entry.fields.favorite[
            "zh-Hant-TW"
          ].filter((track: any) => track.sys.id != item.sys.id);
        } else {
          if (entry.fields.favorite) {
            entry.fields.favorite["zh-Hant-TW"] = [
              ...entry.fields.favorite["zh-Hant-TW"],
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
              "zh-Hant-TW": [
                {
                  sys: {
                    type: "Link",
                    linkType: "Entry",
                    id: item.sys.id,
                  },
                },
              ],
            };
          }
        }
        return entry.update();
      })
      .then(async (entry: any) => {
        await entry.publish();
        await fetchContentFul(user.id, (userData: any) => {
          setUser({
            ...user,
            favList: userData.favList,
          });
        });
      })
      .catch(console.error);
  };

  return (
    <button
      className={liked ? style["like-btn"] : style["like-btn-unliked"]}
      title={`${liked ? "Unlike" : "Like"} ${item ? item.name : ""}`}
      onClick={() => handleClick()}
    >
      <i className="sm-heart" />
    </button>
  );
});
