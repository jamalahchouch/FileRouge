import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateAppointmentForm() {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [patient, setPatient] = useState(null);

  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    gender: "",
    password: "",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    doctor_id: "",
    start_at: "",
    end_at: "",
    notes: "",
  });

  const token = localStorage.getItem("token");

  // Charger médecins
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/secretary/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDoctors(res.data || []))
      .catch(() => setDoctors([]))
      .finally(() => setLoadingDoctors(false));
  }, []);

  // Création patient
  const createPatient = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/secretary/create-patient",
        patientForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPatient(res.data.patient);

      // Reset
      setPatientForm({
        name: "",
        email: "",
        age: "",
        phone: "",
        gender: "",
        password: "",
      });

      alert("🎉 Patient créé avec succès !");
    } catch (error) {
      alert("❌ Erreur création patient");
    }
  };

  // Création rendez-vous
  const createAppointment = async () => {
    if (!patient) {
      alert("Veuillez d’abord créer un patient.");
      return;
    }

    const payload = {
      patient_id: patient.id,
      doctor_id: appointmentForm.doctor_id,
      start_at: appointmentForm.start_at.replace("T", " ") + ":00",
      end_at: appointmentForm.end_at.replace("T", " ") + ":00",
      notes: appointmentForm.notes,
    };

    try {
      await axios.post(
        "http://localhost:8000/api/secretary/appointments",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointmentForm({
        doctor_id: "",
        start_at: "",
        end_at: "",
        notes: "",
      });

      alert("📅 Rendez-vous créé !");
    } catch (error) {
      alert("❌ Erreur création rendez-vous");
    }
  };

  return (
    <div className="container py-4">

      {/* ----------------------- HEADER ----------------------- */}
      <h2 className="fw-bold text-center mb-4">
         Creation Patient & Rendez-vous
      </h2>

      <div className="row g-4">

        {/* ------------------- FORMULAIRE PATIENT ------------------- */}
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h4 className="fw-semibold mb-3"> Créer un patient</h4>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                placeholder="Nom"
                value={patientForm.name}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, name: e.target.value })
                }
              />
              <label>Nom complet</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={patientForm.email}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, email: e.target.value })
                }
              />
              <label>Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Âge"
                value={patientForm.age}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, age: e.target.value })
                }
              />
              <label>Âge</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                placeholder="Téléphone"
                value={patientForm.phone}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, phone: e.target.value })
                }
              />
              <label>Téléphone</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-control"
                value={patientForm.gender}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, gender: e.target.value })
                }
              >
                <option value="">Genre</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
              <label>Genre</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                value={patientForm.password}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, password: e.target.value })
                }
              />
              <label>Mot de passe</label>
            </div>

            <button className="btn btn-success w-100 py-2 fs-5 rounded-3" onClick={createPatient}>
               Créer le patient
            </button>
          </div>
        </div>

        {/* ------------------- FORMULAIRE RENDEZ-VOUS ------------------- */}
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-4 p-4">

            <h4 className="fw-semibold mb-3">
               Créer un rendez-vous
            </h4>

            {!patient && (
              <p className="text-muted fst-italic">
                Vous devez d’abord créer un patient.
              </p>
            )}

            {patient && (
              <>
                <div className="alert alert-success py-2">
                  Patient sélectionné : <b>{patient.name}</b>
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    value={appointmentForm.doctor_id}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        doctor_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Choisir un médecin</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <label>Médecin</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={appointmentForm.start_at}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        start_at: e.target.value,
                      })
                    }
                  />
                  <label>Début du rendez-vous</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={appointmentForm.end_at}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        end_at: e.target.value,
                      })
                    }
                  />
                  <label>Fin du rendez-vous</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    className="form-control"
                    placeholder="Notes"
                    style={{ height: "90px" }}
                    value={appointmentForm.notes}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        notes: e.target.value,
                      })
                    }
                  />
                  <label>Notes</label>
                </div>

                <button
                  className="btn btn-success w-100 py-2 fs-5 rounded-3"
                  onClick={createAppointment}
                >
                  ✔ Créer le rendez-vous
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
