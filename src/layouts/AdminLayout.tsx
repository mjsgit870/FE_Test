"use client";

import { useLogout } from "@/hooks/useLogout";
import SidebarLinks from "@/layouts/SidebarLinks";
import { ActionIcon, AppShell, Avatar, Box, Divider, Image, Menu, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();

  const { logout } = useLogout();

  const logoutHandler = () => {
    toast.promise(logout, {
      pending: "Wait a moment...",
      success: "Logged out successfully",
      error: "Failed to logout",
    });
  };

  const pathname = usePathname();

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: true },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        px="md"
      >
        <AppShell.Section style={{ display: "flex", alignItems: "center" }}>
          <ActionIcon variant="filled" color="gray" hiddenFrom="sm" onClick={toggleMobile}>
            <IconMenu2 stroke={1.5} />
          </ActionIcon>

          <Image
            src="https://png.pngtree.com/png-vector/20230620/ourmid/pngtree-3d-location-icon-map-logo-design-symbol-transparent-background-vector-png-image_7166709.png"
            h={50}
            w="auto"
            fit="contain"
            visibleFrom="sm"
          />

          <Divider orientation="vertical" mx="sm" />

          {/* links */}
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }} visibleFrom="sm">
            <SidebarLinks />
          </Box>
        </AppShell.Section>

        <AppShell.Section>
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <Avatar
                src="https://cdn.antaranews.com/cache/1200x800/2023/06/18/20230618_080945.jpg"
                style={{ cursor: "pointer" }}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item color="red" onClick={logoutHandler}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </AppShell.Section>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Image
            src="https://png.pngtree.com/png-vector/20230620/ourmid/pngtree-3d-location-icon-map-logo-design-symbol-transparent-background-vector-png-image_7166709.png"
            h={100}
            w="auto"
            fit="contain"
            mx="auto"
          />
        </AppShell.Section>

        <Divider my="sm" />

        <AppShell.Section grow component={ScrollArea}>
          <SidebarLinks />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
