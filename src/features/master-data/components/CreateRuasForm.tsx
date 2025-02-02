import { Grid, Group, Input, NumberInput, Select, Switch } from "@mantine/core";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { type CreateRuasForm } from "../types/form";
import { useGetAllUnit } from "../api/useGetAllUnit";

interface CreateRuasFormProps {
  control: Control<CreateRuasForm>;
  errors: FieldErrors<CreateRuasForm>;
}

export default function CreateRuasForm({ control, errors }: CreateRuasFormProps) {
  const { data: allUnit, isPending } = useGetAllUnit();

  const unitSelectItems = allUnit?.data.map((unit) => ({
    value: unit.id.toString(),
    label: unit.unit,
  }));

  return (
    <Grid align="flex-end" mb="sm">
      <Grid.Col span={12}>
        <Controller
          name="unit_id"
          control={control}
          render={({ field }) => (
            <Select
              label="Unit"
              placeholder="Pilih unit..."
              data={unitSelectItems}
              searchable
              error={errors?.unit_id?.message}
              disabled={isPending}
              {...field}
            />
          )}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Controller
          name="ruas_name"
          control={control}
          render={({ field }) => (
            <Input.Wrapper label="Nama Ruas" withAsterisk error={errors?.ruas_name?.message}>
              <Input error={errors?.ruas_name?.message} {...field} />
            </Input.Wrapper>
          )}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Controller
          name="long"
          control={control}
          render={({ field }) => (
            <NumberInput
              withAsterisk
              label="Panjang"
              description="Panjang total antara KM Awal - KM Akhir"
              error={errors?.long?.message}
              {...field}
            />
          )}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group grow={true} align="flex-end">
          <Controller
            name="km_awal"
            control={control}
            render={({ field }) => (
              <NumberInput label="KM Awal" withAsterisk error={errors?.km_awal?.message} {...field} />
            )}
          />
          <Controller
            name="m_awal"
            control={control}
            render={({ field }) => (
              <NumberInput label="M Awal" description="KM Awal + M Awal" error={errors?.m_awal?.message} {...field} />
            )}
          />
        </Group>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group grow={true} align="flex-end">
          <Controller
            name="km_akhir"
            control={control}
            render={({ field }) => (
              <NumberInput label="KM Akhir" withAsterisk error={errors?.km_akhir?.message} {...field} />
            )}
          />
          <Controller
            name="m_akhir"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="M Akhir"
                description="KM Akhir + M Akhir"
                error={errors?.m_akhir?.message}
                {...field}
              />
            )}
          />
        </Group>
      </Grid.Col>
      <Grid.Col span={12}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Switch
              label="Aktif / Tidak Aktif"
              checked={field.value === "1"}
              onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
            />
          )}
        />
      </Grid.Col>
    </Grid>
  );
}
