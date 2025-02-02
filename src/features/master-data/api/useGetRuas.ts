import api from "@/lib/axios";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { GetRuasResponse } from "../types/ruas";

const getRuas = async (id: string): Promise<GetRuasResponse> => {
  const response = await api.get<GetRuasResponse>(`/ruas/${id}`);
  return response.data;
};

type ConfigProps = {
  id: string;
  config?: Omit<QueryOptions<GetRuasResponse>, "queryKey" | "queryFn">;
};

export const useGetRuas = ({ id, config }: ConfigProps) => {
  return useQuery({
    queryKey: ["all-ruas", id],
    queryFn: () => getRuas(id),
    refetchOnWindowFocus: false,
    ...config,
  });
};
