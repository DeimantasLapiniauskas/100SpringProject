import { Outlet } from "react-router";
import { Navbar } from "../components/NavBar.jsx";
import { DeleteModal } from "@/components/features/DeleteModal.jsx";
import { MiniCart } from "@/components/features/MiniCart.jsx";

export const MainLayout = () => {
  return (
    <div className="p-2 max-w-[1400px] mx-auto">
      <header className="pb-1 relative">
        <Navbar />
        <div className=" absolute left-5 xs:left-6.5 sm:left-8 md:left-9.5 lg:left-11 top-12 xs:top-13 sm:top-15.5 md:top-18.5 lg:top-21 z-100">
            <MiniCart />
        </div>
      </header>
      <main>
        <Outlet />
        <DeleteModal />
      </main>
    </div>
  );
};
