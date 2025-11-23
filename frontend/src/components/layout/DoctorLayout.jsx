// src/layouts/DoctorLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./DoctorLayout.css";

export default function DoctorLayout({ children, doctor }) {
  return (
    <div className="doctor-dashboard">
      
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img 
            src={doctor?.image || "/default-doctor.png"} 
            alt="doctor" 
            className="doctor-photo"
          />
          <h4>{doctor?.name || "Doctor"}</h4>
        </div>

        <ul className="sidebar-menu">
          <li><Link to="/doctor/dashboard">Dashboard</Link></li>
          <li><Link to="/doctor/appointments">Appointments</Link></li>
          <li><Link to="/doctor/availability">Availability</Link></li>
          <li><Link to="/doctor/stats">Statistics</Link></li>
        </ul>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="content">
        {children}
      </main>
    </div>
  );
}
