import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Notification() {
  const [notifications, setNotifications] = React.useState({
    bookingUpdates: true,
    newsDeals: false,
    monthlyTips: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl mr-auto space-y-6 py-4">
      <div className="space-y-6">
        {/* Booking Updates */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <Label className="font-medium">Stay updated</Label>
            <p className="text-sm text-muted-foreground">
              Stay updated on bookings, rent due dates, successful payments, and
              refunds.
            </p>
          </div>
          <Switch
            className="data-[state=checked]:bg-custom-primary"
            checked={notifications.bookingUpdates}
            onCheckedChange={() => handleToggle("bookingUpdates")}
          />
        </div>

        {/* News & Deals */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <Label className="font-medium">News & Deals</Label>
            <p className="text-sm text-muted-foreground">
              Receive news about discounts, new listings, and special deals.
            </p>
          </div>
          <Switch
            className="data-[state=checked]:bg-custom-primary"
            checked={notifications.newsDeals}
            onCheckedChange={() => handleToggle("newsDeals")}
          />
        </div>

        {/* Monthly Tips */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-medium">Monthly Updates</Label>
            <p className="text-sm text-muted-foreground">
              Get monthly updates, tips, and insights to help you rent and
              manage smarter.
            </p>
          </div>
          <Switch
            className="data-[state=checked]:bg-custom-primary"
            checked={notifications.monthlyTips}
            onCheckedChange={() => handleToggle("monthlyTips")}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button type="submit" className="btn-primary rounded-full px-12">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
