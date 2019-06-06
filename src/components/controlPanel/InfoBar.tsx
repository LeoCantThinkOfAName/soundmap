import React, { useEffect, useRef, useState, memo } from "react";
import moment from "moment";

import style from "./control.module.scss";

export default memo(function InfoBar({ current }: { current: any }) {
  const titleBar = useRef<any>(null);
  const inter = useRef<any>(null);

  const transition = () => {
    clearTimeout(inter.current);
    const width = titleBar.current.offsetWidth;
    const sec = Math.ceil(width / 50);
    const parentWidth = titleBar.current.parentNode.offsetWidth;
    if (width <= parentWidth) return;
    inter.current = setTimeout(() => {
      titleBar.current.setAttribute(
        "style",
        `transition-duration: ${sec}s; transform: translateX(-${width}px)`
      );
      inter.current = setTimeout(() => {
        titleBar.current.setAttribute("style", `transform: translateX(100%)`);
        inter.current = setTimeout(() => {
          titleBar.current.setAttribute(
            "style",
            `transition-duration: ${sec}s; transform: translateX(0px)`
          );
        }, 500);
      }, sec * 1000 + 500);
    }, 1000);
  };

  useEffect(() => {
    clearTimeout(inter.current);

    if (current) {
      titleBar.current.setAttribute("style", null);
      setTimeout(() => {
        titleBar.current.addEventListener("transitionend", transition());
      }, 500);
    }
  }, [current]);

  return (
    <div>
      <h5
        className={style["title"]}
        ref={titleBar}
        onMouseOver={() => transition()}
      >
        {current ? current.fields.name : "Select a location to play."}
      </h5>
      <p className={style["date"]}>
        {current
          ? moment(current.fields.date).format("MM/DD/YYYY (ddd) A hh:mm")
          : "00/00/0000 ( ) 00:00"}
      </p>
      <p className={style["date"]}>
        {current ? current.fields.author : "Noname"}
      </p>
    </div>
  );
});
