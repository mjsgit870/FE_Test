import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function SetBoundsComponent({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return null;
}
