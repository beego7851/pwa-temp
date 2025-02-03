import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

interface DashboardLayoutProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeSection = "announcements",
  onSectionChange = () => {},
}) => {
  const handleNavigate = (href: string) => {
    const section = href.replace("/", "");
    onSectionChange(section);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <MainContent activeTab={activeSection} onTabChange={onSectionChange} />
    </div>
  );
};

export default DashboardLayout;
