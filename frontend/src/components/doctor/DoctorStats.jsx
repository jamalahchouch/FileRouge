import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorLayout from "../layout/DoctorLayout";
import Header from "../layout/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function DoctorStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });

  const token = localStorage.getItem("token");
  const doctor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/doctor/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Erreur chargement stats", err);
    }
  };

  const statCards = [
    { label: "Total", value: stats.total, color: "#0d6efd" },
    { label: "En attente", value: stats.pending, color: "#ffc107" },
    { label: "Confirmé", value: stats.confirmed, color: "#0dcaf0" },
    { label: "Annulé", value: stats.cancelled, color: "#dc3545" },
    { label: "Terminé", value: stats.completed, color: "#198754" },
  ];

  const chartData = [
    { name: "En attente", value: stats.pending },
    { name: "Confirmé", value: stats.confirmed },
    { name: "Annulé", value: stats.cancelled },
    { name: "Terminé", value: stats.completed },
  ];

  return (
    <DoctorLayout doctor={doctor}>
      <Header />
      <div className="p-4 bg-light rounded shadow-sm mt-3">
        <h2 className="mb-4">Statistiques des rendez-vous</h2>

        {/* Cards */}
        <div className="row g-3 mb-4">
          {statCards.map((card) => (
            <div key={card.label} className="col-6 col-md-4 col-lg-2">
              <div
                className="card shadow-sm h-100 text-white"
                style={{ borderRadius: "10px", backgroundColor: card.color }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title">{card.label}</h5>
                  <h3 className="card-text">{card.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graphique barres */}
        <div className="card p-3 shadow-sm">
          <h5 className="mb-3">Rendez-vous par statut</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#0d6efd" barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === "En attente"
                        ? "#ffc107"
                        : entry.name === "Confirmé"
                        ? "#0dcaf0"
                        : entry.name === "Annulé"
                        ? "#dc3545"
                        : "#198754"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DoctorLayout>
  );
}
