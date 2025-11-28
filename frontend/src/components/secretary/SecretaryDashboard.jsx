// SecretaryDashboard.jsx
import React, { useState } from "react";
import NavbarSecretary from "./NavbarSecretary";
import SecretaryStats from "./SecretaryStats";
import SecretaryAppointments from "./SecretaryAppointments";
import CreateAppointmentForm from "./CreateAppointmentForm";
import DoctorList from "./DoctorList";

export default function SecretaryDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <SecretaryStats />;
      case "appointments":
        return <SecretaryAppointments />;
      case "create-appointment":
        return <CreateAppointmentForm />;
        case "doctor-list":
        return <DoctorList />;
      default:
        return <SecretaryStats />;
    }
  };

  return (
    <div className="dashboard-container">
      <NavbarSecretary activePage={activePage} setActivePage={setActivePage} />
      <div className="content-wrapper mt-4 container">{renderPage()}</div>
    </div>
  );
}
