import React from "react";
import { useTranslation } from "react-i18next";

// style
import style from "./control.module.scss";

export default function SkipBtn({ fn, title }: { fn: any; title: string }) {
  const { t } = useTranslation(null, { useSuspense: false });

  return (
    <button
      className={[style.btn].join(" ")}
      title={t(`${title}`)}
      onClick={() => fn()}
    >
      <i className="sm-backward" />
    </button>
  );
}
