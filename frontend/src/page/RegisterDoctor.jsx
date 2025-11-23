import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

export default function RegisterDoctor() {
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
      const res = await axios.post(
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
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "45rem", padding: "20px" }}>
        <h3 className="text-center mb-4">Créer un médecin</h3>

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
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image (facultative)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Enregistrer le médecin
          </Button>
        </Form>
      </Card>
    </div>
  );
}
