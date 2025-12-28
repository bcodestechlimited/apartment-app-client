// AgentColumns.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Star } from "lucide-react";

// --- Define Agent Data Type ---
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  clientCount: number;
  activeListings: number;
  rating: number; // Stored as number
  status: "Active" | "Inactive" | "Suspended";
}

// Map status to badge style
const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-yellow-100 text-yellow-700",
  Suspended: "bg-red-100 text-red-700",
};

export const agentColumns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Agent Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name") as string}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email/Phone</div>,
    cell: ({ row }) => (
      <div className="text-sm">
        <div>{row.original.email}</div>
        <div className="text-muted-foreground">{row.original.phone}</div>
      </div>
    ),
  },
  {
    accessorKey: "clientCount",
    header: () => <div className="text-center">Client Count</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("clientCount") as number}</div>
    ),
  },
  {
    accessorKey: "activeListings",
    header: () => <div className="text-center">Active Listings</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("activeListings") as number}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-center ">Rating</div>,
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center justify-center font-medium text-amber-500 ">
          {rating.toFixed(1)} <Star className="h-3 w-3 ml-1 fill-amber-500" />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusStyles;
      return <Badge className={statusStyles[status]}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center"> Action</div>,
    cell: ({ row }) => {
      // Define navigation function based on your router setup
      const handleViewDetails = () => {
        // Example: router.push(`/user-management/agents/${row.original.id}`);
        console.log(`Navigating to details for agent ID: ${row.original.id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleViewDetails}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Verify</DropdownMenuItem>
            <DropdownMenuItem>Suspend</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
