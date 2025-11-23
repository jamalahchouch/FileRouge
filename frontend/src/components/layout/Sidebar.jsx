import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DoctorAppointments from "../doctor/DoctorAppointments";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { path: "/doctor/dashboard", label: "Profil" },
    { path: "/doctor/appointments", label: "Rendez-vous" },
    { path: "/doctor/availability", label: "Patients" },
    { path: "/doctor/stats", label: "Paramètres" },
  ];
 
  return (
    <div className="sidebar bg-dark text-white d-flex flex-column p-3" style={{ minHeight: "100vh" }}>
      <h3 className="text-center mb-4">Mon Dashboard</h3>
      <Nav className="flex-column">
        {links.map((link) => (
          <Nav.Item key={link.path} className="mb-2">
            <Link
              to={link.path}
              className={`nav-link text-white ${location.pathname === link.path ? "active-link" : ""}`}
            >
              {link.label}
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}
