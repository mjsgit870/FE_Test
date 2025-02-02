"use client";

import { Badge, Box, Card, Divider, Flex, Grid, Skeleton, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { Coordinate } from "../types/map";
import { GetRuasResponse } from "../types/ruas";
import CoordinateTable from "../components/CoordinateTable";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

const Map = dynamic(() => import("../components/Map"), { ssr: false, loading: () => <Skeleton height={350} /> });

export default function ViewRuasPage({ ruasData }: { ruasData: GetRuasResponse }) {
  const km_awal = ruasData?.data.km_awal.split("+");
  const km_akhir = ruasData?.data.km_akhir.split("+");
  const status = ruasData?.data.status === "1" ? "Aktif" : "Tidak Aktif";
  const statusIcon = ruasData?.data.status === "1" ? <IconCircleCheck size={12} /> : <IconCircleX size={12} />;
  const coordinates = ruasData?.data.coordinates
    .sort((a, b) => a.ordering - b.ordering)
    .map((coord) => {
      const [lat, lng] = coord.coordinates.split(",").map(Number);
      return [lat, lng] as Coordinate;
    });

  return (
    <Card withBorder padding="sm">
      <Title>Detail Ruas - {ruasData.data.ruas_name}</Title>

      <Divider my="md" />

      <Box>
        <Grid mb="sm" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text>
              <span style={{ fontWeight: "bold" }}>Nama Unit :</span> {ruasData.data.unit.unit}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text>
              <span style={{ fontWeight: "bold" }}>Nama Ruas :</span> {ruasData.data.ruas_name}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text>
              <span style={{ fontWeight: "bold" }}>Panjang :</span> {ruasData.data.long} KM
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex align="center" gap={4}>
              <span style={{ fontWeight: "bold" }}>Status :</span>{" "}
              <Badge variant="light" color={ruasData.data.status === "1" ? "green" : "red"}>
                {status}
              </Badge>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text>
              <span style={{ fontWeight: "bold" }}>KM Awal (KM + M) :</span> {km_awal[0]}KM + {km_awal[1]}M
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text>
              <span style={{ fontWeight: "bold" }}>KM Akhir (KM + M) :</span> {km_akhir[0]}KM + {km_akhir[1]}M
            </Text>
          </Grid.Col>
        </Grid>

        <Box mb="sm">
          <Map coordinates={coordinates} isReadonly />
        </Box>

        <CoordinateTable coordinates={coordinates} hideAction />
      </Box>
    </Card>
  );
}
