import api from "@/lib/axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { CreateRuasPayload, CreateRuasResponse } from "../types/form";

const addRuas = async (data: CreateRuasPayload): Promise<CreateRuasResponse> => {
  const response = await api.post<CreateRuasResponse>("/ruas", data);
  return response.data;
};

type ConfigProps = {
  config?: Omit<MutationOptions<CreateRuasResponse, Error, CreateRuasPayload>, "mutationKey" | "mutationFn">;
};

export const useAddRuas = ({ config }: ConfigProps = {}) => {
  return useMutation({
    mutationKey: ["add-ruas"],
    mutationFn: addRuas,
    ...config,
  });
};
