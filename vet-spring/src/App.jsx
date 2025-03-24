//import { useState } from 'react'
import './App.css'
import VetClinicRoutes from './components/VetClinicRoutes'
import { Toaster } from 'react-hot-toast'



const App = () => {
  return (<>
    <Toaster position="top-right" reverseOrder={false} />
      <VetClinicRoutes/></>
  )
}

export default App
