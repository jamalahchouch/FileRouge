import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AppointmentPatient() {
  const { doctorId } = useParams();

  const [form, setForm] = useState({
    start_at: "",
    motif: "",
    notes: ""
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("Veuillez vous connecter pour prendre rendez-vous");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Veuillez vous connecter");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/appointments",
        { ...form, doctor_id: doctorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Rendez-vous réservé avec succès !");
    } catch (error) {
      console.log(error);
      setMessage("Erreur lors de la réservation.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-8 mt-10 rounded-lg border">
      <h2 className="text-2xl font-bold mb-5">Prendre un rendez-vous</h2>

      {message && (
        <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Date & Heure</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={form.start_at}
            onChange={(e) => setForm({ ...form, start_at: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Motif</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.motif}
            onChange={(e) => setForm({ ...form, motif: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes (optionnel)</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Confirmer le rendez-vous
        </button>
      </form>
    </div>
  );
}
