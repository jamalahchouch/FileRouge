import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar-secretary.css";

export default function NavbarSecretary({ activePage = "dashboard", setActivePage }) {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Erreur lors du logout", err);
    }

    // Nettoyage côté client
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    console.log(logout)
  };

  const links = [
    { id: "dashboard", label: "📊 Statistiques" },
    { id: "create-appointment", label: "➕ Créer Patient / RDV" },
    { id: "doctor-list", label: "📅 liste Doctor" },
  ];

  const handleClick = (id) => {
    if (setActivePage) {
      setActivePage(id);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green shadow-sm py-3">
      <div className="container d-flex flex-column align-items-center">
        <div
          className="navbar-brand fw-bold text-white fs-3 mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => handleClick("dashboard")}
        >
          Espace Secrétaire
        </div>

        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav gap-4 text-center">
            {links.map((link) => (
              <li className="nav-item" key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  className={`nav-link btn ${
                    activePage === link.id
                      ? "text-white fw-bold border-bottom border-light"
                      : "text-light"
                  }`}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={logout} className="logout-btn mt-3">
          🔓 Logout
        </button>
      </div>
    </nav>
  );
}
