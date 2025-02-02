"use client";

import { Alert, Box, Button, Card, Flex, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import CreateRuasForm from "../components/CreateRuasForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRuasForm as CreateForm } from "../types/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { createRuasFormSchema } from "../schemas";
import { Coordinate } from "../types/map";

const Map = dynamic(() => import("../components/Map"), { ssr: false, loading: () => <div>Loading...</div> });

export default function CreateRuasPage() {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateForm>({
    resolver: zodResolver(createRuasFormSchema),
    defaultValues: {
      // unit_id: undefined,
      ruas_name: "",
      long: 0,
      km_awal: 0,
      m_awal: 0,
      km_akhir: 0,
      m_akhir: 0,
      status: "1",
      coordinates: [],
    },
  });

  const handleMapClick = (coord: Coordinate) => {
    const currentCoordinates = getValues("coordinates");
    setValue("coordinates", [...currentCoordinates, coord]);
  };

  const handleMarkerDrag = (index: number, newPosition: Coordinate) => {
    const updatedCoordinates = [...getValues("coordinates")];
    updatedCoordinates[index] = newPosition;
    setValue("coordinates", updatedCoordinates);
  };

  const onSubmit: SubmitHandler<CreateForm> = (data) => {
    console.log(data);
  };

  return (
    <Card withBorder padding="sm">
      <Title mb="md">Create Ruas</Title>

      <CreateRuasForm control={control} errors={errors} />

      <Box mb="sm">
        <Alert variant="light" title="Tutorial" mb="sm" icon={<IconInfoCircle />}>
          Jika ingin menambah titik koordinat, klik tombol "+" di pojok kanan bawah peta. Lalu klik pada peta untuk
          menambah titik.
        </Alert>

        <Map coordinates={watch("coordinates")} onMapClick={handleMapClick} onMarkerDrag={handleMarkerDrag} />
      </Box>

      <Flex justify="flex-end">
        <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Create
        </Button>
      </Flex>
    </Card>
  );
}
