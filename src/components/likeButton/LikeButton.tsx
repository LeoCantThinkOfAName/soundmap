import React, { memo, useContext } from "react";

// contenxt
import { UserContext } from "./../../context/UserContext";

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
        let newFavList;
        if (liked) {
          console.log(user.favList);
          newFavList = entry.fields.favorite["zh-Hant-TW"].filter(
            (track: any) => track.sys.id !== item.sys.id
          );
          console.log(newFavList);
          entry.fields.favorite["zh-Hant-TW"] = newFavList;
        } else {
          if (entry.fields.favorite) {
            newFavList = entry.fields.favorite["zh-Hant-TW"].push(item);
            entry.fields.favorite["zh-Hant-TW"] = newFavList;
          } else {
            entry.fields.favorite = {
              "zh-Hant-TW": [
                {
                  sys: {
                    type: "Link",
                    linkType: "Entry",
                    id: item.id,
                  },
                },
              ],
            };
            newFavList = [];
          }
        }
        setUser({ ...user, favList: newFavList });
        return entry.update();
      })
      .then((entry: any) => entry.publish())
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
