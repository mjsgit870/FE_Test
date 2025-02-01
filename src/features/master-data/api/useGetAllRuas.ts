import api from "@/lib/axios";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { AllRuasParams, AllRuasResponse } from "../types";

const getAllRuas = async (params?: AllRuasParams): Promise<AllRuasResponse> => {
  const response = await api.get<AllRuasResponse>("/ruas", {
    params: {
      per_page: params?.per_page || 5,
      page: params?.page || 1,
    },
  });

  return response.data;
};

type ConfigProps = {
  params?: AllRuasParams;
  config?: Omit<QueryOptions<AllRuasResponse>, "queryKey" | "queryFn">;
};

export const useGetAllRuas = ({ params, config }: ConfigProps = {}) => {
  return useQuery({
    queryKey: ["all-ruas", params],
    queryFn: () => getAllRuas(params),
    ...config,
  });
};
