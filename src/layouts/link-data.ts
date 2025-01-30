import {
  Icon,
  IconChartPie,
  IconLassoPolygon,
  IconProps,
} from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export interface SidebarLinkProps {
  label: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
  href: string
}

export const links: SidebarLinkProps[] = [
  {
    label: "Dashboard",
    icon: IconChartPie,
    href: "/dashboard",
  },
  {
    label: "Master Data",
    icon: IconLassoPolygon,
    href: "/master-data",
  },
]
