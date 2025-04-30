import { Outlet } from "react-router";
import { Navbar } from "../components/NavBar.jsx";
import { DeleteModal } from "@/components/features/DeleteModal.jsx";
import { MiniCart } from "@/components/features/MiniCart.jsx";

export const MainLayout = () => {
  return (
    <div className="p-2 max-w-[1400px] mx-auto">
      <header className="pb-1 ">
        <Navbar />
        <div className=" absolute left-7.5 xs:left-10 sm:left-12.5 md:left-15 z-100">
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
