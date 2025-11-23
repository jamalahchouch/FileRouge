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
      const res = await axios.get(
        "http://localhost:8000/api/patient/appointments",
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
      await axios.delete(
        `http://localhost:8000/api/patient/appointments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
          {appointments.map((r) => {
            const doctor = r.doctor || {}; // sécurité

            return (
              <div
                key={r.id}
                className="list-group-item shadow-sm mb-3 p-3 rounded"
              >
                {/* Informations du médecin */}
                <h5 className="mb-2">
                  👨‍⚕️ <strong>Dr. {doctor.name}</strong>
                </h5>

                <p><strong>Email médecin :</strong> {doctor.email || "—"}</p>
                <p><strong>Téléphone médecin :</strong> {doctor.phone || "—"}</p>
                <p><strong>Spécialité :</strong> {doctor.speciality || "—"}</p>
                <p><strong>Adresse cabinet :</strong> {doctor.address || "—"}</p>

                {/* Infos rendez-vous */}
                <hr />
                <p><strong>Date début :</strong> {new Date(r.start_at).toLocaleString()}</p>
                <p><strong>Date fin :</strong> {new Date(r.end_at).toLocaleString()}</p>
                <p><strong>Motif :</strong> {r.type || "—"}</p>
                <p><strong>Notes :</strong> {r.notes || "—"}</p>

                {/* Status du rendez-vous */}
                <p>
                  <strong>Status :</strong>{" "}
                  <span
                    className={
                      r.status === "confirmed"
                        ? "badge bg-success"
                        : r.status === "cancelled"
                        ? "badge bg-danger"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {r.status}
                  </span>
                </p>

                <div className="d-flex gap-2 mt-3">
                  <Button size="sm" variant="warning" onClick={() => handleEditClick(r)}>
                    Modifier
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(r.id)}>
                    Supprimer
                  </Button>
                </div>
              </div>
            );
          })}
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
