import React, { memo } from "react";

export default memo(function PlayBtn({
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
});
