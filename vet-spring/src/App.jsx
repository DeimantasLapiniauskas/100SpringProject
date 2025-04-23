import "./App.css";
import VetClinicRoutes from "./components/VetClinicRoutes";
import { CustomToaster } from "@/components/uiBase/CustomToaster";
import pawssBackgroundImage from "/src/assets/icons/pawss_for_background_spaced_out_rotated_1536px.png";

const App = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Paws background globally */}
      <div
        className="absolute inset-0 bg-repeat bg-[length:3rem_3rem] sm:bg-[length:3rem_3rem] md:bg-[length:6rem_6rem] lg:bg-[length:9rem_9rem] bg-[center_top_0.1rem] opacity-5 pointer-events-none z-0"
        style={{ backgroundImage: `url(${pawssBackgroundImage})` }}
      ></div>

      {/* Content sits above paw background */}
      <div className="relative z-10 px-5 pb-5">
        <CustomToaster reverseOrder={false} />
        <VetClinicRoutes />
      </div>
    </div>
  );
};

export default App;