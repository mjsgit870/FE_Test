import { Container } from "@mantine/core";
import dynamic from "next/dynamic";

const MasterDataPage = dynamic(() => import("@/features/master-data/routes/MasterDataPage"));

export default function MasterDataRuas() {
  return (
    <Container p={0}>
      <MasterDataPage />
    </Container>
  );
}
