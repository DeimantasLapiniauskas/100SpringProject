
import "./App.css";
import VetClinicRoutes from "./components/VetClinicRoutes";
import { CustomToaster } from "@/components/uiBase/toast/customToaster";
import pawssBackgroundImage from "/src/assets/icons/pawss_for_background_spaced_out_rotated_1536px.png";

const App = () => {
  return (
    
    <div className="relative min-h-screen">
      {/* Above className has to have "relative" and "min-h-screen" as it ensures paw print images cover whole page. Not half or less. */}

      {/* Ensures paw print image background is applied globally */}
      <div
        className="absolute inset-0 bg-repeat bg-[length:3rem_3rem] sm:bg-[length:3rem_3rem] md:bg-[length:6rem_6rem] lg:bg-[length:9rem_9rem] bg-[center_top_0.1rem] opacity-5 pointer-events-none z-0"
        style={{ backgroundImage: `url(${pawssBackgroundImage})` }}
      ></div>

      {/* To ensure content sits above paw print image background, "relative" is essential for that. */}
      <div className="relative px-2 pb-2">
        <CustomToaster reverseOrder={false} />
        <VetClinicRoutes />
      </div>
    </div>
  );
};

export default App;
