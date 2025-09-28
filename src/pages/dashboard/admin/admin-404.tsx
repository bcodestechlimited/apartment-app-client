import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router";

export default function Admin404() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format&fit=crop"
          alt="404 background"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="text-center px-6 sm:px-12">
        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg">
          404
        </h1>
        <p className="mt-4 text-2xl text-gray-200">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-300 max-w-md mx-auto">
          It might have been moved, deleted, or you simply mistyped the URL.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/admin">
            <Button className="rounded-2xl px-6 py-2 text-lg shadow-lg hover:scale-105 transition">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              className="rounded-2xl px-6 py-2 text-lg text-white border-white hover:bg-white hover:text-black transition"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
