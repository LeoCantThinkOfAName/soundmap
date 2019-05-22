import React from "react";

// styles
import style from "./header.module.scss";

// assets
import logo from "../../images/soundmap.svg";

export default function Header() {
  return (
    <header className={style["header"]}>
      <div className={style["header-wrapper"]}>
        <img src={logo} alt="taipei sound map" />
      </div>
    </header>
  );
}
