import React, { useContext, useEffect, useRef, useState } from "react";

// context
import { MainContext } from "./../../context/MainContext";
import { UserContext } from "./../../context/UserContext";
import { MapContext } from "./../../context/MapContext";

// components
import PlayBtn from "./PlayBtn";

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
  const { current, setCurrent, tracks, play, setPlay } = useContext(
    MainContext
  );
  const { user } = useContext(UserContext);
  const { setCenter } = useContext(MapContext);
  const [buffered, setBuffered] = useState(true);
  const [liked, setLiked] = useState(false);
  const player = useRef<any>(null);
  const title = useRef<any>(null);

  useEffect(() => {
    console.log(play);
    if (user && current) {
      const matched = user.favList.find(
        (item: any) => item.sys.id === current.sys.id
      );
      setLiked(matched ? true : false);
    }

    if (play) {
      player.current.play();
    }

    player.current.addEventListener("loadstart", () => {
      setPlay(false);
    });
  }, [user, current, play]);

  const handlePlayback = () => {
    if (buffered && player.current.src) {
      if (player.current.paused) {
        player.current.play();
        setPlay(true);
      } else {
        setPlay(false);
        player.current.pause();
      }
    }
  };

  const handleSkip = (direction: boolean) => {
    let index;
    // pause player first
    player.current.pause();
    setPlay(false);

    if (current) {
      index = tracks.findIndex((item: any) => item.sys.id === current.sys.id);
      // skip...
      if (direction) {
        if (index + 1 >= tracks.length) {
          index = 0;
        } else {
          index++;
        }
      } else {
        if (index - 1 < 0) {
          index = tracks.length - 1;
        } else {
          index--;
        }
      }
      setCurrent(tracks[index]);
      setCenter({
        lat: tracks[index].fields.coord.lat,
        lng: tracks[index].fields.coord.lon,
      });
    } else {
      setCurrent(tracks[0]);
      setCenter({
        lat: tracks[0].fields.coord.lat,
        lng: tracks[0].fields.coord.lon,
      });
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
            <h5 className={style["title"]} ref={title}>
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
          <button
            className={[style.btn].join(" ")}
            title="Previous"
            onClick={() => handleSkip(false)}
          >
            <i className="sm-backward" />
          </button>
          <button
            className={[style.btn, buffered ? null : style.spin].join(" ")}
            title="Play"
            onClick={() => handlePlayback()}
          >
            <PlayBtn playStatus={play} bufferStatus={buffered} />
          </button>
          <button
            className={[style.btn].join(" ")}
            title="Next"
            onClick={() => handleSkip(true)}
          >
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
