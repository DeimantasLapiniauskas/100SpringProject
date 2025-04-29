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
import { Appointment } from "../pages/appointments/Appointment.jsx";
import { PostList } from "../pages/posts/PostList.jsx";
import { UIProvider } from "../context/UIContext.jsx";
import { BandytiDesignHomePage } from "../pages/designtest/BandytiDesignHomePage.jsx";
import { BandytiDesignH1 } from "../pages/designtest/BandytiDesignH1.jsx";
import { PostRegister } from "@/pages/posts/PostRegister.jsx";
import { PostEditPage } from "@/pages/posts/PostEditPage.jsx";
import { PostView } from "@/pages/posts/PostView.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import { Profile } from "@/pages/profile/Profile.jsx";
import { BandytiDesignH2 } from "../pages/designtest/BandytiDesignH2.jsx";
import ProductList from "@/pages/products/ProductList.jsx";
import { UpdateData } from "@/pages/appointments/UpdateData.jsx";
import { ServiceForVet } from "@/pages/services/ServiceForVet.jsx";
import { DeleteModalProvider } from "@/context/DeleteModalContext";
import { AddReviewPage } from "@/pages/reviews/AddReviewPage.jsx";
import { ReviewsList } from "@/pages/reviews/ReviewsList.jsx";
import { EditReviewPage } from "@/pages/reviews/EditReviewPage.jsx";
import { CartPage } from "./CartPage.jsx";
import { CartProvider } from "@/context/CartContext.jsx";

const VetClinicRoutes = () => {
  return (
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
        <CartProvider>
          <ListProvider>
            <DeleteModalProvider>
              <Routes>
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/"} element={<MainLayout />}>
                  <Route index element={<Navigate to="home" replace />} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="/cart" element={<CartPage/>} />
                  <Route
                    path="/pets"
                    element={
                      <AuthGuard>
                        <PetList />
                      </AuthGuard>
                    }
                  />
                  <Route path="pets/add" element={<PetForm />} />
                  {/* <Route path="pets/view/:id" element={<ViewPet />} /> */}
                  <Route path="/posts" element={<PostList />} />
                  <Route
                    path="/posts/register"
                    element={
                      <AuthGuard>
                        <PostRegister />
                      </AuthGuard>
                    }
                  />
                  <Route
                    path="/posts/edit/:entityId"
                    element={
                      <AuthGuard>
                        <PostEditPage />
                      </AuthGuard>
                    }
                  />
                  <Route path="/posts/view/:entityId" element={<PostView />} />
                  <Route
                    path="/reviews"
                    element={
                      <AuthGuard>
                        <ReviewsList />
                      </AuthGuard>
                    }
                  />
                  <Route path="reviews" element={<ReviewsList/>} />
                  <Route
                    path="/reviews/leaveReview"
                    element={
                      <AuthGuard>
                        <AddReviewPage />
                      </AuthGuard>
                    }
                  />
                     <Route
                    path="/reviews/edit/:entityId"
                    element={
                      <AuthGuard>
                        <EditReviewPage />
                      </AuthGuard>
                    }
                  />
                  <Route
                    path="/adminpage"
                    element={
                      <AuthGuard>
                        <AdminPage />
                      </AuthGuard>
                    }
                  >
                    <Route
                      path="vets"
                      element={<AdminPage initialList="vets" />}
                    />
                    <Route
                      path="clients"
                      element={<AdminPage initialList="clients" />}
                    />
                  </Route>
                    <Route
                        path="/products"
                        element={
                            <AuthGuard>
                                <ProductList />
                            </AuthGuard>
                        }
                    >
                    </Route>
                  <Route path="/services" element={<ServiceList />}/>
              <Route path="services/add" element={
                <ServiceForVet>
                <ServiceAdd />
                </ServiceForVet>
                } />
              <Route path="services/edit/:id" element={
                <ServiceForVet>
                <ServiceUpdate />
                </ServiceForVet>
                } />

              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                }
              />
              <Route path="/design" element={<BandytiDesign />} />
              <Route path="/designh" element={<BandytiDesignHomePage />} />
              <Route path="/designh1" element={<BandytiDesignH1 />} />
              <Route path="/designh2" element={<BandytiDesignH2 />} />
              <Route path="/appointments" element={<Appointment />} />
              <Route path="/appointments/client/:id" element={<UpdateData />}
                  />
                </Route>
                <Route path={"*"} element={<NotFound />} />
              </Routes>
            </DeleteModalProvider>
          </ListProvider>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

export default VetClinicRoutes;
