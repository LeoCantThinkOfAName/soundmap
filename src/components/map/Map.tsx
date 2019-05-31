import React, { useState, useEffect, useContext } from "react";

// type
import { InfoTypes } from "./../../interfaces/InfoInterface";

// context
import { MainContext } from "./../../context/MainContext";

// components
import GoogleMapReact from "google-map-react";

// map styles
import white from "./white.json";
import Marker from "./../marker/Marker";

// get contentful
const contentful = require("contentful");

export default function Map() {
  const { tracks, setTracks } = useContext(MainContext);
  const [mapProps, setMapProps] = useState({
    center: {
      lat: 25.032862,
      lng: 121.56812001,
    },
    zoom: 12,
  });

  useEffect(() => {
    setTimeout(() => {
      setMapProps({ ...mapProps, zoom: 15 });
    }, 2000);
  }, []);

  return (
    <div className="hello" style={{ height: "100vh", width: "100vw" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        defaultCenter={mapProps.center}
        defaultZoom={0}
        options={{
          styles: white,
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        yesIWantToUseGoogleMapApiInternals
        zoom={mapProps.zoom}
      >
        {tracks.map((marker: any) => (
          <Marker
            key={marker.sys.id}
            info={marker.fields}
            id={marker.sys.id}
            lat={marker.fields.coord.lat}
            lng={marker.fields.coord.lon}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
