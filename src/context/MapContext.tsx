import React, { useState, createContext } from "react";

export const MapContext = createContext(null);

export default function MapProvider({ children }: any) {
  const [mapProps, setMapProps] = useState({
    center: {
      lat: 25.032862,
      lng: 121.56812001,
    },
    zoom: 12,
  });
  const [center, setCenter] = useState({
    lat: 25.032862,
    lng: 121.56812001,
  });

  return (
    <MapContext.Provider value={{ mapProps, setMapProps, center, setCenter }}>
      {children}
    </MapContext.Provider>
  );
}
