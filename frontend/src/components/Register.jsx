import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

export default function RegisterPatient({ setUser }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    age: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/patient",
        form
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
      setSuccessMsg("Compte créé avec succès ! 🎉");

      // Réinitialiser le formulaire après succès
      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        age: "",
        gender: "",
      });
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Une erreur est survenue. Vérifiez les informations."
      );
    }

    setLoading(false);
  };

  return (
    <div className="auth-box p-4 shadow rounded-4">

      <h3 className="text-center mb-3 text-primary fw-bold">Créer un compte</h3>
      <p className="text-center text-secondary mb-4">
        Remplissez les informations pour vous inscrire en tant que patient
      </p>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleRegister}>

        <Form.Group className="mb-3">
          <Form.Label>Nom complet</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex : Ahmed Karim"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="exemple@gmail.com"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+212..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Âge</Form.Label>
          <Form.Control
            name="age"
            type="number"
            min="0"
            max="120"
            value={form.age}
            onChange={handleChange}
            placeholder="Votre âge"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Sélectionner</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 rounded-pill py-2"
          disabled={loading || form.password !== form.password_confirmation}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Créer mon compte"
          )}
        </Button>

      </Form>
    </div>
  );
}
