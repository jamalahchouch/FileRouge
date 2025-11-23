import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/doctor/${id}`)
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!doctor)
    return <p className="text-center mt-5 text-lg">Chargement du profil...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow p-8 rounded-lg border">
      <div className="flex items-center gap-6">
        <img
          src={
            doctor.image
              ? `http://127.0.0.1:8000/storage/${doctor.image}`
              : "https://via.placeholder.com/120"
          }
          alt={doctor.name}
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-3xl font-bold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.email}</p>
          <p className="text-blue-600 font-semibold">{doctor.speciality}</p>
          <p className="text-gray-500">{doctor.city}</p>
        </div>
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed">
        {doctor.description ?? "Pas de description disponible"}
      </p>

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        onClick={() => navigate(`/take-appointment/${doctor.id}`)}
      >
        Prendre un rendez-vous
      </button>
    </div>
  );
}
