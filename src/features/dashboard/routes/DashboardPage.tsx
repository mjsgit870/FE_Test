"use client";

import dynamic from "next/dynamic";
import { useGetActiveRuas } from "../api/useGetActiveRuas";

const Map = dynamic(() => import("@/features/dashboard/components/Map"), {
  ssr: false,
});

export default function DashboardPage() {
  const { data, isFetching } = useGetActiveRuas();

  return <Map activeRuas={data || []} isLoading={isFetching} />;
}
