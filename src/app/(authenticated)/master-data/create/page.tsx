"use client";

import { Button, Container } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const CreateRuasPage = dynamic(() => import("@/features/master-data/routes/CreateRuasPage"));

export default function CreateRuas() {
  return (
    <Container p={0}>
      <Button component={Link} href="/master-data" color="gray" leftSection={<IconArrowLeft size={14} />} mb="sm">
        Back
      </Button>

      <CreateRuasPage />
    </Container>
  );
}
