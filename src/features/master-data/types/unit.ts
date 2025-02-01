export interface AllUnitResponse {
  status: boolean;
  message: string;
  data: Data[];
}

export interface Data {
  id: number;
  unit: string;
  status: number;
  created_by: null;
  updated_by: null;
  created_at: Date;
  updated_at: Date;
  ruas: Ruas[];
}

export interface Ruas {
  id: number;
  unit_id: number;
  ruas_name: string;
  long: number;
  km_awal: string;
  km_akhir: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
