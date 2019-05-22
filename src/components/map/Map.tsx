import React, { useState, useEffect } from "react";

// components
import GoogleMapReact from "google-map-react";

// map styles
import white from "./white.json";

export default function Map() {
  const [mapProps, setMapProps] = useState({
    center: {
      lat: 25.032862,
      lng: 121.56812001,
    },
    zoom: 0,
  });

  useEffect(() => {
    setMapProps({ ...mapProps, zoom: 14 });
  }, []);

  return (
    <div className="hello" style={{ height: "100vh", width: "100vw" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        defaultCenter={mapProps.center}
        defaultZoom={0}
        options={{ styles: white }}
        yesIWantToUseGoogleMapApiInternals
        zoom={mapProps.zoom}
      />
    </div>
  );
}
