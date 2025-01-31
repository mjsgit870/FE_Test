"use client";

import classes from "@/layouts/Sidebar.module.css";
import Link from "next/link";
import { links, SidebarLinkProps } from "./link-data";
import { usePathname } from "next/navigation";

export const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();

  return (
    <Link className={classes.link} data-active={pathname === href || undefined} href={href}>
      <Icon className={classes.linkIcon} stroke={1.5} />
      <span>{label}</span>
    </Link>
  );
};

export default function SidebarLinks() {
  return (
    <>
      {links.map((link, index) => (
        <SidebarLink key={index} {...link} />
      ))}
    </>
  );
}
