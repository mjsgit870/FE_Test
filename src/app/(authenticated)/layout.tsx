import "@mantine/core/styles.css"

import AdminLayout from "@/layouts/AdminLayout"

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AdminLayout>{children}</AdminLayout>
}
