import React from "react";

// components
import Header from "./../header/Header";
import Avatar from "./../avatar/Avatar";
import ControlPanel from "./../controlPanel/ControlPanel";
import Map from "./../map/Map";

export default function Layout() {
  return (
    <>
      <Header />
      <Map />
      <ControlPanel />
    </>
  );
}
