import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { PetList } from "../pages/pets/PetList.jsx";
import { AuthGuard } from "../components/AuthGuard.jsx";
import { Login } from "../pages/auth/Login.jsx";
import { Register } from "../pages/auth/Register.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { ViewPet } from "../pages/pets/ViewPet.jsx";
import { NotFound } from "../components/NotFound.jsx";

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
            <Route index element={<Navigate to="pets" replace />} />
            <Route path="pets" element={<PetList />} />
            <Route path="pets/view/:id" element={<ViewPet />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default VetClinicRoutes;
