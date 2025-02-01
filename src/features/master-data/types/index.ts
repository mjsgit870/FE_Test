import { PaginatedDataResponse } from "@/types";

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

export interface AllRuasResponse extends PaginatedDataResponse<Ruas> {}

export interface AllRuasParams {
  per_page?: number | string;
  page?: number | string;
}
