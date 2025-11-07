import { Outlet } from "react-router";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Toppromobar from "./components/common/Toppromobar";

function App() {
  return (
    <>
      <Toppromobar />
      <Header />
      <Outlet />;
      <Footer />
    </>
  );
}

export default App;
