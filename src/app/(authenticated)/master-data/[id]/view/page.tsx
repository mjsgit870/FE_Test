"use client";

import { useGetRuas } from "@/features/master-data/api/useGetRuas";
import { ApiError } from "@/utils/error-handler";
import { Button, Container, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ViewRuasPage = dynamic(() => import("@/features/master-data/routes/ViewRuasPage"));

export default function ViewRuas() {
  const params = useParams<{ id: string }>();

  const { data: ruas, isPending, isFetching, isError, error } = useGetRuas({ id: params.id });

  useEffect(() => {
    if (isError && error instanceof ApiError && error.status === 404) {
      toast.error("Ruas tidak ditemukan");
      return redirect("/master-data");
    }
  }, [isError]);

  return (
    <Container p={0}>
      <Button component={Link} href="/master-data" color="gray" leftSection={<IconArrowLeft size={14} />} mb="sm">
        Back
      </Button>

      {ruas && !isPending && !isFetching ? <ViewRuasPage ruasData={ruas} /> : <Text>Loading...</Text>}
    </Container>
  );
}
