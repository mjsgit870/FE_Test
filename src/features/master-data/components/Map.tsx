"use client";

import L, { LatLngTuple } from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { Coordinate, MapProps } from "../types/map";
import { ActionIcon, Box, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import SetBoundsComponent from "@/components/SetBoundsComponent";

const position: LatLngTuple = [-2.3813555, 107.2211765];

interface MapClickHandlerProps {
  onMapClick?: (coord: Coordinate) => void;
  isAddMode: boolean;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick, isAddMode }) => {
  const map = useMapEvents({
    click: (e) => {
      // Prevent click handling if target is not the map itself
      if (!isAddMode || !(e.originalEvent.target as Element).classList.contains("leaflet-container")) return;

      const { lat, lng } = e.latlng;
      onMapClick?.([lat, lng]);
    },
  });

  useEffect(() => {
    const container = map.getContainer();
    if (isAddMode) {
      container.style.cursor = "crosshair";
    } else {
      container.style.cursor = "grab";
    }
  }, [isAddMode, map]);

  return null;
};

export default function Map({ coordinates, onMapClick, onMarkerDrag, isCreate, isEdit, isReadonly }: MapProps) {
  const [isAddMode, setIsAddMode] = useState(false);

  const boundsSet = useRef(false); // prevent auto bounds while add coordinate in edit mode

  const handleToggleAddMode = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling to the map
    setIsAddMode((prev) => !prev);
  }, []);

  const bounds = coordinates.length > 0 ? new L.LatLngBounds(coordinates) : new L.LatLngBounds([position]);

  const center = bounds.getCenter();

  useEffect(() => {
    boundsSet.current = true;
  }, []);

  return (
    <MapContainer center={center} zoom={6} style={{ height: 350 }} attributionControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={onMapClick} isAddMode={isAddMode} />

      {coordinates?.map((coord, index) => (
        <Marker
          key={index}
          position={coord}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              onMarkerDrag?.(index, [position.lat, position.lng]);
            },
          }}
        >
          <Popup>Titik: {index + 1}</Popup>
        </Marker>
      ))}

      {coordinates && <Polyline positions={coordinates} />}

      {!isReadonly && (
        <Box
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            zIndex: 1000,
          }}
        >
          <Tooltip
            position="left"
            withArrow
            label={isAddMode ? "Mode menambah titik aktif" : "Tambah titik"}
            zIndex={1000}
          >
            <ActionIcon size="lg" color={isAddMode ? "green" : "gray"} onClick={handleToggleAddMode}>
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </Box>
      )}

      {isEdit
        ? coordinates.length > 0 && !boundsSet.current && <SetBoundsComponent bounds={bounds} />
        : !isCreate && <SetBoundsComponent bounds={bounds} />}
    </MapContainer>
  );
}
