
import "./App.css";
import VetClinicRoutes from "./components/VetClinicRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="px-5 pb-5">
        <Toaster position="top-right" reverseOrder={false} />
        <VetClinicRoutes />
    </div>
  );
};

export default App;
