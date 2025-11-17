import React, { useState, useEffect } from "react";

export default function PatientProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mon Profil</h2>

      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#0d6efd",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold"
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h3>{user.name}</h3>
        </div>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Téléphone:</strong> {user.phone || "Non renseigné"}</p>
        <p><strong>Âge:</strong> {user.age || "Non renseigné"}</p>
        <p><strong>Genre:</strong> {user.gender || "Non renseigné"}</p>
      </div>
    </div>
  );
}
