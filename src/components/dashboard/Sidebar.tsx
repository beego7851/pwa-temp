import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Bell,
  Users,
  CreditCard,
  UserCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

interface SidebarProps {
  activeSection?: string;
  onNavigate?: (href: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection = "announcements",
  onNavigate = () => {},
}) => {
  const navItems: NavItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      href: "/dashboard",
      isActive: activeSection === "dashboard",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Announcements",
      href: "/announcements",
      isActive: activeSection === "announcements",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Committee Info",
      href: "/committee",
      isActive: activeSection === "committee",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payments",
      href: "/payments",
      isActive: activeSection === "payments",
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      label: "Profile",
      href: "/profile",
      isActive: activeSection === "profile",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: "Support",
      href: "/support",
      isActive: activeSection === "support",
    },
  ];

  return (
    <div className="w-[280px] h-screen bg-card border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">Member Portal</h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={item.isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12",
                item.isActive && "bg-secondary",
              )}
              onClick={() => onNavigate(item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onNavigate("/logout")}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
