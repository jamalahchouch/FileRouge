import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorLayout from "../layout/DoctorLayout";
import { Button, Modal, Form } from "react-bootstrap";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Infos rendez-vous & patient
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");

  const doctor = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get("http://127.0.0.1:8000/api/doctor/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) setAppointments(res.data);
      })
      .catch((err) => console.log("doctorAppointments error", err));
  };

  const handleEdit = (apt) => {
    setSelectedAppointment(apt);
    setNotes(apt.notes || "");
    setStatus(apt.status || "pending");
    setPatientName(apt.patient.name || "");
    setPatientPhone(apt.patient.phone || "");
    setPatientGender(apt.patient.gender || "");
    setPatientAge(apt.patient.age || "");
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!selectedAppointment) return;

    const updateData = {
      notes,
      status,
      patient: {
        name: patientName,
        phone: patientPhone,
        gender: patientGender,
        age: patientAge,
      },
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/doctor/appointments/${selectedAppointment.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setShowModal(false);
        fetchAppointments();
      })
      .catch((err) => console.log("update error", err));
  };

  const handleDelete = (apt) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) return;

    axios
      .delete(`http://127.0.0.1:8000/api/doctor/appointments/${apt.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchAppointments())
      .catch((err) => console.log("delete error", err));
  };

  return (
    <DoctorLayout doctor={doctor}>
      <h2>Rendez-vous</h2>

      {!Array.isArray(appointments) ? (
        <p className="alert alert-danger">Erreur lors du chargement des rendez-vous</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Téléphone</th>
              <th>Genre</th>
              <th>Âge</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.patient.name}</td>
                <td>{new Date(apt.start_at).toLocaleString()}</td>
                <td>{apt.patient.phone}</td>
                <td>{apt.patient.gender}</td>
                <td>{apt.patient.age}</td>
                <td>{apt.status}</td>
                <td>{apt.notes}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(apt)}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(apt)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal pour modifier le rendez-vous et infos patient */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom du patient</Form.Label>
              <Form.Control
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="text"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
              >
                <option value="male">Homme</option>
                <option value="female">Femme</option>
                <option value="other">Autre</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Âge</Form.Label>
              <Form.Control
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" onClick={handleUpdate} className="w-100">
              Enregistrer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </DoctorLayout>
  );
}
