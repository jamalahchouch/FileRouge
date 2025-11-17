import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/Home.jsx';
import NavbarTop from "./components/NavBarTop";
import DashboardPatient from "./page/DashboardPatient.jsx";




function App() {
 

  return (
    <Router>
      {/* Navbar fixe sur toutes les pages */}
      

      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Dashboard patient avec sous-routes */}
       <Route path="/dashboardpatient" element={<DashboardPatient />}>
       </Route>

        {/* Page 404 pour toute autre route */}
      </Routes>  
    </Router>
  )
}

export default App
