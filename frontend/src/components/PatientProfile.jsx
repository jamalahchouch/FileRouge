import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function PatientProfile() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Champs modifiables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u);

      setName(u.name || "");
      setEmail(u.email || "");
      setPhone(u.phone || "");
      setAge(u.age || "");
      setGender(u.gender || "");
    }
  }, []);

  if (!user) return <p>Chargement...</p>;

  const handleUpdate = () => {
    axios
      .put(
        `http://127.0.0.1:8000/api/users/${user.id}`,
        { name, email, phone, age, gender },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setShowModal(false);
      })
      .catch((err) => console.log("update error", err));
  };

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

        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Téléphone :</strong> {user.phone || "Non renseigné"}</p>
        <p><strong>Âge :</strong> {user.age || "Non renseigné"}</p>
        <p><strong>Genre :</strong> {user.gender || "Non renseigné"}</p>

        <Button className="mt-3" onClick={() => setShowModal(true)}>
          Modifier mes informations
        </Button>
      </div>

      {/* Modal Update */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier mes informations</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Âge</Form.Label>
              <Form.Control
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Choisir...</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
                <option value="other">Autre</option>
              </Form.Select>
            </Form.Group>

            <Button className="w-100" variant="success" onClick={handleUpdate}>
              Enregistrer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
