// src/layouts/DoctorLayout.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./DoctorLayout.css";

export default function DoctorLayout({ children, doctor }) {
  const location = useLocation();

  const links = [
    { path: "/doctor/dashboard", label: "Dashboard" },
    { path: "/doctor/appointments", label: "Appointments" },
    { path: "/doctor/availability", label: "Availability" },
    { path: "/doctor/stats", label: "Statistics" },
  ];

  return (
    <div className="doctor-dashboard">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="photo-container">
            <img
              src={doctor?.image || "/default-doctor.png"}
              alt="doctor"
              className="doctor-photo"
            />
            <span className="status-dot"></span>
          </div>
          <h4>{doctor?.name || "Doctor"}</h4>
          <small className="text-muted">{doctor?.email}</small>
        </div>

        <ul className="sidebar-menu">
          {links.map((link) => (
            <li key={link.path} className={location.pathname === link.path ? "active" : ""}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="content">
        {children}
      </main>
    </div>
  );
}
