"use client"

import { Home, BarChart3, ImageIcon, Settings, PanelLeft, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Sales Hub",
      icon: BarChart3,
      href: "/",
    },
    {
      title: "Communications",
      icon: MessageSquare,
      href: "/communications",
    },
    {
      title: "Assets",
      icon: ImageIcon,
      href: "/assets",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-teal-500 p-1">
            <PanelLeft className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Hover</span>
        </div>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === item.href &&
                  (item.title === "Sales Hub" || (pathname === "/communications" && item.title === "Communications"))
                }
                tooltip={item.title}
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User Name</span>
            <span className="text-xs text-muted-foreground">Field Rep</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
