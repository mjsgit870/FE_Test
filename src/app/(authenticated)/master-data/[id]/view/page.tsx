"use client";

import { useGetRuas } from "@/features/master-data/api/useGetRuas";
import { Button, Container, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";

const ViewRuasPage = dynamic(() => import("@/features/master-data/routes/ViewRuasPage"));

export default function ViewRuas() {
  const params = useParams<{ id: string }>();

  const { data: ruas, isPending, isFetching } = useGetRuas({ id: params.id });

  return (
    <Container p={0}>
      <Button component={Link} href="/master-data" color="gray" leftSection={<IconArrowLeft size={14} />} mb="sm">
        Back
      </Button>

      {ruas && !isPending && !isFetching ? <ViewRuasPage ruasData={ruas} /> : <Text>Loading...</Text>}
    </Container>
  );
}
