import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 border-gray-300 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-7 gap-2 text-xs text-gray-500 mt-4">
          <span>Property Name</span>
          <span>Location</span>
          <span>Localized/Agent</span>
          <span>Occupancy Rate</span>
          <span>Revenue</span>
          <span>Bookings</span>
          <span>Category</span>
        </div>
      </CardContent>
    </Card>
  );
}
