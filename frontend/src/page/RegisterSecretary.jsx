import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterSecretary() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await axios.post("http://127.0.0.1:8000/api/register/secretaire", formData);

      setMessage("Secrétaire inscrite avec succès !");
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos champs.");
      console.error(err);
    }
  };

  return (
    <>
      {/* ⭐️ CSS directement ici */}
      <style>{`
        .register-bg {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.55)
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

        .register-card {
          width: 34rem;
          background: #ffffffdd;
          backdrop-filter: blur(7px);
          border-radius: 20px;
          padding: 25px;
        }
      `}</style>

      <div className="register-bg">

        <Card className="shadow-lg register-card">

          {/* Bouton retour */}
          <Button
            variant="secondary"
            className="mb-3 rounded-pill"
            onClick={() => navigate("/")}
          >
            ⬅ Retour à l'accueil
          </Button>

          <h3 className="text-center mb-4">Créer une secrétaire</h3>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>

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

            <Form.Group className="mb-4">
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

            <Button type="submit" variant="success" className="w-100 py-2 rounded-pill">
              Enregistrer la secrétaire
            </Button>

          </Form>
        </Card>
      </div>
    </>
  );
}
