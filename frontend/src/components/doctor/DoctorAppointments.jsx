import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorLayout from "../layout/DoctorLayout";
import Header from "../layout/Header";
import { Button, Modal, Form } from "react-bootstrap";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");

  const [filters, setFilters] = useState({ name: "", status: "", date: "" });

  const doctor = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [appointments, filters]);

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

  const applyFilters = () => {
    let filtered = [...appointments];
    if (filters.name) {
      filtered = filtered.filter((apt) =>
        apt.patient.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter((apt) => apt.status === filters.status);
    }
    if (filters.date) {
      filtered = filtered.filter(
        (apt) =>
          new Date(apt.start_at).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString()
      );
    }
    setFilteredAppointments(filtered);
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
      <Header />

      <div className="p-4 bg-light rounded shadow-sm mt-3">
        <h2 className="mb-4">Rendez-vous</h2>

        {/* Barre de filtres inline */}
        <div className="d-flex align-items-center gap-2 mb-3 flex-wrap" style={{ flexWrap: "nowrap" }}>
          <input
            type="text"
            placeholder="Filtrer par nom"
            className="form-control form-control-sm"
            style={{ flex: 1, minWidth: "180px", padding:"12px" }}
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />

          <select
            className="form-control form-control-sm"
            style={{ flex: 1, minWidth: "160px",padding:"12px" }}
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
            <option value="completed">Terminé</option>
          </select>

          <input
            type="date"
            className="form-control form-control-sm"
            style={{ flex: 1, minWidth: "150px",padding:"12px" }}
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />

          <button
            className="btn btn-secondary btn-md"
            onClick={() => setFilters({ name: "", status: "", date: "" })}
          >
            Réinitialiser
          </button>
        </div>

        {/* Table des rendez-vous */}
        {!Array.isArray(filteredAppointments) ? (
          <p className="alert alert-danger">Erreur lors du chargement des rendez-vous</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
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
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>{apt.patient.name}</td>
                    <td>{new Date(apt.start_at).toLocaleString()}</td>
                    <td>{apt.patient.phone}</td>
                    <td>{apt.patient.gender}</td>
                    <td>{apt.patient.age}</td>
                    <td>
                      <span
                        className={`badge ${
                          apt.status === "pending"
                            ? "bg-warning"
                            : apt.status === "confirmed"
                            ? "bg-primary"
                            : apt.status === "cancelled"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
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
                      <Button size="sm" variant="danger" onClick={() => handleDelete(apt)}>
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal pour modification */}
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
                  <option value="completed">Terminé</option>
                </Form.Select>
              </Form.Group>

              <Button variant="success" onClick={handleUpdate} className="w-100">
                Enregistrer
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </DoctorLayout>
  );
}
