import { useEffect } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

const coordinates = [
  {
    id: 1,
    ruas_id: 1,
    ordering: 0,
    coordinates: "-6.307002,106.894675",
    created_at: "2025-01-31T04:08:46.000000Z",
    updated_at: "2025-01-31T04:08:46.000000Z",
  },
  {
    id: 2,
    ruas_id: 1,
    ordering: 1,
    coordinates: "-6.278520,106.959314",
    created_at: "2025-01-31T04:08:46.000000Z",
    updated_at: "2025-01-31T04:08:46.000000Z",
  },
  {
    id: 3,
    ruas_id: 1,
    ordering: 2,
    coordinates: "-6.253667,106.991748",
    created_at: "2025-01-31T04:08:46.000000Z",
    updated_at: "2025-01-31T04:08:46.000000Z",
  },
];

const SetBoundsComponent = ({ bounds }: { bounds: L.LatLngBoundsExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return null;
};

export default function Map() {
  const polylinePositions: [number, number][] = coordinates.map((coord) => {
    const [lat, lng] = coord.coordinates.split(",").map(Number);
    return [lat, lng];
  });

  const bounds = L.latLngBounds(polylinePositions);

  const center = bounds.getCenter();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "calc(100vh - 60px)" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* polyline */}
        {polylinePositions.map((position, index) => (
          <Marker key={coordinates[index].id} position={position}>
            <Popup>Titik {index + 1}</Popup>
          </Marker>
        ))}

        <Polyline positions={polylinePositions} />

        <SetBoundsComponent bounds={bounds} />
      </MapContainer>
    </div>
  );
}
