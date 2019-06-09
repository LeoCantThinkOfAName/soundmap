import React from "react";
import { useTranslation } from "react-i18next";

// styles
import style from "./header.module.scss";
import Oauth from "./../oauth/Oauth";

// assets
import logo from "../../images/soundmap.svg";

export default function Header() {
  const { t } = useTranslation(null, { useSuspense: false });
  return (
    <header className={style["header"]}>
      <div className={style["header-wrapper"]}>
        <img src={logo} alt={t("app-name")} title={t("app-name")} />
      </div>
      <Oauth />
    </header>
  );
}
