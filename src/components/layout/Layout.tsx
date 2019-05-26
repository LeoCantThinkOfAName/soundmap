import React from "react";

// style
import style from "./layout.module.scss";

// components
import Header from "./../header/Header";
import ControlPanel from "./../controlPanel/ControlPanel";
import Map from "./../map/Map";
import Footer from "./../footer/Footer";

export default function Layout() {
  return (
    <main className={style["main"]}>
      <Header />
      <Map />
      <ControlPanel />
      <Footer />
    </main>
  );
}
