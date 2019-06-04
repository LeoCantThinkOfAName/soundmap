import React from "react";

export default function PlayBtn({
  playStatus,
  bufferStatus,
}: {
  playStatus: boolean;
  bufferStatus: boolean;
}) {
  if (bufferStatus && !playStatus) {
    return <i className="sm-play" />;
  } else if (bufferStatus && playStatus) {
    return <i className="sm-pause" />;
  } else {
    return <i className="sm-spin" />;
  }
}
