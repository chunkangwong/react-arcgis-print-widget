import { useEffect, useRef } from "react";
import { view } from "./arcgis";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    view.container = mapRef.current as HTMLDivElement;
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
      }}
    ></div>
  );
};

export default Map;
