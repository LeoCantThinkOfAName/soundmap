import React, { useContext, memo } from "react";

// context
import { UserContext } from "../../context/UserContext";

// assets
import googleIcon from "../../images/google.svg";

// styles
import style from "./avatar.module.scss";

export default memo(function Avatar() {
  const { user } = useContext(UserContext);

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
            title={`Hello, ${user && user.name}!`}
            onClick={() => console.log("user setting!")}
          >
            <img src={user ? user.img : googleIcon} alt="profile" />
          </button>
        </>
      )}
    </>
  );
});
