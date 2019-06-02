import React, { useContext, useEffect, useRef, useState } from "react";

// context
import { MainContext } from "./../../context/MainContext";
import { UserContext } from "./../../context/UserContext";

// styles
import style from "./control.module.scss";
import LikeButton from "./../likeButton/LikeButton";

declare global {
  interface Window {
    AudioContext: any;
    webkitAudioContext: any;
  }
}

export default function ControlPanel() {
  const { current } = useContext(MainContext);
  const { user } = useContext(UserContext);
  const [buffered, setBuffered] = useState(true);
  const [audio, setAudio] = useState(null);
  const [liked, setLiked] = useState(false);
  const player = useRef<any>(null);

  useEffect(() => {
    if (user && current) {
      const matched = user.favList.find(
        (item: any) => item.sys.id === current.sys.id
      );
      setLiked(matched ? true : false);
    }
    player.current.addEventListener("playing", () => {
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        setAudio(new AudioContext());
        console.log(audio);
      } catch (err) {
        console.log(err);
      }
    });
  }, [user, current]);

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
              {current ? current.fields.name : "Select a location to play."}
            </h5>
            <p className={style["date"]}>
              {current ? current.fields.date : "00/00/0000 ( ) 00:00"}
            </p>
            <p className={style["date"]}>
              {current ? current.fields.author : "Noname"}
            </p>
          </div>
          <div>
            <LikeButton item={current ? current : null} liked={liked} />
          </div>
        </div>
        <div className={style["btns-wrapper"]}>
          <button className={[style.btn].join(" ")} title="Shuffle">
            <i className="sm-shuffle" />
          </button>
          <button className={[style.btn].join(" ")} title="Previous">
            <i className="sm-backward" />
          </button>
          <button
            className={[style.btn, buffered ? null : style.spin].join(" ")}
            title="Play"
            onClick={() => handlePlayback()}
          >
            <i className={buffered ? "sm-play" : "sm-spinner"} />
          </button>
          <button className={[style.btn].join(" ")} title="Next">
            <i className="sm-forward" />
          </button>
          <button className={[style.btn].join(" ")} title="Loop">
            <i className="sm-loop" />
          </button>
        </div>
        <audio
          src={current && current.fields.audio.fields.file.url}
          ref={player}
          onCanPlayThrough={() => setBuffered(true)}
          onLoadStart={() => setBuffered(false)}
        />
      </div>
    </div>
  );
}
