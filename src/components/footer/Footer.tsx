import React from "react";

// styles
import style from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={style["footer"]}>
      <p>
        Taipei Sound Map &copy;{" "}
        <a
          href="#loginBtn"
          title="Who is this guy?"
          target="_blank"
          rel="noopener"
        >
          LCTOAN.
        </a>{" "}
        2019
      </p>
    </footer>
  );
}
