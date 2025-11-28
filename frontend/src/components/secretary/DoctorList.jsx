import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editAppointment, setEditAppointment] = useState(null);
  const [formData, setFormData] = useState({
    start_at: "",
    end_at: "",
    status: "",
    notes: "",
  });
  const [filters, setFilters] = useState({
    patientName: "",
    status: "",
    date: "",
  });

  // Charger la liste des médecins
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/secretary/doctors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Charger les rendez-vous d'un médecin
  const fetchAppointments = (doctorId) => {
    axios
      .get("http://localhost:8000/api/secretary/appointments", {
        params: { doctor_id: doctorId },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    fetchAppointments(doctor.id);
    setFilters({ patientName: "", status: "", date: "" });
  };

  const handleEdit = (appointment) => {
    setEditAppointment(appointment);
    setFormData({
      start_at: appointment.start_at,
      end_at: appointment.end_at,
      status: appointment.status,
      notes: appointment.notes || "",
    });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8000/api/secretary/appointments/${editAppointment.id}`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        fetchAppointments(selectedDoctor.id);
        setEditAppointment(null);
      })
      .catch((err) => console.error(err));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";
      case "confirmed":
        return "bg-success";
      case "cancelled":
        return "bg-danger";
      case "completed":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesName =
      filters.patientName === "" ||
      appt.patient.name.toLowerCase().includes(filters.patientName.toLowerCase());
    const matchesStatus =
      filters.status === "" || appt.status === filters.status;
    const matchesDate =
      filters.date === "" || appt.start_at.startsWith(filters.date);
    return matchesName && matchesStatus && matchesDate;
  });

  if (loading) return <div>Chargement des médecins...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Liste des médecins</h1>
      <div className="row g-4">
        {/* Liste des médecins */}
        <div className="col-md-2">
          <div className="d-flex flex-column gap-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => handleSelectDoctor(doctor)}
                className={`p-3 rounded shadow-sm cursor-pointer transition hover-shadow ${
                  selectedDoctor?.id === doctor.id
                    ? "border border-success bg-light"
                    : "bg-white"
                }`}
              >
                <h5 className="mb-1 fw-bold">Dr.{doctor.name}</h5>
                <p className="text-muted mb-0">{doctor.email}</p>
                <p className="text-success mb-0 fw-bold">{doctor.speciality }</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rendez-vous */}
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">
              {selectedDoctor
                ? `Les Rendez-vous de Dr.${selectedDoctor.name}`
                : "Sélectionnez un médecin"}
            </div>
            <div className="card-body p-3">
              {selectedDoctor && (
                <>
                  {/* Filtres */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Recherche par nom"
                      className="form-control"
                      style={{ maxWidth: "200px" }}
                      value={filters.patientName}
                      onChange={(e) =>
                        setFilters({ ...filters, patientName: e.target.value })
                      }
                    />
                    <select
                      className="form-select"
                      style={{ maxWidth: "150px" }}
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                    >
                      <option value="">Tous statuts</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                    <input
                      type="date"
                      className="form-control"
                      style={{ maxWidth: "170px" }}
                      value={filters.date}
                      onChange={(e) =>
                        setFilters({ ...filters, date: e.target.value })
                      }
                    />
                  </div>

                  {filteredAppointments.length === 0 && (
                    <p className="text-center text-muted">
                      Aucun rendez-vous correspondant.
                    </p>
                  )}

                  {filteredAppointments.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Genre</th>
                            <th>Age</th>
                            <th>Début</th>
                            <th>Fin</th>
                            <th>Statut</th>
                            <th>Notes</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAppointments.map((appt) => (
                            <tr key={appt.id}>
                              <td>{appt.patient.name}</td>
                              <td>{appt.patient.email}</td>
                              <td>{appt.patient.phone}</td>
                              <td>{appt.patient.gender}</td>
                              <td>{appt.patient.age}</td>
                              <td>{appt.start_at}</td>
                              <td>{appt.end_at}</td>
                              <td>
                                <span
                                  className={`badge ${getStatusBadge(appt.status)}`}
                                >
                                  {appt.status.charAt(0).toUpperCase() +
                                    appt.status.slice(1)}
                                </span>
                              </td>
                              <td>{appt.notes}</td>
                              <td>
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  onClick={() => handleEdit(appt)}
                                >
                                  Modifier
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {/* Modal Edition */}
              <Modal
                show={!!editAppointment}
                onHide={() => setEditAppointment(null)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modifier rendez-vous</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="mb-2">
                    <label className="form-label">Début</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={formData.start_at}
                      onChange={(e) =>
                        setFormData({ ...formData, start_at: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Fin</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={formData.end_at}
                      onChange={(e) =>
                        setFormData({ ...formData, end_at: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Statut</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setEditAppointment(null)}>
                    Annuler
                  </Button>
                  <Button variant="success" onClick={handleUpdate}>
                    Enregistrer
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
