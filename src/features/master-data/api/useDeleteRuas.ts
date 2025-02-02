import api from "@/lib/axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";

const deleteRuas = async (id: number): Promise<any> => {
  const response = await api.delete(`/ruas/${id}`);
  return response.data;
};

type ConfigProps = {
  config?: Omit<MutationOptions<any, Error, number>, "mutationKey" | "mutationFn">;
};

export const useDeleteRuas = ({ config }: ConfigProps = {}) => {
  return useMutation({
    mutationKey: ["delete-ruas"],
    mutationFn: deleteRuas,
    ...config,
  });
};
