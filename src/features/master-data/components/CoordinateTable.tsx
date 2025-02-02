import { ActionIcon, Table, TableProps } from "@mantine/core";
import { Coordinate } from "../types/map";
import { IconTrash } from "@tabler/icons-react";

interface CoordinateTableProps {
  coordinates: Coordinate[];
  onDelete?: (index: number) => void;
  hideAction?: boolean;
  tableProps?: TableProps;
}

export default function CoordinateTable({ coordinates, onDelete, hideAction, tableProps }: CoordinateTableProps) {
  const rows = coordinates.map((coord, coordIdx) => (
    <Table.Tr key={coordIdx}>
      <Table.Td>{coordIdx + 1}</Table.Td>
      <Table.Td>{coord.join(", ")}</Table.Td>
      {!hideAction && (
        <Table.Td>
          <ActionIcon variant="filled" color="red" onClick={() => onDelete?.(coordIdx)}>
            <IconTrash size={18} stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover withTableBorder {...tableProps}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>No</Table.Th>
          <Table.Th>Koordinat (latitude, longitude)</Table.Th>
          {!hideAction && <Table.Th>Aksi</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{coordinates.length > 0 ? rows : <EmptyRows />}</Table.Tbody>
    </Table>
  );
}

const EmptyRows = () => {
  return (
    <Table.Tr>
      <Table.Td colSpan={3} align="center">
        Belum ada titik
      </Table.Td>
    </Table.Tr>
  );
};
