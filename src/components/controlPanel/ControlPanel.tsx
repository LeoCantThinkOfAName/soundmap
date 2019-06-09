import React, { useContext, useEffect, useRef, useState, memo } from "react";
import { useTranslation } from "react-i18next";

// context
import { MainContext } from "./../../context/MainContext";
import { UserContext } from "./../../context/UserContext";
import { MapContext } from "./../../context/MapContext";

// components
import PlayBtn from "./PlayBtn";

// styles
import style from "./control.module.scss";
import LikeButton from "./../likeButton/LikeButton";
import InfoBar from "./InfoBar";

declare global {
  interface Window {
    AudioContext: any;
    webkitAudioContext: any;
  }
}

export default memo(function ControlPanel() {
  const { t } = useTranslation(null, { useSuspense: false });
  const {
    current,
    setCurrent,
    tracks,
    play,
    setPlay,
    loop,
    setLoop,
  } = useContext(MainContext);
  const { user } = useContext(UserContext);
  const { setCenter } = useContext(MapContext);
  const [buffered, setBuffered] = useState(true);
  const [liked, setLiked] = useState(false);
  const player = useRef<any>(null);

  useEffect(() => {
    if (user && current) {
      const matched = user.favList.find(
        (item: any) => item.sys.id === current.sys.id
      );
      setLiked(matched ? true : false);
    }

    if (play) {
      player.current.play();
    }
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

  const handleShuffle = () => {
    const randomNum = Math.floor(Math.random() * tracks.length);
    const randomTrack = tracks[randomNum];
    setCurrent(randomTrack);
    setCenter({
      lat: randomTrack.fields.coord.lat,
      lng: randomTrack.fields.coord.lon,
    });
  };

  const handleLoop = () => {
    if (player.current.loop) {
      player.current.loop = false;
    } else {
      player.current.loop = true;
    }
    setLoop(!loop);
  };

  return (
    <div className={style["control-panel"]}>
      <div className={style["thumbnail-wrapper"]}>
        <img
          src={current ? current.fields.thumbnail.fields.file.url : null}
          alt={current ? current.fields.thumbnail.fields.fdescription : null}
          className={style["thumbnail"]}
        />
      </div>
      <div className={style["main-panel"]}>
        <div className={style["info"]}>
          <InfoBar current={current} />
          <div>
            <LikeButton item={current ? current : null} liked={liked} />
          </div>
        </div>
        <div className={style["btns-wrapper"]}>
          <button
            className={[style.btn].join(" ")}
            title={t("buttons.shuffle")}
            onClick={() => handleShuffle()}
          >
            <i className="sm-shuffle" />
          </button>
          <button
            className={[style.btn].join(" ")}
            title={t("buttons.previous")}
            onClick={() => handleSkip(false)}
          >
            <i className="sm-backward" />
          </button>
          <button
            className={[style.btn, buffered ? null : style.spin].join(" ")}
            title={play ? t("buttons.pause") : t("buttons.play")}
            onClick={() => handlePlayback()}
          >
            <PlayBtn playStatus={play} bufferStatus={buffered} />
          </button>
          <button
            className={[style.btn].join(" ")}
            title={t("buttons.next")}
            onClick={() => handleSkip(true)}
          >
            <i className="sm-forward" />
          </button>
          <button
            className={
              loop ? [style.btn, style.loop].join(" ") : [style.btn].join(" ")
            }
            title={t("buttons.loop")}
            onClick={() => handleLoop()}
          >
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
});
