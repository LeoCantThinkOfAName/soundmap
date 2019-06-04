import React from "react";

// style
import style from "./control.module.scss";

export default function SkipBtn({ fn, title }: { fn: any; title: string }) {
  return (
    <button
      className={[style.btn].join(" ")}
      title={title}
      onClick={() => fn()}
    >
      <i className="sm-backward" />
    </button>
  );
}
