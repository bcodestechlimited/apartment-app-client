import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This will trigger every time the URL path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
