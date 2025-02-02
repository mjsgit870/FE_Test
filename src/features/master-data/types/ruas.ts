export interface GetRuasResponse {
  status: boolean;
  message: string;
  data: Data;
}

interface Data {
  id: number;
  unit_id: number;
  ruas_name: string;
  long: number;
  km_awal: string;
  km_akhir: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  unit: Unit;
  coordinates: Coordinate[];
}

interface Coordinate {
  id: number;
  ruas_id: number;
  ordering: number;
  coordinates: string;
  created_at: Date;
  updated_at: Date;
}

interface Unit {
  id: number;
  unit: string;
  status: number;
  created_by: Date | null;
  updated_by: Date | null;
  created_at: Date;
  updated_at: Date;
}
