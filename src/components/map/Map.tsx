import React, { useState, useEffect } from "react";

// components
import GoogleMapReact from "google-map-react";

// data
import mapData from "./data.json";

// map styles
import white from "./white.json";
import Marker from "./../marker/Marker";

export default function Map() {
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
        {mapData.map(marker => (
          <Marker
            lat={marker.coords[0]}
            lng={marker.coords[1]}
            key={marker.id}
            info={marker}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
