import { Outlet, useLocation, useMatches } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Toppromobar from "./components/common/Toppromobar";

function App() {
  const location = useLocation();
  const routeMatches = useMatches();
  const currentRoute = routeMatches.find(
    (match) => match.pathname === location.pathname
  );

  const showHeader = currentRoute?.handle?.showHeader ?? true;
  const showFooter = currentRoute?.handle?.showHeader ?? true; // Assuming same logic for now as per requirement "when this page open no need headers and footers"

  const hidePromoBarRoutes = ["/signin", "/signup"];
  const shouldShowPromoBar = !hidePromoBarRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {shouldShowPromoBar && <Toppromobar />}
      {showHeader && <Header />}
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}

export default App;
