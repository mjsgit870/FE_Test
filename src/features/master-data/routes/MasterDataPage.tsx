"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { ActionIcon, Box, Button, Flex, Group, Input, NativeSelect, Pagination, Table, Text } from "@mantine/core";
import { IconEditCircle, IconEye, IconSquarePlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useGetAllRuas } from "../api/useGetAllRuas";
import { useGetAllUnit } from "../api/useGetAllUnit";
import { useDisclosure } from "@mantine/hooks";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useDeleteRuas } from "../api/useDeleteRuas";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function MasterDataPage() {
  const [perPage, setPerPage] = useState<string>("5");
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const [isDeleteModalOpen, { open, close }] = useDisclosure(false, {
    onClose() {
      setSelectedId(null);
    },
  });

  const {
    data: allRuas,
    isPending: isRuasPending,
    isFetching: isRuasFetching,
  } = useGetAllRuas({ params: { per_page: Number(perPage), page: page } });
  const { data: allUnit, isPending: isUnitPending, isFetching: isUnitFetching } = useGetAllUnit();

  const deleteRuasMutation = useDeleteRuas();

  const isPending = isRuasPending || isUnitPending;
  const isFetching = isRuasFetching || isUnitFetching;

  const allRuasData = allRuas?.data
    .map((ruas) => ({
      id: ruas.id,
      ruas: ruas.ruas_name,
      unit: allUnit?.data.find((unit) => unit.id === ruas.unit_id)?.unit,
      status: Number(ruas.status),
    }))
    .filter((ruas) => {
      if (!searchQuery) return true;

      const searchLower = searchQuery.toLowerCase();
      return (
        ruas.ruas.toLowerCase().includes(searchLower) ||
        ruas.unit?.toLowerCase().includes(searchLower) ||
        (ruas.status === 1 ? "aktif" : "tidak aktif").toLowerCase().includes(searchLower)
      );
    });

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
            <ActionIcon component={Link} href={`/master-data/${ruas.id}/edit`} variant="filled">
              <IconEditCircle size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="filled" color="cyan">
              <IconEye size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => {
                setSelectedId(ruas.id);
                open();
              }}
            >
              <IconTrash size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  const FallbackRow = () => (
    <Table.Tr>
      <Table.Td colSpan={5} style={{ textAlign: "center" }}>
        {isPending ? "Loading..." : "Data tidak ditemukan"}
      </Table.Td>
    </Table.Tr>
  );

  const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  const handleDeleteRuas = () => {
    if (selectedId) {
      deleteRuasMutation.mutate(selectedId, {
        onError(error) {
          close(); // tutup dialog
          return toast.error("An error occured");
        },
        onSuccess(data) {
          close(); // tutup dialog
          queryClient.invalidateQueries({ queryKey: ["all-ruas"] });
          queryClient.invalidateQueries({ queryKey: ["all-unit"] });
          return toast.success("Ruas deleted successfully");
        },
      });
    }
  };

  return (
    <Box>
      <ConfirmationDialog
        opened={isDeleteModalOpen}
        title="Delete Ruas"
        description="Are you sure you want to delete this data?"
        onClose={close}
        onSubmit={handleDeleteRuas}
      />

      <Flex justify={"space-between"} mb="sm">
        <Input
          value={searchQuery}
          placeholder="Cari..."
          onChange={(e) => setSearchQuery(e.target.value)}
          rightSection={searchQuery && <Input.ClearButton onClick={() => setSearchQuery("")} />}
          rightSectionPointerEvents="auto"
        />
        <Button component={Link} href={"/master-data/create"} leftSection={<IconSquarePlus size={14} />}>
          Tambah
        </Button>
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
          <Table.Tbody>{isPending || allRuasData?.length === 0 ? <FallbackRow /> : rows}</Table.Tbody>
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
