"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { ActionIcon, Box, Button, Flex, Group, NativeSelect, Pagination, Table, Text } from "@mantine/core";
import { IconEditCircle, IconEye, IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { useGetAllRuas } from "../api/useGetAllRuas";
import { useGetAllUnit } from "../api/useGetAllUnit";
import { ChangeEvent, useState } from "react";

export default function MasterDataPage() {
  const [perPage, setPerPage] = useState<string>("5");
  const [page, setPage] = useState<number>(1);

  const {
    data: allRuas,
    isPending: isRuasPending,
    isFetching: isRuasFetching,
  } = useGetAllRuas({ params: { per_page: Number(perPage), page: page } });
  const { data: allUnit, isPending: isUnitPending, isFetching: isUnitFetching } = useGetAllUnit();

  const isPending = isRuasPending || isUnitPending;
  const isFetching = isRuasFetching || isUnitFetching;

  const allRuasData = allRuas?.data.map((ruas) => ({
    id: ruas.id,
    ruas: ruas.ruas_name,
    unit: allUnit?.data.find((unit) => unit.id === ruas.unit_id)?.unit,
    status: Number(ruas.status),
  }));

  const rows = allRuasData?.map((ruas, ruasIndex) => {
    const rowNumber = ((allRuas?.current_page ?? 1) - 1) * (allRuas?.per_page ?? 1) + (ruasIndex + 1);

    return (
      <Table.Tr key={ruasIndex}>
        <Table.Td>{rowNumber}</Table.Td>
        <Table.Td>{ruas.ruas}</Table.Td>
        <Table.Td>{ruas.unit}</Table.Td>
        <Table.Td>{ruas.status === 1 ? "Aktif" : "Tidak Aktif"}</Table.Td>
        <Table.Td>
          <Group style={{ gap: 5 }}>
            <ActionIcon variant="filled">
              <IconEditCircle size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="filled" color="cyan">
              <IconEye size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="filled" color="red">
              <IconTrash size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  return (
    <Box>
      <Flex justify={"flex-end"} mb="sm">
        <Button leftSection={<IconSquarePlus size={14} />}>Tambah</Button>
      </Flex>

      <Table.ScrollContainer minWidth="100%" style={{ position: "relative" }}>
        {!isPending && isFetching && <LoadingOverlay />}
        <Table withTableBorder highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No</Table.Th>
              <Table.Th>Ruas</Table.Th>
              <Table.Th>Unit Kerja</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{isPending ? <LoadingRow /> : rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Flex justify={"space-between"} align={"center"}>
        <Group>
          <Text>Show: </Text>
          <NativeSelect
            defaultValue={"5"}
            data={["5", "10", "15"]}
            onChange={handlePerPageChange}
            disabled={isPending || isFetching}
          />
        </Group>

        <Pagination
          value={allRuas?.current_page}
          total={allRuas?.last_page ?? 1}
          onChange={setPage}
          disabled={isPending || isFetching}
        />
      </Flex>
    </Box>
  );
}

const LoadingRow = () => (
  <Table.Tr>
    <Table.Td colSpan={5} style={{ textAlign: "center" }}>
      Loading...
    </Table.Td>
  </Table.Tr>
);
