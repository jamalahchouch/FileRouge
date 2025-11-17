import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

export default function DoctorList({ user }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  // Récupérer les médecins depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/doctors")
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur récupération médecins :", err);
        setLoading(false);
      });
  }, []);

  const handleBook = (doctor) => {
    if (!user) {
      alert("Veuillez vous connecter pour prendre rendez-vous !");
      return;
    }
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    axios
      .post(
        "http://localhost:8000/api/patient/appointments",
        {
          doctor_id: selectedDoctor.id,
          start_at: startAt,
          end_at: endAt,
          type,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        setShowModal(false);
        setStartAt("");
        setEndAt("");
        setType("");
        setNotes("");
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          console.error(err);
          alert("Erreur serveur, réessayez plus tard.");
        }
      });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <Row className="g-4">
        {doctors.map((doctor) => (
          <Col md={4} key={doctor.id}>
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={doctor.image || "https://via.placeholder.com/300x200.png?text=Pas+d'image"}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{doctor.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {doctor.speciality || "Généraliste"} - {doctor.city || "Ville"}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">
                  {doctor.description || "Pas de description disponible..."}
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto"
                  onClick={() => handleBook(doctor)}
                >
                  📅 Prendre rendez-vous
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL DE RÉSERVATION */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rendez-vous avec {selectedDoctor?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Date & Heure de début</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
              />
              {errors.start_at && <small className="text-danger">{errors.start_at[0]}</small>}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Date & Heure de fin</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
              />
              {errors.end_at && <small className="text-danger">{errors.end_at[0]}</small>}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Type de rendez-vous</Form.Label>
              <Form.Control
                type="text"
                placeholder="Consultation, Suivi..."
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mt-2">
              Confirmer le rendez-vous
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
