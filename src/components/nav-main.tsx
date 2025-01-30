"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname() // Get the current path
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null)

  useEffect(() => {
    items.forEach((item) => {
      // Match either parent or sub-item URLs
      if (item.url === pathname) {
        setActiveItem(item.title)
      }

      item.items?.forEach((subItem) => {
        if (subItem.url === pathname) {
          setActiveItem(item.title)
          setActiveSubItem(subItem.title)
        }
      })
    })
  }, [pathname, items])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Determine if parent item or any of its sub-items are active
          const isParentActive = item.title === activeItem
          const isAnySubItemActive = item.items?.some(subItem => subItem.url === pathname)

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive || isAnySubItemActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isParentActive ? "!bg-gray-100 text-black" : ""}
                  >
                    {item.icon && <item.icon />}
                    <span className="!w-full">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={
                            activeSubItem === subItem.title ? "!bg-gray-200 text-black" : ""
                          }
                        >
                          <Link href={subItem.url} passHref>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
