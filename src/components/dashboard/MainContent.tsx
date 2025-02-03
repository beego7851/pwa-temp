import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnnouncementSection from "./sections/AnnouncementSection";
import PaymentSection from "./sections/PaymentSection";

interface MainContentProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeTab = "announcements",
  onTabChange = () => {},
}) => {
  return (
    <div className="flex-1 h-full bg-background">
      <Tabs
        defaultValue={activeTab}
        onValueChange={onTabChange}
        className="w-full h-full"
      >
        <div className="border-b px-6 py-2">
          <TabsList>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="committee">Committee Info</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="announcements" className="mt-0 h-[calc(100%-48px)]">
          <AnnouncementSection />
        </TabsContent>

        <TabsContent value="committee" className="mt-0 h-[calc(100%-48px)] p-6">
          <h2 className="text-3xl font-bold mb-6">Committee Information</h2>
          <div className="text-muted-foreground">
            Committee information content will be displayed here.
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-0 h-[calc(100%-48px)]">
          <PaymentSection />
        </TabsContent>

        <TabsContent value="profile" className="mt-0 h-[calc(100%-48px)] p-6">
          <h2 className="text-3xl font-bold mb-6">Profile Settings</h2>
          <div className="text-muted-foreground">
            Profile settings content will be displayed here.
          </div>
        </TabsContent>

        <TabsContent value="support" className="mt-0 h-[calc(100%-48px)] p-6">
          <h2 className="text-3xl font-bold mb-6">Support Center</h2>
          <div className="text-muted-foreground">
            Support center content will be displayed here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContent;
