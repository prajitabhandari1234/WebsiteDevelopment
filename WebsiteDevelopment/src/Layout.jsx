import { NavLink, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function Layout() {
  return (
    <>
      {/* Use the Header component or keep your header markup here */}
      <Header />

      <main>
        <Outlet />
      </main>

      {/* Mount the footer so it appears on every route */}
      <Footer />
    </>
  );
}
