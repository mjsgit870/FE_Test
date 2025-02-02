"use client";

import { useGetRuas } from "@/features/master-data/api/useGetRuas";
import { Button, Container, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";

const EditRuasPage = dynamic(() => import("@/features/master-data/routes/EditRuasPage"));

export default function EditRuas() {
  const params = useParams<{ id: string }>();

  const { data: ruas, isPending } = useGetRuas({ id: params.id });

  return (
    <Container p={0}>
      <Button component={Link} href="/master-data" color="gray" leftSection={<IconArrowLeft size={14} />} mb="sm">
        Back
      </Button>

      {!ruas || isPending ? <Text>Loading...</Text> : <EditRuasPage ruasData={ruas} />}
    </Container>
  );
}
