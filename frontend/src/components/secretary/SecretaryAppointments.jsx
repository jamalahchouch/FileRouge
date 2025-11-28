import { useEffect, useState } from "react";
import { secretaryAPI } from "../../api/secretary";

export default function SecretaryAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    start_at: "",
    end_at: "",
  });

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await secretaryAPI.listDoctors();

        const list =
          Array.isArray(res.data) ? res.data :
          Array.isArray(res.data.doctors) ? res.data.doctors :
          Array.isArray(res.data.data) ? res.data.data :
          [];

        setDoctors(list);
      } catch (e) {
        console.error("Erreur API Docteurs :", e);
        setDoctors([]);
      }
    }

    loadDoctors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await secretaryAPI.createAppointment(form);
      alert("Rendez-vous créé !");
    } catch (e) {
      console.error("Erreur création RDV :", e);
    }
  };

  return (
    <div className="card p-3">
      <h4>Créer un Rendez-vous</h4>

      <label>Docteur :</label>
      <select
        className="form-control mb-3"
        value={form.doctor_id}
        onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
      >
        <option value="">Choisir un médecin</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <label>Date début :</label>
      <input
        type="datetime-local"
        className="form-control mb-3"
        value={form.start_at}
        onChange={(e) => setForm({ ...form, start_at: e.target.value })}
      />

      <label>Date fin :</label>
      <input
        type="datetime-local"
        className="form-control mb-3"
        value={form.end_at}
        onChange={(e) => setForm({ ...form, end_at: e.target.value })}
      />

      <button onClick={handleCreate} className="btn btn-primary">
        Enregistrer
      </button>
    </div>
  );
}
