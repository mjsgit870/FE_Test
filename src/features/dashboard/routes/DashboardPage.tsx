"use client"

import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/features/dashboard/components/Map"), {
  ssr: false,
})

export default function DashboardPage() {
  return <Map />
}
