import { Outlet } from "react-router";
import Navbar from "../_shared/navbar";
import Footer from "../_shared/footer";
import ScrollToTop from "@/pages/ScrollToTop";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-custom-light-blue">
      <ScrollToTop />
      <div>
        <Navbar />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
