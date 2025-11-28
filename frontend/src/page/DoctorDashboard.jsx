import React, { useState } from "react";
import Header from "../components/layout/Header";
import DoctorAppointments from"../components/doctor/DoctorAppointments"
import DoctorAvailability from "../components/doctor/DoctorAvailability";
import DoctorStats from "../components/doctor/DoctorStats";

export default function DoctorDashboard() {
  const [activePage, setActivePage] = useState("appointments");

  const renderPage = () => {
    switch (activePage) {
      case "appointments":
        return <DoctorAppointments />;
      case "availability":
        return <DoctorAvailability />;
      case "stats":
        return <DoctorStats />;
    
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      
      <div className="flex-grow-1">
       
        <div className="p-4">{renderPage()}</div>
      </div>
    </div>
  );
}
