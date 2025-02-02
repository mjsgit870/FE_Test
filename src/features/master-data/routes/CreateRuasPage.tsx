"use client";

import { Alert, Box, Button, Card, Flex, List, Skeleton, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import CreateRuasForm from "../components/CreateRuasForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRuasForm as CreateForm, CreateRuasPayload } from "../types/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { createRuasFormSchema } from "../schemas";
import { Coordinate } from "../types/map";
import { useAddRuas } from "../api/useAddRuas";
import { ApiError } from "@/utils/error-handler";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CoordinateTable from "../components/CoordinateTable";

const Map = dynamic(() => import("../components/Map"), { ssr: false, loading: () => <Skeleton height={350} /> });

export default function CreateRuasPage() {
  const router = useRouter();

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
      unit_id: undefined,
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

  const addRuasMutation = useAddRuas();

  const handleMapClick = (coord: Coordinate) => {
    const currentCoordinates = getValues("coordinates");
    setValue("coordinates", [...currentCoordinates, coord]);
  };

  const handleMarkerDrag = (index: number, newPosition: Coordinate) => {
    const updatedCoordinates = [...getValues("coordinates")];
    updatedCoordinates[index] = newPosition;
    setValue("coordinates", updatedCoordinates);
  };

  const handleDeleteCoord = (index: number) => {
    const updatedCoordinates = getValues("coordinates").filter((_, i) => i !== index);
    setValue("coordinates", updatedCoordinates);
  };

  const onSubmit: SubmitHandler<CreateForm> = (data) => {
    const formattedData: CreateRuasPayload = {
      ...data,
      long: data.long.toString(),
      km_awal: `${data.km_awal}+${String(data.m_awal).padStart(3, "0")}`,
      km_akhir: `${data.km_akhir}+${String(data.m_akhir).padStart(3, "0")}`,
      coordinates: data.coordinates.map((coord) => `${coord[0]},${coord[1]}`),
    };

    addRuasMutation.mutate(formattedData, {
      onError(error) {
        if (error instanceof ApiError && error.status === 422) {
          return toast.error(error?.errors?.[0] ?? "An unknown error occurred");
        }

        return toast.error(error.message);
      },
      onSuccess() {
        router.push("/master-data");
        return toast.success("Ruas created successfully");
      },
    });
  };

  return (
    <Card withBorder padding="sm">
      <Title mb="md">Create Ruas</Title>

      <CreateRuasForm control={control} errors={errors} />

      <Box mb="sm">
        <Alert variant="light" title="Tutorial" mb="sm" icon={<IconInfoCircle />}>
          <List>
            <List.Item>
              <small>
                Jika ingin menambah titik koordinat, klik tombol "+" di pojok kanan bawah peta. Lalu klik pada peta
                untuk menambah titik, lalu klik tombol lagi untuk menonaktifkan-nya.
              </small>
            </List.Item>
            <List.Item>
              <small>Anda juga dapat menggeser titik koordinat dengan menahan titik/mark.</small>
            </List.Item>
          </List>
        </Alert>

        <Box mb="sm">
          <Map
            coordinates={watch("coordinates")}
            isCreate
            onMapClick={handleMapClick}
            onMarkerDrag={handleMarkerDrag}
          />
        </Box>

        <CoordinateTable coordinates={watch("coordinates")} onDelete={handleDeleteCoord} />
      </Box>

      <Flex justify="flex-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || watch("coordinates").length < 2 || addRuasMutation.isPending}
        >
          Create
        </Button>
      </Flex>
    </Card>
  );
}
