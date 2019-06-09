import React, { useState, useContext, memo } from "react";
import { useTranslation } from "react-i18next";

// context
import { UserContext } from "../../context/UserContext";

// components
import Setting from "../setting/Setting";
import { Transition } from "react-transition-group";

// assets
import googleIcon from "../../images/google.svg";

// styles
import style from "./avatar.module.scss";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: { [id: string]: React.CSSProperties } = {
  entering: { opacity: 1, visibility: "visible" },
  entered: { opacity: 1, visibility: "visible" },
  exiting: { opacity: 0, visibility: "visible" },
  exited: { opacity: 0, visibility: "hidden" },
};

export default memo(function Avatar() {
  const { t } = useTranslation(null, { useSuspense: false });
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);

  return (
    <>
      {!user ? (
        <button
          className={style["avatar-wrapper"]}
          id="loginBtn"
          title={t("buttons.login")}
        >
          <img src={googleIcon} alt={t("buttons.login")} />
        </button>
      ) : (
        <>
          <button
            className={style["avatar-wrapper"]}
            title={t("buttons.personal-setting")}
            onClick={() => setActive(true)}
          >
            <img src={user ? user.img : googleIcon} alt="profile" />
          </button>
          <Transition in={active} timeout={duration}>
            {state => (
              <span
                style={{
                  position: "fixed",
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <Setting active={active} setActive={setActive} />
              </span>
            )}
          </Transition>
        </>
      )}
    </>
  );
});
