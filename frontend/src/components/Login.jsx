import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user, role } = response.data;

      // Stockage local
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userName", user.name);

      // Mise à jour utilisateur dans App.jsx
      setUser(user);

      // Redirection selon rôle
      if (role === "doctor") navigate("/doctor/dashboard");
      else if (role === "secretary") navigate("/secretary/dashboard");
      else if (role === "patient") navigate("/patient/dashboard");
      else navigate("/"); // fallback

    } catch (error) {
      setErrorMsg("Email ou mot de passe incorrect.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-box">

      <h3 className="text-center mb-3 text-primary fw-bold">Connexion</h3>
      <p className="text-center text-secondary mb-4">
        Accédez à votre espace
      </p>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Form onSubmit={handleLogin}>
        
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 rounded-pill py-2"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Se connecter"}
        </Button>

      </Form>
    </div>
  );
}
