export interface ActiveRuasResponse {
  id: number;
  unit_id: number;
  ruas_name: string;
  long: number;
  km_awal: string;
  km_akhir: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  coordinates: Coordinate[];
}

export interface Coordinate {
  id: number;
  ruas_id: number;
  ordering: number;
  coordinates: string;
  created_at: Date;
  updated_at: Date;
}
