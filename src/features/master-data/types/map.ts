export type Coordinate = [number, number]; // [latitude, longitude]

export interface MapProps {
  coordinates: Coordinate[];
  onMapClick?: (coord: Coordinate) => void;
  onMarkerDrag?: (index: number, newPosition: Coordinate) => void;
  isCreate?: boolean;
  isEdit?: boolean;
  isReadonly?: boolean;
}

export interface CoordinateFormProps {
  onSubmit?: (coordinates: Coordinate[]) => void;
  initialCoordinates?: Coordinate[];
}
