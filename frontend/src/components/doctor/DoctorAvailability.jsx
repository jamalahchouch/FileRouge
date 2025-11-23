import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorLayout from "../layout/DoctorLayout";

export default function DoctorAvailability() {
  const doctor = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [editingSlot, setEditingSlot] = useState(null);

  const loadSlots = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/doctor/availability", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSlots(res.data);
    } catch (err) {
      console.error("load availability error", err);
    } finally {
      setLoading(false);
    }
  };

  const createSlot = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/doctor/availability",
        { start_at: startAt, end_at: endAt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStartAt("");
      setEndAt("");
      loadSlots();
    } catch (err) {
      console.error("create slot error", err);
    }
  };

  const deleteSlot = async (id) => {
    if (!window.confirm("Supprimer ce créneau ?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/doctor/availability/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadSlots();
    } catch (err) {
      console.error("delete slot error", err);
    }
  };

  const updateSlot = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/doctor/availability/${editingSlot.id}`,
        { start_at: editingSlot.start_at, end_at: editingSlot.end_at },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingSlot(null);
      loadSlots();
    } catch (err) {
      console.error("update slot error", err);
    }
  };

  const groupByDay = () => {
    const groups = {};
    slots.forEach(slot => {
      const day = new Date(slot.start_at).toLocaleDateString();
      if (!groups[day]) groups[day] = [];
      groups[day].push(slot);
    });
    return groups;
  };

  if (!doctor) return <p>Doctor not logged in</p>;

  return (
    <DoctorLayout doctor={doctor}>
      <div className="container py-4">

        <h3 className="mb-4 fw-bold text-primary">Gestion des Disponibilités</h3>

        {/* Ajouter un créneau */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="mb-3">Ajouter un créneau</h5>
            <div className="d-flex gap-2">
              <input type="datetime-local" className="form-control"
                value={startAt} onChange={e => setStartAt(e.target.value)} />
              <input type="datetime-local" className="form-control"
                value={endAt} onChange={e => setEndAt(e.target.value)} />
              <button className="btn btn-primary" onClick={createSlot}>Ajouter</button>
            </div>
          </div>
        </div>

        {/* Liste des disponibilités style TLSContact */}
        {loading ? (
          <p>Chargement…</p>
        ) : (

          <>
            {Object.entries(groupByDay()).map(([day, daySlots]) => (
              <div key={day} className="mb-4">
                <h5 className="fw-bold text-secondary mb-3">
                  📅 {day}
                </h5>

                <div className="d-flex flex-wrap gap-3">
                  {daySlots.map(slot => (
                    <div key={slot.id}
                      className="p-3 border rounded shadow-sm"
                      style={{ minWidth: "180px" }}
                    >
                      <div className="fw-bold text-primary">
                        {new Date(slot.start_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        {" - "}
                        {new Date(slot.end_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>

                      <div className="d-flex mt-2 gap-2">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => setEditingSlot(slot)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteSlot(slot.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Modal d'édition */}
        {editingSlot && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content shadow">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier un créneau</h5>
                  <button className="btn-close" onClick={() => setEditingSlot(null)}></button>
                </div>

                <div className="modal-body">
                  <input type="datetime-local" className="form-control mb-3"
                    value={editingSlot.start_at}
                    onChange={e => setEditingSlot({ ...editingSlot, start_at: e.target.value })} />

                  <input type="datetime-local" className="form-control"
                    value={editingSlot.end_at}
                    onChange={e => setEditingSlot({ ...editingSlot, end_at: e.target.value })} />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setEditingSlot(null)}>Annuler</button>
                  <button className="btn btn-primary" onClick={updateSlot}>Enregistrer</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DoctorLayout>
  );
}
