import {Outlet} from "react-router";
import { Navbar } from "../components/NavBar.jsx";
import { DeletePostModal } from "@/pages/posts/DeleteModal.jsx";

import pawssBackgroundImage from "/src/assets/icons/pawss_for_background_spaced_out_rotated_1536px.png";

export const MainLayout = () => {
    
    return (
        <div className="relative w-full min-h-screen">
        {/* Paws background */}
        <div
          className="absolute inset-0 bg-repeat bg-[length:3rem_3rem] sm:bg-[length:3rem_3rem] md:bg-[length:6rem_6rem] lg:bg-[length:9rem_9rem] bg-center opacity-5 pointer-events-none z-0"
          style={{ backgroundImage: `url(${pawssBackgroundImage})` }}
        ></div>
    
        {/* Content wrapper above background */}
        <div className="relative z-10 p-2">
          <header className="pb-1">
            <Navbar />
          </header>
          <main>
            <Outlet />
            <DeletePostModal />
          </main>
        </div>
      </div>
    );
};
