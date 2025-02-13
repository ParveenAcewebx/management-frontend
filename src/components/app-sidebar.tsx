"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data updated with Dashboard entry.
const data = {
  user: {
    name: "Lew & Dowski Capital",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Expense",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add Expense",
          url: "/dashboard/expense/add",
        },
        {
          title: "Expense List ",
          url: "/dashboard/expense",
        },
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add",
          url: "/dashboard/blog/add",
        },
        {
          title: "List",
          url: "/dashboard/blog",
        },
      ],
    },
    {
      title: "Transaction",
      url: "#",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data?.session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
