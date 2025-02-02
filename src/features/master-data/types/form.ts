// export interface CreateRuasForm {
//   unit_id: number;
//   ruas_name: string;
//   long: number | string;
//   km_awal: string;
//   m_awal?: string | null;
//   km_akhir: string;
//   m_akhir?: string | null;
//   status: 1 | 0;
//   coordinates: [string, string];
// }

import { z } from "zod";
import { createRuasFormSchema } from "../schemas";

export interface CreateRuasForm extends z.infer<typeof createRuasFormSchema> {}

export interface CreateRuasPayload extends Omit<CreateRuasForm, "m_awal" | "m_akhir" | "coordinates"> {
  coordinates: string[];
}
