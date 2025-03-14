import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { PetList } from "../pages/pets/PetList.jsx";
import { AuthGuard } from "../components/AuthGuard.jsx";
import { Login } from "../pages/auth/Login.jsx";
import { Register } from "../pages/auth/Register.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
// import { ViewPet } from "../pages/pets/ViewPet.jsx";
import { NotFound } from "../components/NotFound.jsx";
import { ServiceList } from "../pages/services/ServiceList.jsx";
import { ServiceAdd } from "../pages/services/ServiceAdd.jsx";
import { ServiceUpdate } from "../pages/services/ServiceUpdate.jsx";

import { HomePage } from "../pages/home/HomePage.jsx";
// import { BandymasRegisterPet } from "../pages/pets/BandymasRegisterPet.jsx";

const VetClinicRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route
            path={"/"}
            element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="pets" element={<PetList />} />
            {/* <Route path="pets/view/:id" element={<ViewPet />} /> */}
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/bandymasRegisterPet" element={<BandymasRegisterPet />} /> */}
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default VetClinicRoutes;
