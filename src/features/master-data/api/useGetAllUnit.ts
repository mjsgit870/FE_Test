import api from "@/lib/axios";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { AllUnitResponse } from "../types/unit";

const getAllUnit = async (): Promise<AllUnitResponse> => {
  const response = await api.get<AllUnitResponse>("/unit");
  return response.data;
};

type ConfigProps = {
  config?: Omit<QueryOptions<AllUnitResponse>, "queryKey" | "queryFn">;
};

export const useGetAllUnit = ({ config }: ConfigProps = {}) => {
  return useQuery({
    queryKey: ["all-unit"],
    queryFn: getAllUnit,
    ...config,
  });
};
