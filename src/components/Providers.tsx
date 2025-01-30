"use client";

import { theme } from "@/config/theme";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </QueryClientProvider>
  );
}
