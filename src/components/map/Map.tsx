import React, { useEffect, useContext } from "react";

// context
import { MainContext } from "./../../context/MainContext";
import { MapContext } from "../../context/MapContext";

// components
import GoogleMapReact from "google-map-react";
import Marker from "./../marker/Marker";

// map styles
import white from "./white.json";

export default function Map() {
  const { tracks, current } = useContext(MainContext);
  const { mapProps, setMapProps } = useContext(MapContext);

  useEffect(() => {
    // setTimeout(() => {
    //   setMapProps({ ...mapProps, zoom: 15 });
    // }, 2000);
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
        center={
          current
            ? { lat: current.fields.coord.lat, lng: current.fields.coord.lon }
            : mapProps.center
        }
      >
        {tracks.map((marker: any) => (
          <Marker
            key={marker.sys.id}
            item={marker}
            id={marker.sys.id}
            lat={marker.fields.coord.lat}
            lng={marker.fields.coord.lon}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
