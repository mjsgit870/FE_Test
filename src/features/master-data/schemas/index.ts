import { z } from "zod";

export const createRuasFormSchema = z.object({
  unit_id: z.string().min(1, "Unit is required"),
  ruas_name: z.string().min(1, "Nama Ruas is required"),
  long: z.number().min(1, "Panjang is required"),
  km_awal: z.number().min(1, "KM Awal is required"),
  m_awal: z.number().min(0, "M Awal minimum is 0"),
  km_akhir: z.number().min(1, "KM Akhir is required"),
  m_akhir: z.number().min(0, "M Akhir minimum is 0"),
  status: z.enum(["1", "0"], { message: "Status tidak valid", required_error: "Status is required" }),
  coordinates: z.array(z.tuple([z.number(), z.number()])),
});
