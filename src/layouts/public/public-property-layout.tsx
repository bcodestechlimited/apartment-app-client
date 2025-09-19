import { Outlet } from "react-router";

export default function PublicPropertyLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-start p-4 flex flex-col gap-4">
      <header className="">
        <h2 className="text-2xl font-semibold">Property Detail</h2>
      </header>

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
