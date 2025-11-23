import { useEffect, useState } from "react";
import { secretaryAPI } from "../../api/secretary";

export default function SecretaryAppointments() {
  const [appointments, setAppointments] = useState([]);

  const load = () => {
    secretaryAPI.listAppointments().then(res => setAppointments(res.data));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card p-3 shadow">
      <h5>Liste des Rendez-vous</h5>

      {appointments.map(a => (
        <div key={a.id} className="border rounded p-2 mb-2">
          <b>Docteur : {a.doctor?.name}</b><br/>
          <b>Patient : {a.patient?.name}</b><br/>
          <span>{a.start_at}</span>
        </div>
      ))}
    </div>
  );
}
