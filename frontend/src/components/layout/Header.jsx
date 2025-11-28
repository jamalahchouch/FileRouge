import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/doctor/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch(() => {
        setDoctor(null);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirection vers login
  };

  if (loading) {
    return (
      <div className="header-container d-flex justify-content-end align-items-center px-4">
        <span className="spinner-border spinner-border-sm text-primary"></span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="header-container d-flex justify-content-between align-items-center px-4">
        <h5 className="m-0">Bienvenue</h5>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="header-container d-flex justify-content-between align-items-center px-4">
      <div>
        <h5 className="fw-bold m-0">Bienvenue, Dr. {doctor.name}</h5>
        <small className="text-muted">{doctor.email}</small>
      </div>

      <button className="btn btn-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>

      <style>
        {`
          .header-container {
            position: fixed;
            top: 0;
            left: 240px;
            width: calc(100% - 240px);
            background: #99c4dd;
            border-bottom: 1px solid #e0e0e0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            z-index: 1000;
          }

          .header-container h5 {
            font-size: 1.1rem;
            font-weight: 600;
          }

          .header-container small {
            font-size: 0.85rem;
            color: #6c757d;
          }

          .btn-danger {
            transition: all 0.2s ease;
          }

          .btn-danger:hover {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .header-container {
              left: 0;
              width: 100%;
              flex-direction: column;
              height: auto;
              gap: 8px;
            }
          }
        `}
      </style>
    </div>
  );
}
