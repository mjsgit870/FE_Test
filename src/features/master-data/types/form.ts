import { z } from "zod";
import { createRuasFormSchema } from "../schemas";

export interface CreateRuasForm extends z.infer<typeof createRuasFormSchema> {}

export interface CreateRuasPayload
  extends Omit<CreateRuasForm, "long" | "km_awal" | "m_awal" | "km_akhir" | "m_akhir" | "coordinates"> {
  long: string;
  km_awal: string;
  km_akhir: string;
  coordinates: string[];
}

export interface UpdateRuasPayload
  extends Omit<CreateRuasForm, "long" | "km_awal" | "m_awal" | "km_akhir" | "m_akhir" | "coordinates"> {
  _method: string;
  long: string;
  km_awal: string;
  km_akhir: string;
  coordinates: string[];
}

export interface CreateRuasResponse {
  status: boolean;
  message: string;
  data: CreateRuasResponseData;
}

export interface CreateRuasResponseData {
  ruas_name: string;
  long: string;
  km_awal: string;
  km_akhir: string;
  status: string;
  unit_id: number;
  updated_at: Date;
  created_at: Date;
  id: number;
  unit: CreateRuasResponseUnit;
}

export interface CreateRuasResponseUnit {
  id: number;
  unit: string;
  status: number;
  created_by: null;
  updated_by: null;
  created_at: Date;
  updated_at: Date;
}
