import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Row, Col, Spinner, Badge, InputGroup, FormControl, Container } from "react-bootstrap";
import { FaSearch, FaStethoscope } from "react-icons/fa";
import axios from "axios";

export default function DoctorList({ user }) {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchSpeciality, setSearchSpeciality] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:8000/api/doctors")
      .then((res) => {
        setDoctors(res.data);
        setFilteredDoctors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchName.toLowerCase()) &&
        doc.speciality.toLowerCase().includes(searchSpeciality.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchName, searchSpeciality, doctors]);

  const handleBook = (doctor) => {
    if (!user || !token) {
      alert("Veuillez vous connecter pour prendre rendez-vous !");
      return;
    }

    setSelectedDoctor(doctor);
    setStartAt("");
    setEndAt("");
    setType("");
    setNotes("");
    setErrors({});
    setAvailability([]);

    axios
      .get(`http://localhost:8000/api/availability?doctor_id=${doctor.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAvailability(res.data))
      .catch(() => {
        setAvailability([]);
        alert("Impossible de récupérer les disponibilités pour ce médecin.");
      });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    axios
      .post(
        "http://localhost:8000/api/patient/appointments",
        { doctor_id: selectedDoctor.id, start_at: startAt, end_at: endAt, type, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => { alert(res.data.message); setShowModal(false); })
      .catch((err) => {
        if (err.response?.status === 422) setErrors(err.response.data.errors);
        else alert("Erreur serveur, réessayez plus tard.");
      });
  };

  const handleSelectSlot = (slot) => {
    setStartAt(slot.start_at);
    setEndAt(slot.end_at);
  };

  if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="primary" /></div>;

  return (
    <>
      {/* Barre de recherche moderne */}
      <div className="search-bar my-4">
        <Container>
          <div className="card shadow-lg p-3">
            <Form className="d-flex flex-column flex-md-row gap-3 align-items-center">
              <InputGroup className="flex-grow-1">
                <InputGroup.Text className="bg-white border-0 ps-3"><FaSearch color="#6c757d" /></InputGroup.Text>
                <FormControl
                  className="border-0 ps-0"
                  placeholder="Nom du médecin..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="flex-grow-1">
                <InputGroup.Text className="bg-white border-0 ps-3"><FaStethoscope color="#6c757d" /></InputGroup.Text>
                <FormControl
                  className="border-0 ps-0"
                  placeholder="Spécialité..."
                  value={searchSpeciality}
                  onChange={(e) => setSearchSpeciality(e.target.value)}
                />
              </InputGroup>

              <Button variant="primary" className="px-4 py-2" onClick={() => {}}>Rechercher</Button>
            </Form>
          </div>
        </Container>
      </div>

      {/* Liste des médecins */}
      <Row className="g-4">
        {filteredDoctors.map((doctor) => (
          <Col xs={12} sm={6} md={4} lg={3} key={doctor.id}>
            <Card className="doctor-card h-100 shadow-sm border-0">
              <div className="card-image-container">
                <Card.Img
                  variant="top"
                  src={`http://localhost:8000${doctor.image}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = ""; }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <h5 className="fw-bold text-truncate">Dr. {doctor.name}</h5>
                <Badge bg="info" className="mb-2 align-self-start">{doctor.speciality || "Généraliste"}</Badge>
                <p className="text-muted small flex-grow-1">{doctor.description || "Aucune description disponible."}</p>
                <div className="mb-2"><small><strong>Expérience :</strong> {doctor.experience || "10"} ans</small></div>
                <div className="mb-3"><small><strong>Ville :</strong> {doctor.city || "Non spécifiée"}</small></div>
                <Button variant="primary" onClick={() => handleBook(doctor)}>Prendre rendez-vous</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal rendez-vous */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rendez-vous avec Dr. {selectedDoctor?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availability.length > 0 ? (
            <div className="mb-3">
              <Form.Label>Disponibilités disponibles</Form.Label>
              <ul className="list-group">
                {availability.map((slot, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${slot.taken ? 'bg-danger text-white' : 'list-group-item-action'}`}
                    style={{ cursor: slot.taken ? "not-allowed" : "pointer" }}
                    onClick={() => !slot.taken && handleSelectSlot(slot)}
                  >
                    {new Date(slot.start_at).toLocaleString()} - {new Date(slot.end_at).toLocaleString()}
                  </li>
                ))}
              </ul>
              <small className="text-muted">Cliquez sur un créneau pour remplir automatiquement les dates.</small>
            </div>
          ) : <p className="text-muted">Aucune disponibilité trouvée pour ce médecin.</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date début</Form.Label>
              <Form.Control type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} isInvalid={errors.start_at} />
              <Form.Control.Feedback type="invalid">{errors.start_at}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date fin</Form.Label>
              <Form.Control type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} isInvalid={errors.end_at} />
              <Form.Control.Feedback type="invalid">{errors.end_at}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type de consultation</Form.Label>
              <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)} isInvalid={errors.type} />
              <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Confirmer le rendez-vous</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <style>{`
        .doctor-card { border-radius: 16px; transition: transform 0.3s ease, box-shadow 0.3s ease; overflow: hidden; }
        .doctor-card:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
        .card-image-container { width: 100%; height: 250px; overflow: hidden; border-radius: 16px 16px 0 0; }
        .card-image-container img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
        .card-image-container img:hover { transform: scale(1.05); }
        .list-group-item-action:hover { background-color: #007bff; color: white; }
        .search-bar .card { border-radius: 16px; }
        .search-bar .form-control:focus { box-shadow: none; border-color: #007bff; }
        .search-bar .btn-primary { background-color: #007bff; border: none; }
      `}</style>
    </>
  );
}
