import React from "react";

// styles
import style from "./control.module.scss";

export default function ControlPanel() {
  return (
    <div className={style["control-panel"]}>
      <div className={style["thumbnail-wrapper"]}>
        <img
          src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/Stargroves-album-cover.png?auto=format&q=60&fit=max&w=930"
          alt="thumbnail"
          className={style["thumbnail"]}
        />
      </div>
      <div className={style["main-panel"]}>
        <div className={style["info"]}>
          <div>
            <h5 className={style["title"]}>
              Taipei Main Station Whahahahahaha hello how are you
            </h5>
            <p className={style["date"]}>05/30 2019 (SAT) 7:00 PM</p>
            <p className={style["date"]}>LCTOAN.</p>
          </div>
          <div>
            <button className={style["like-btn"]} title="Lovin' it!">
              ♥
            </button>
          </div>
        </div>
        <div className={style["btns-wrapper"]}>
          <button className={[style.btn].join(" ")} title="Shuffle">
            R
          </button>
          <button className={[style.btn].join(" ")} title="Previous">
            ⧑
          </button>
          <button className={[style.btn].join(" ")} title="Play">
            ►
          </button>
          <button className={[style.btn].join(" ")} title="Next">
            ⧑
          </button>
          <button className={[style.btn].join(" ")} title="Loop">
            L
          </button>
        </div>
      </div>
    </div>
  );
}
