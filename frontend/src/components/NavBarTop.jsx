import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Dropdown
} from "react-bootstrap";

import Login from "./Login";
import RegisterPatient from "./Register";

export default function NavbarTop() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);

  // Charger utilisateur depuis localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // redirige vers la page home
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm py-3" sticky="top">
        <Container>
          {/* Logo */}
          <Navbar.Brand href="/" className="fw-bold fs-3">
            <span style={{ color: "#0d6efd" }}>DOC</span>
            <span style={{ color: "#1b1b1b" }}>TOR</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-main" />

          <Navbar.Collapse id="navbar-main" className="justify-content-between">

            {/* NAVIGATION CENTRALE */}
            <Nav className="mx-auto gap-3 text-center">
              <Nav.Link href="/" className="fw-medium">Accueil</Nav.Link>
              <Nav.Link href="#patients" className="fw-medium">À propos</Nav.Link>
              <Nav.Link href="#establishments" className="fw-medium">Services</Nav.Link>
              <Nav.Link href="#contact" className="fw-medium">Contact</Nav.Link>
            </Nav>

            {/* SECTION DROITE */}
            <div className="d-flex align-items-center gap-3">

              {/* ---------- SI NON CONNECTÉ ---------- */}
              {!user && (
                <>
                  <Button
                    variant="outline-primary"
                    className="rounded-pill px-4"
                    onClick={() => setShowRegister(true)}
                  >
                    S'inscrire
                  </Button>

                  <Button
                    variant="primary"
                    className="rounded-pill px-4"
                    onClick={() => setShowLogin(true)}
                  >
                    Se connecter
                  </Button>
                </>
              )}

              {/* ---------- SI CONNECTÉ ---------- */}
              {user && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    className="border-0 bg-transparent p-0"
                    style={{ boxShadow: "none" }}
                  >
                    {/* Avatar stylisé */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #0d6efd, #5a8dfd)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        color: "white",
                        fontWeight: "bold",
                        boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
                        cursor: "pointer"
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-sm">
                    <Dropdown.Header>
                      Bonjour, <strong>{user.name}</strong>
                    </Dropdown.Header>

                    <Dropdown.Item href="/dashboardpatient">👤 Mon Profil</Dropdown.Item>
                  

                    <Dropdown.Divider />

                    <Dropdown.Item
                      className="text-danger"
                      onClick={handleLogout}
                    >
                      🚪 Se Déconnecter
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MODAL REGISTER */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Créer un compte Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterPatient setUser={setUser} />
        </Modal.Body>
      </Modal>

      {/* MODAL LOGIN */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login setUser={setUser} />
        </Modal.Body>
      </Modal>
    </>
  );
}
