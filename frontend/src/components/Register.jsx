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
    genre: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/register/patient", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
      setSuccessMsg("Compte créé avec succès !");
    }
    catch (error) {
      setErrorMsg("Une erreur est survenue. Vérifiez les informations.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-box">

      <h3 className="text-center mb-3 text-primary fw-bold">Créer un compte</h3>
      <p className="text-center text-secondary mb-4">
        Remplissez les informations pour devenir patient
      </p>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleRegister}>

        <Form.Group className="mb-3">
          <Form.Label>Nom complet</Form.Label>
          <Form.Control name="name" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control name="phone" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Âge</Form.Label>
          <Form.Control name="age" type="number" min="0" max="120" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Select name="genre" onChange={handleChange}>
            <option value="">Sélectionner</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control type="password" name="password_confirmation" onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 rounded-pill py-2" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Créer mon compte"}
        </Button>

      </Form>
    </div>
  );
}
