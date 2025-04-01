import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { PetList } from "../pages/pets/PetList.jsx";
import { AuthGuard } from "../pages/auth/AuthGuard.jsx";
import { Login } from "../pages/auth/Login.jsx";
import { Register } from "../pages/auth/Register.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { NotFound } from "./feedback/NotFound.jsx";
import { ServiceList } from "../pages/services/ServiceList.jsx";
import { ServiceAdd } from "../pages/services/ServiceAdd.jsx";
import { ServiceUpdate } from "../pages/services/ServiceUpdate.jsx";
import { HomePage } from "../pages/home/HomePage.jsx";
import { ListProvider } from "../context/ListContext.jsx";
import PetForm from "../pages/pets/PetForm.jsx";
import { BandytiDesign } from "../pages/designtest/BandytiDesign.jsx";
import { PostList } from "../pages/posts/PostList.jsx";
import { ViewPost } from "../pages/posts/ViewPost.jsx";
import { UIProvider } from "../context/UIContext.jsx";
import { BandytiDesignHomePage } from "../pages/designtest/BandytiDesignHomePage.jsx";
import { BandytiDesignH1 } from "../pages/designtest/BandytiDesignH1.jsx";
import { PostRegister } from "@/pages/posts/PostRegister.jsx";
import { PostEditPage } from "@/pages/posts/PostEditPage.jsx";

const VetClinicRoutes = () => {
  return (
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
            <Routes>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/"} element={<MainLayout />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<HomePage />} />
                <Route
                  path="/pets"
                  element={
                    <AuthGuard>
                      <ListProvider>
                        <PetList />
                      </ListProvider>
                    </AuthGuard>
                  }
                />
                <Route path="pets/add" element={<PetForm />} />
                {/* <Route path="pets/view/:id" element={<ViewPet />} /> */}
                <Route
                  path="/posts"
                  element={
                    <ListProvider>
                      <PostList />
                    </ListProvider>
                  }
                />
                <Route path="/posts/register" element={<PostRegister />} />
                <Route path="/posts/edit/:postId" element={<PostEditPage />} />
                <Route path="/posts/:postId" element={<ViewPost />} />
                <Route
                  path="/services"
                  element={
                    <ListProvider>
                      <ServiceList />
                    </ListProvider>
                  }
                />
                <Route path="services/add" element={<ServiceAdd />} />
                <Route path="services/edit/:id" element={<ServiceUpdate />} />
                <Route path="/design" element={<BandytiDesign />} />
                <Route path="/designh" element={<BandytiDesignHomePage />} />
                <Route path="/designh1" element={<BandytiDesignH1 />} />
              </Route>
              <Route path={"*"} element={<NotFound />} />
            </Routes>
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

export default VetClinicRoutes;
