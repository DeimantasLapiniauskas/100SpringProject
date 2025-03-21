import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { PetList } from "../pages/pets/PetList.jsx";
import { AuthGuard } from "../components/AuthGuard.jsx";
import { Login } from "../pages/auth/Login.jsx";
import { Register } from "../pages/auth/Register.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { NotFound } from "../components/NotFound.jsx";
import { ServiceList } from "../pages/services/ServiceList.jsx";
import { ServiceAdd } from "../pages/services/ServiceAdd.jsx";
import { ServiceUpdate } from "../pages/services/ServiceUpdate.jsx";
import { HomePage } from "../pages/home/HomePage.jsx";
import { PaginationProvider } from "../context/PaginationContext.jsx";
import PetForm from "../pages/pets/PetForm.jsx";

import { BandytiDesign } from "../pages/designtest/BandytiDesign.jsx";

const VetClinicRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route
              path="/pets"
              element={
                <AuthGuard>
                  <PaginationProvider>
                  <PetList />
                  </PaginationProvider>
                </AuthGuard>
              }
            />
            {/* <Route path="pets/view/:id" element={<ViewPet />} /> */}
            <Route path="/home" element={<HomePage />} />

            {/* <Route path="pets/view/:id" element={<ViewPet />} /> */}
            <Route
              path="/services"
              element={
                <PaginationProvider>
                  <ServiceList />
                </PaginationProvider>
              }
            />
            <Route path="services/add" element={<ServiceAdd />} />
            <Route path="services/edit/:id" element={<ServiceUpdate />} />
            <Route path="pets" element={<PetList />} />
            {/* <Route path="pets/view/:id" element={<ViewPet />} /> */}
            <Route path="/design" element={<BandytiDesign />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="pets/add" element={<PetForm />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default VetClinicRoutes;
