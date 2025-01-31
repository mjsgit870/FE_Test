import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { ActiveRuasResponse } from "../types";
import SetBoundsComponent from "./SetBoundsComponent";
import LoadingOverlay from "./LoadingOverlay";

interface MapProps {
  activeRuas: ActiveRuasResponse[];
  isLoading?: boolean;
}

export default function Map({ activeRuas, isLoading = false }: MapProps) {
  const allPolylinePositions: [number, number][][] = activeRuas.map((route) =>
    route.coordinates.map((coord) => {
      const [lat, lng] = coord.coordinates.split(",").map(Number);
      return [lat, lng];
    }),
  );

  const bounds =
    allPolylinePositions.length > 0
      ? L.latLngBounds(allPolylinePositions.flat())
      : L.latLngBounds([-2.3813555, 107.2211765], [-2.3813555, 107.2211765]);

  const center = bounds.getCenter();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* loading ketika fetching api */}
      {isLoading && <LoadingOverlay text="Mencari data ruas..." />}

      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "calc(100vh - 60px)" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {activeRuas.map((ruas, ruasIndex) => (
          <React.Fragment key={ruasIndex}>
            {ruas.coordinates.map((coord, coordIndex) => {
              const position: [number, number] = coord.coordinates.split(",").map(Number) as [number, number];

              return (
                <Marker key={coordIndex} position={position}>
                  <Popup>
                    {ruas.ruas_name} - Titik {coordIndex + 1}
                  </Popup>
                </Marker>
              );
            })}

            <Polyline
              positions={allPolylinePositions[ruasIndex]}
              // color={`hsl(${ruasIndex * 60}, 70%, 50%)`} // Different color for each route
              weight={5}
              eventHandlers={{
                click: (e) => {
                  const popup = L.popup().setLatLng(e.latlng).setContent(`
                    <div>
                      <h3 style="margin: 0 0 8px 0; font-size: 16px;">${ruas.ruas_name}</h3>
                      <p style="margin: 0;">Panjang: ${ruas.long} KM</p>
                      <p style="margin: 4px 0 0 0;">Koordinat: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}</p>
                    </div>
                  `);
                  popup.openOn(e.target._map);
                },
              }}
            />
          </React.Fragment>
        ))}

        <SetBoundsComponent bounds={bounds} />
      </MapContainer>
    </div>
  );
}
