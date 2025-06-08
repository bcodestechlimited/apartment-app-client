import DataTable from "@/components/custom/data-table";

export default function Bookings() {
  const bookings = [
    {
      id: 1,
      date: "2025-06-01",
      tenantName: "John Doe",
      property: "Sunset Villa",
      stayPeriod: "2025-06-10 to 2025-06-15",
      amount: "$750",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "2025-06-02",
      tenantName: "Jane Smith",
      property: "Ocean Breeze",
      stayPeriod: "2025-06-12 to 2025-06-18",
      amount: "$1,200",
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-06-03",
      tenantName: "Mark Johnson",
      property: "Mountain Retreat",
      stayPeriod: "2025-06-20 to 2025-06-25",
      amount: "$900",
      status: "Cancelled",
    },
  ];

  const columns = [
    {
      header: "Date",
      render: (row: any) => row.date || "N/A",
    },
    {
      header: "Tenant Name",
      render: (row: any) => row.tenantName || "N/A",
    },
    {
      header: "Property",
      render: (row: any) => row.property || "N/A",
    },
    {
      header: "Stay Period",
      render: (row: any) => row.stayPeriod || "N/A",
    },
    {
      header: "Amount",
      render: (row: any) => row.amount || "N/A",
    },
    {
      header: "Status",
      render: (row: any) => row.status || "N/A",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-start mb-4">My Bookings</h2>
      <DataTable columns={columns} data={bookings} />
    </div>
  );
}
