import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/doctor/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch(() => {
        setDoctor(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-3 d-flex justify-content-end bg-white border-bottom">
        <span className="spinner-border spinner-border-sm text-primary"></span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-3 bg-white border-bottom">
        <strong>Welcome</strong>
      </div>
    );
  }

  // Construction correcte de l’image
  const imageUrl =
    doctor.image && doctor.image !== ""
      ? `http://localhost:8000${doctor.image}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          doctor.name
        )}&background=0D6EFD&color=fff&size=128`;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom shadow-sm">
        <div>
          <h5 className="fw-bold m-0">Bienvenue, Dr. {doctor.name}</h5>
          <small className="text-muted">{doctor.email}</small>
        </div>

        <img
          src={imageUrl}
          alt="Doctor"
          className="rounded-circle border"
          width="50"
          height="50"
          style={{ objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://ui-avatars.com/api/?name=Doctor&background=6c757d&color=fff";
          }}
        />
      </div>

      {/* CSS moderne */}
      <style>
        {`
          .header-container {
            background: #fff;
            border-bottom: 1px solid #eee;
          }
        `}
      </style>
    </>
  );
}
