"use client";

import { ApiError } from "@/utils/error-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Card, Flex, List, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateRuas } from "../api/useUpdateRuas";
import CoordinateTable from "../components/CoordinateTable";
import CreateRuasForm from "../components/CreateRuasForm";
import { createRuasFormSchema } from "../schemas";
import { CreateRuasForm as CreateForm, UpdateRuasPayload } from "../types/form";
import { Coordinate } from "../types/map";
import { GetRuasResponse } from "../types/ruas";

const Map = dynamic(() => import("../components/Map"), { ssr: false, loading: () => <div>Sedang load MAP...</div> });

export default function EditRuasPage({ ruasData }: { ruasData: GetRuasResponse }) {
  const router = useRouter();

  const km_awal = ruasData?.data.km_awal.split("+");
  const km_akhir = ruasData?.data.km_akhir.split("+");
  const coordinates = ruasData?.data.coordinates
    .sort((a, b) => a.ordering - b.ordering)
    .map((coord) => {
      const [lat, lng] = coord.coordinates.split(",").map(Number);
      return [lat, lng] as Coordinate;
    });

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
      unit_id: ruasData?.data.unit_id.toString(),
      ruas_name: ruasData?.data.ruas_name,
      long: ruasData?.data.long,
      km_awal: Number(km_awal?.[0]), // 0 km_awal
      m_awal: Number(km_awal?.[1]), // 1 m_awal
      km_akhir: Number(km_akhir?.[0]), // 0 km_akhir
      m_akhir: Number(km_akhir?.[1]), // 1 m_akhir
      status: ruasData?.data.status as "0" | "1" | undefined,
      coordinates: coordinates || [],
    },
  });

  const updateRuasMutaion = useUpdateRuas();

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
    const formattedData: UpdateRuasPayload = {
      ...data,
      _method: "PUT",
      long: data.long.toString(),
      km_awal: `${data.km_awal}+${String(data.m_awal).padStart(3, "0")}`,
      km_akhir: `${data.km_akhir}+${String(data.m_akhir).padStart(3, "0")}`,
      coordinates: data.coordinates.map((coord) => `${coord[0]},${coord[1]}`),
    };

    updateRuasMutaion.mutate(
      {
        id: ruasData.data.id.toString(),
        data: formattedData,
      },
      {
        onError(error) {
          if (error instanceof ApiError && error.status === 422) {
            return toast.error(error?.errors?.[0] ?? "An unknown error occurred");
          }

          return toast.error(error.message);
        },
        onSuccess() {
          router.push("/master-data");
          return toast.success("Ruas updated successfully");
        },
      },
    );
  };

  return (
    <Card withBorder padding="sm">
      <Title mb="md">Edit Ruas - {ruasData.data.ruas_name}</Title>

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
            isEdit={true}
            coordinates={watch("coordinates")}
            onMapClick={handleMapClick}
            onMarkerDrag={handleMarkerDrag}
          />
        </Box>

        <CoordinateTable coordinates={watch("coordinates")} onDelete={handleDeleteCoord} />
      </Box>

      <Flex justify="flex-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || watch("coordinates").length < 2 || updateRuasMutaion.isPending}
        >
          Update
        </Button>
      </Flex>
    </Card>
  );
}
