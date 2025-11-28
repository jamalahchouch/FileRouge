// src/pages/DashboardPatient.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarTop from "../components/NavBarTop";
import Profile from "../components/PatientProfile";
import Appointments from "../components/PatientAppointments";
import { Button, Modal } from "react-bootstrap";
import "./Dashboard.css";

export default function DashboardPatient() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(true); // Modal ouvert par défaut
  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
    navigate("/"); // Redirection vers la page Home
  };

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

      {/* Modal responsive */}
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static"
        className="dashboard-modal"
      >
        <Modal.Header className="bg-primary text-white">
          <Button 
            variant="light" 
            onClick={handleClose} 
            className="me-3"
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          >
            ←
          </Button>
          <Modal.Title>Dashboard Patient</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column flex-lg-row gap-3 p-3">
          {/* Sidebar interne */}
          <div className="sidebar bg-light p-3 shadow-sm rounded flex-shrink-0" style={{ minWidth: "200px" }}>
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
          <div className="dashboard-content flex-grow-1 bg-white rounded shadow-sm p-3">
            {renderTab()}
          </div>
        </Modal.Body>
      </Modal>

      {/* CSS moderne */}
      <style>
        {`
          .dashboard-modal .modal-content {
            border-radius: 12px;
            overflow: hidden;
          }

          .sidebar .nav-link {
            font-weight: 500;
            color: #495057;
            transition: 0.2s;
          }
          .sidebar .nav-link.active, 
          .sidebar .nav-link:hover {
            background-color: #007bff;
            color: #fff;
            border-radius: 6px;
            padding-left: 12px;
          }

          .dashboard-content {
            min-height: 300px;
          }

          @media (max-width: 768px) {
            .dashboard-modal .modal-body {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
}
