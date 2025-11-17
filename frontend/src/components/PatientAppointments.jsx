import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const [formData, setFormData] = useState({
    start_at: "",
    end_at: "",
    type: "",
    notes: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/patient/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.appointments || res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/patient/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(appointments.filter((a) => a.id !== id));
      alert("Rendez-vous supprimé !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const handleEditClick = (appointment) => {
    setCurrentAppointment(appointment);
    setFormData({
      start_at: appointment.start_at || "",
      end_at: appointment.end_at || "",
      type: appointment.type || "",
      notes: appointment.notes || "",
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/patient/appointments/${currentAppointment.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(
        appointments.map((a) =>
          a.id === currentAppointment.id ? { ...a, ...formData } : a
        )
      );

      setShowEditModal(false);
      alert("Rendez-vous modifié !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification.");
    }
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mes Rendez-vous</h2>

      {appointments.length === 0 ? (
        <p>Aucun rendez-vous trouvé.</p>
      ) : (
        <div className="list-group">
          {appointments.map((r) => (
            <div
              key={r.id}
              className="list-group-item shadow-sm mb-2 d-flex justify-content-between align-items-center"
            >
              <div>
                <p><strong>Médecin :</strong> {r.doctor_name || r.doctor?.name}</p>
                <p><strong>Début :</strong> {new Date(r.start_at).toLocaleString()}</p>
                <p><strong>Fin :</strong> {new Date(r.end_at).toLocaleString()}</p>
                <p><strong>Motif :</strong> {r.type || "—"}</p>
                <p><strong>Notes :</strong> {r.notes || "—"}</p>
              </div>
              <div className="d-flex flex-column gap-2">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEditClick(r)}
                >
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(r.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal modification */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date de début</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start_at"
                value={formData.start_at}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end_at"
                value={formData.end_at}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Motif</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
