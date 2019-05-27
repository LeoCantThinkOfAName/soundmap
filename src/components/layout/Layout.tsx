import React from "react";

// style
import style from "./layout.module.scss";

// components
import Header from "./../header/Header";
import ControlPanel from "./../controlPanel/ControlPanel";
import Map from "./../map/Map";
import Footer from "./../footer/Footer";
import Setting from "./../setting/Setting";

export default function Layout() {
  return (
    <main className={style["main"]}>
      <Header />
      <Map />
      <ControlPanel />
      <Setting active={true} />
      <Footer />
    </main>
  );
}
