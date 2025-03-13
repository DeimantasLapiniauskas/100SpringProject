//import { useState } from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {PetList} from "./pages/pets/PetList.jsx";
import {AuthGuard} from "./components/AuthGuard.jsx";
import {Login} from "./pages/auth/Login.jsx";
import {Register} from "./pages/auth/Register.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {ViewPet} from "./pages/pets/ViewPet.jsx";
import { ServiceList } from './pages/services/ServiceList.jsx';
import {ServiceAdd} from './pages/services/ServiceAdd.jsx';
import { ServiceUpdate } from './pages/services/ServiceUpdate.jsx';
const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/login"} element={
                  <AuthProvider>
                      <Login/>
                  </AuthProvider>
              }/>
              <Route path={"/register"} element={
                  <AuthProvider>
                      <Register/>
                  </AuthProvider>
              }/>
              <Route path={"/"} element={
                  <AuthGuard>
                      <AuthProvider>
                          <MainLayout/>
                      </AuthProvider>
                  </AuthGuard>
              }>
                  <Route index element={<Navigate to="pets" replace />} />
                  <Route path="pets" element={<PetList/>} />
                  <Route path="services" element={<ServiceList/>}/>
                  <Route path="services/add" element={<ServiceAdd/>}/>
                  <Route path="services/edit" element={<ServiceAdd/>}/>
                  <Route path="pets/view/:id" element={<ViewPet />} />
                  
                  
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
