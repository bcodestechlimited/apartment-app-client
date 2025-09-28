import { images } from "@/constants/images";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-4 bg-sky-50 ">
      <Link to="/">
        <img
          src={images.havenLeaseLogoGreen}
          alt=""
          className="w-16 h-16 min-w-12"
        />
      </Link>
      <div className="flex space-x-4 text-sm">
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          Find apartment
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          List Property
        </a>
        <a
          href="about"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          About
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          Support
        </a>
      </div>
      <div className="flex space-x-4 font-semibold text-sm">
        <Link
          to={"/auth/sign-up"}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Register
        </Link>
        <Link
          to={"/auth/sign-in"}
          className="px-4 py-1 text-white bg-custom-primary rounded hover:bg-custom-primary/90"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
