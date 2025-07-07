"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Download,
  CreditCard,
  MapPin,
  User,
  LogOut,
} from "lucide-react";

type MenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
};

const SidebarDashboard = () => {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "DASHBOARD", href: "/dashboard" },
    {
      icon: ShoppingCart,
      label: "PURCHASE HISTORY",
      href: "/dashboard/orders",
    },
    { icon: User, label: "ACCOUNT DETAILS", href: "/dashboard/profile" },
  ];

  return (
    <div className="w-80 bg-white shadow-sm">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link href={item.href} key={index} passHref>
                <div
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboard;
