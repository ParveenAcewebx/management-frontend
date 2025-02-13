"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  useEffect(() => {
    items.forEach((item) => {
      if (item.url === pathname) {
        setActiveItem(item.title);
      }
      item.items?.forEach((subItem) => {
        if (subItem.url === pathname) {
          setActiveItem(item.title);
          setActiveSubItem(subItem.title);
        }
      });
    });
  }, [pathname, items]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isParentActive = item.title === activeItem;
          const isAnySubItemActive = item.items?.some(
            (subItem) => subItem.url === pathname
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive || isAnySubItemActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <Link href={item.url} passHref>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={isParentActive ? "!bg-gray-100 text-black" : ""}
                    >
                      {item.icon && <item.icon />}
                      <span className="!w-full">{item.title}</span>
                      {item.items?.length ? (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      ) : null}
                    </SidebarMenuButton>
                  </Link>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={
                            activeSubItem === subItem.title
                              ? "!bg-gray-200 text-black"
                              : ""
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
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
