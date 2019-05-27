import React, { useContext, useEffect, useRef, useState } from "react";

// context
import { MainContext } from "./../../context/MainContext";

// styles
import style from "./control.module.scss";

declare global {
  interface Window {
    AudioContext: any;
    webkitAudioContext: any;
  }
}

export default function ControlPanel() {
  const { current } = useContext(MainContext);
  const [buffered, setBuffered] = useState(true);
  const [audio, setAudio] = useState(null);
  const player = useRef<any>(null);

  useEffect(() => {
    player.current.addEventListener("playing", () => {
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        setAudio(new AudioContext());
        console.log(audio);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  const handlePlayback = () => {
    if (buffered) {
      player.current.paused ? player.current.play() : player.current.pause();
    }
  };

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
              {current ? current.name : "Select a location to play."}
            </h5>
            <p className={style["date"]}>
              {current ? current.date : "00/00/0000 ( ) 00:00"}
            </p>
            <p className={style["date"]}>
              {current ? current.author : "Noname"}
            </p>
          </div>
          <div>
            <button className={style["like-btn"]} title="Lovin' it!">
              ❤
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
          <button
            className={[style.btn].join(" ")}
            title="Play"
            onClick={() => handlePlayback()}
          >
            {buffered ? "►" : "wait"}
          </button>
          <button className={[style.btn].join(" ")} title="Next">
            ⧑
          </button>
          <button className={[style.btn].join(" ")} title="Loop">
            L
          </button>
        </div>
        <audio
          src={current && current.src}
          ref={player}
          onCanPlayThrough={() => setBuffered(true)}
          onLoadStart={() => setBuffered(false)}
        />
      </div>
    </div>
  );
}
