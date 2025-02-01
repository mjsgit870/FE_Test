import api from "@/lib/axios";
import { ActiveRuasResponse } from "../types";
import { QueryOptions, useQuery } from "@tanstack/react-query";

const getActiveRuas = async (): Promise<ActiveRuasResponse[]> => {
  const response = await api.get<{ data: ActiveRuasResponse[] }>("/ruas", {
    params: {
      show: "active_only",
    },
  });

  return response.data.data;
};

type ConfigProps = {
  config?: Omit<QueryOptions<ActiveRuasResponse[]>, "queryKey" | "queryFn">;
};

export const useGetActiveRuas = ({ config }: ConfigProps = {}) => {
  return useQuery({
    queryKey: ["active-ruas"],
    queryFn: getActiveRuas,
    ...config,
  });
};
