import { useState } from "react";
import { secretaryAPI } from "../../api/secretary";

export default function CreateAppointmentForm() {
  const [form, setForm] = useState({
    doctor_id: "",
    patient_id: "",
    start_at: "",
    end_at: "",
    notes: "",
  });

  const submit = () => {
    secretaryAPI.createAppointment(form).then(() => {
      alert("RDV créé !");
      setForm({});
    });
  };

  return (
    <div className="card p-3 shadow">
      <h5>Nouveau rendez-vous</h5>

      <input className="form-control mb-2" placeholder="ID patient"
        onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
      />

      <input className="form-control mb-2" placeholder="ID docteur"
        onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
      />

      <input type="datetime-local" className="form-control mb-2"
        onChange={(e) => setForm({ ...form, start_at: e.target.value })}
      />

      <input type="datetime-local" className="form-control mb-2"
        onChange={(e) => setForm({ ...form, end_at: e.target.value })}
      />

      <textarea className="form-control mb-2" placeholder="Notes"
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <button className="btn btn-success w-100" onClick={submit}>
        Créer
      </button>
    </div>
  );
}
