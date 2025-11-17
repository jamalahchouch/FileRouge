import React, { useState } from "react";
import NavbarTop from "../components/NavBarTop";
import Profile from "../components/PatientProfile";
import Appointments from "../components/PatientAppointments";
import "./Dashboard.css";

export default function DashboardPatient() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "appointments":
        return <Appointments />;
      default:
        return <Profile />;
    }
  };

  return (
    <>
      <NavbarTop />

      <div className="dashboard d-flex flex-column flex-lg-row">
        {/* Sidebar interne */}
        <div className="sidebar bg-light p-3 shadow-sm">
          <h5 className="mb-4 text-primary">Dashboard Patient</h5>
          <ul className="nav flex-column gap-2">
            <li
              className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
              style={{ cursor: "pointer" }}
            >
              👤 Profil
            </li>
            <li
              className={`nav-link ${activeTab === "appointments" ? "active" : ""}`}
              onClick={() => setActiveTab("appointments")}
              style={{ cursor: "pointer" }}
            >
              📅 Mes Rendez-vous
            </li>
          </ul>
        </div>

        {/* Contenu principal */}
        <div className="dashboard-content flex-grow-1 p-4">
          {renderTab()}
        </div>
      </div>
    </>
  );
}
