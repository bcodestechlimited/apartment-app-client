import { images } from "@/constants/images";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="bg-custom-primary text-white">
      <nav className="flex items-center justify-between px-4 py-2 max-w-custom">
        <Link to="/">
          <img
            src={images.havenLeaseLogoWhite}
            alt=""
            className="w-20 h-20 min-w-12"
          />
        </Link>
        <div className="flex space-x-4 text-sm">
          <Link to="/about" className="font-medium">
            About Us
          </Link>
          <a href="#" className="font-medium">
            For Tenants
          </a>
          <a href="about" className="font-medium">
            For Lanlords
          </a>
        </div>
        <div className="flex items-center space-x-4 font-semibold text-sm">
          <Link to={"/auth/sign-up"} className="font-medium">
            Register
          </Link>
          <Link
            to={"/auth/sign-in"}
            className="px-6 py-1.5 text-custom-primary bg-white rounded-full hover:bg-gray-200"
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}
