import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, Pin } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned?: boolean;
  isImportant?: boolean;
}

interface AnnouncementSectionProps {
  announcements?: Announcement[];
}

const defaultAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Committee Changes",
    content:
      "Brother Sajid has resigned and a new Committee was formally created. We would like to thank brother Sajid for his previous efforts, and he will continue helping the Committee where possible in an informal capacity.",
    date: "2023-12-01",
    isPinned: true,
    isImportant: true,
  },
  {
    id: "2",
    title: "New Committee Members",
    content:
      "New Committee as of December 2023:\n- Chairperson: Anjum Riaz & Habib Mushtaq\n- Secretary: Tariq Majid\n- Treasurer: Faizan Qadiri",
    date: "2023-12-01",
    isPinned: true,
  },
  {
    id: "3",
    title: "Important Member Information",
    content:
      "- All members have been given membership numbers. Please contact your collector to find this out.\n- Please login individually and fill in required data.\n- We expect timely payments that are up to date.\n- Collectors who are timely and up to date, thank you, and please continue with your efforts.\n- Those not up to date, please find out your membership number from your collector, then please login online and make payment as soon as possible.\n- If payments are not up to date then you will not be covered.",
    date: "2023-12-01",
    isImportant: true,
  },
  {
    id: "4",
    title: "Online Payment Update",
    content:
      "Trialled so far online payment using Stripe - not enough uptake, sidelined for possible future use.",
    date: "2023-12-01",
  },
];

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({
  announcements = defaultAnnouncements,
}) => {
  return (
    <div className="w-full h-full min-h-[900px] p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Announcements</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with the latest organization news and updates
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">
                      {announcement.title}
                    </CardTitle>
                    {announcement.isPinned && (
                      <Pin className="h-4 w-4 text-muted-foreground" />
                    )}
                    {announcement.isImportant && (
                      <Badge variant="destructive" className="ml-2">
                        <Bell className="h-3 w-3 mr-1" />
                        Important
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </div>
                <CardDescription>{announcement.content}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Additional content can be added here if needed */}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AnnouncementSection;
