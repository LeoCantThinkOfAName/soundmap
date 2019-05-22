import React from "react";

// styles
import style from "./avatar.module.scss";

export default function Avatar() {
  return (
    <div className={style["avatar-wrapper"]}>
      <img
        src="https://scontent-cdg2-1.cdninstagram.com/vp/3a79baa51f768350e533a2131bd682fe/5D2FB56A/t51.2885-19/s150x150/37207115_425646254594105_3831755562752671744_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com"
        alt="profile"
      />
    </div>
  );
}
