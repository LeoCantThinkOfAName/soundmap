import React, { useState, useContext, memo } from "react";

// context
import { UserContext } from "../../context/UserContext";

// assets
import googleIcon from "../../images/google.svg";

// components
import Setting from "../setting/Setting";

// styles
import style from "./avatar.module.scss";

export default memo(function Avatar() {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);

  return (
    <>
      {!user ? (
        <button
          className={style["avatar-wrapper"]}
          id="loginBtn"
          title="Login with google"
        >
          <img src={googleIcon} alt="Login with Google" />
        </button>
      ) : (
        <>
          <button
            className={style["avatar-wrapper"]}
            title="Personal Setting And Playlist"
            onClick={() => setActive(true)}
          >
            <img src={user ? user.img : googleIcon} alt="profile" />
          </button>
          <Setting active={active} setActive={setActive} />
        </>
      )}
    </>
  );
});
