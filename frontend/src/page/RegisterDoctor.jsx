import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterDoctor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    speciality: "",
    description: "",
    city: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/register/doctor",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Docteur inscrit avec succès !");
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        speciality: "",
        description: "",
        city: "",
      });
      setImage(null);
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos champs.");
      console.error(err);
    }
  };

  return (
    <>
      {/* ⭐️ CSS intégré directement ici */}
      <style>{`
        .register-bg {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.55)
          ),
          url("https://images.unsplash.com/photo-1580281658628-8b40f1a3a31c?auto=format&fit=crop&w=1350&q=80");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .doctor-card {
          width: 45rem;
          background: #ffffffee;
          backdrop-filter: blur(8px);
          border-radius: 20px;
          padding: 25px;
        }
      `}</style>

      <div className="register-bg">
        <Card className="shadow-lg doctor-card">

          {/* Bouton retour */}
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="mb-3 rounded-pill"
          >
            ⬅ Retour à l'accueil
          </Button>

          <h3 className="text-center mb-4 fw-bold text-primary">
            Créer un médecin
          </h3>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom complet</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom et prénom"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Spécialité</Form.Label>
                  <Form.Control
                    type="text"
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    placeholder="Ex : Cardiologue"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ville</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Casablanca, Rabat..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Informations sur le médecin"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmer mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Photo (facultative)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 rounded-pill"
            >
              Enregistrer le médecin
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}
