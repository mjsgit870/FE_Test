import { z } from "zod";
import { formSchema } from "../schemas";

export interface LoginForm extends z.infer<typeof formSchema> {}
