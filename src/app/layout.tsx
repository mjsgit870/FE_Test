import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/components/Providers"

export const metadata: Metadata = {
  title: "Test FE",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
