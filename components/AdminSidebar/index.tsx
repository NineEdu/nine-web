"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Table as TableIcon,
  ChevronDown,
  BarChart3,
  BookOpen,
  Users,
} from "lucide-react";

// --- 1. ĐỊNH NGHĨA DỮ LIỆU MENU ---
const sidebarData = [
  {
    group: "ADMIN DASHBOARD",
    items: [
      {
        title: "Overview",
        icon: LayoutDashboard,
        href: "/admin", // Gọi API stats hiển thị 3 cái thẻ số to đùng
      },
      {
        title: "Manage Users",
        icon: Users, // Import từ lucide-react
        href: "/admin/users", // Gọi API getAllUsers hiển thị Table
      },
      {
        title: "Manage Courses",
        icon: BookOpen,
        href: "/admin/courses", // Gọi API getCourses (bỏ filter)
      },
    ],
  },
];

// --- 2. COMPONENT MENU ITEM RIÊNG LẺ ---
const MenuItem = ({ item }: { item: any }) => {
  const pathname = usePathname(); // Logic check active link (NextJS)
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === item.href;

  // Nếu có submenu -> Dùng Collapsible
  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium",
              // Sửa: Dùng text-primary thay vì text-purple-600
              isOpen && "bg-slate-100 text-primary dark:bg-slate-800"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </div>
            <div className="flex items-center gap-1">
              {item.badge && (
                <Badge className="bg-green-100 text-green-600 hover:bg-green-100 border-none h-5 px-1.5 text-[10px]">
                  {item.badge}
                </Badge>
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen ? "rotate-180" : ""
                )}
              />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-9 space-y-1 mt-1">
          {item.submenu.map((subItem: any, index: number) => (
            <Link
              key={index}
              href={subItem.href}
              // Sửa: Dùng hover:text-primary thay vì hover:text-purple-600
              className="block py-2 text-sm text-slate-500 hover:text-primary transition-colors"
            >
              {subItem.title}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Nếu không có submenu -> Link thường
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 hover:bg-slate-100 text-slate-600 dark:text-slate-300 font-medium",
        // Sửa: Dùng text-primary cho trạng thái active
        isActive && "bg-slate-100 text-primary"
      )}
    >
      <Link href={item.href}>
        <item.icon className="h-5 w-5" />
        <span>{item.title}</span>
        {item.badge && (
          <Badge className="ml-auto bg-green-100 text-green-600 hover:bg-green-100 border-none h-5 px-1.5 text-[10px]">
            {item.badge}
          </Badge>
        )}
      </Link>
    </Button>
  );
};

// --- 3. COMPONENT SIDEBAR CHÍNH ---
export function AdminSidebar() {
  return (
    <div className="h-screen w-[280px] border-r bg-white dark:bg-slate-950 flex flex-col">
      {/* HEADER LOGO */}
      <div className="h-20 flex items-center px-6 gap-2">
        {/* Sửa: Dùng bg-primary thay vì bg-purple-600 */}
        <div className="bg-primary p-1.5 rounded-lg">
          <BarChart3 className="h-6 w-6 text-primary-foreground" />
        </div>
        {/* Sửa: Đổi tên thành NineEdu */}
        <span className="text-2xl font-bold text-slate-800 dark:text-white">
          NineEdu
        </span>
      </div>

      {/* SCROLL AREA CONTENT */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-6">
          {sidebarData.map((group, index) => (
            <div key={index}>
              <h3 className="mb-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, itemIndex) => (
                  <MenuItem key={itemIndex} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
