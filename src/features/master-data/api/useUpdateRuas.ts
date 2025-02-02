import api from "@/lib/axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { UpdateRuasPayload } from "../types/form";

const updateRuas = async ({ id, data }: { id: string; data: UpdateRuasPayload }): Promise<any> => {
  const response = await api.post(`/ruas/${id}`, data);
  return response.data;
};

type ConfigProps = {
  config?: Omit<MutationOptions<any, Error, { id: string; data: UpdateRuasPayload }>, "mutationKey" | "mutationFn">;
};

export const useUpdateRuas = ({ config }: ConfigProps = {}) => {
  return useMutation({
    mutationKey: ["update-ruas"],
    mutationFn: updateRuas,
    ...config,
  });
};
