import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function SecretaryStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/secretary/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div className="text-center p-4">Chargement...</div>;

  // 🎨 Couleurs modernes pour chaque statut
  const COLORS = {
    total: "#1E88E5",
    pending: "#FBC02D",
    confirmed: "#43A047",
    cancelled: "#E53935",
    completed: "#8E24AA",
  };

  const chartData = [
    { name: "En attente", value: stats.pending, color: COLORS.pending },
    { name: "Confirmés", value: stats.confirmed, color: COLORS.confirmed },
    { name: "Annulés", value: stats.cancelled, color: COLORS.cancelled },
    { name: "Terminés", value: stats.completed, color: COLORS.completed },
  ];

  return (
    <div className="container py-4">

      <h2 className="text-center fw-bold mb-4">📊 Statistiques des Rendez-Vous</h2>

      {/* ⭐ Cards des statistiques */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow border-0 text-white" style={{ background: COLORS.total }}>
            <div className="card-body text-center">
              <h4>Total</h4>
              <p className="fs-2 fw-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-white" style={{ background: COLORS.pending }}>
            <div className="card-body text-center">
              <h4>En attente</h4>
              <p className="fs-2 fw-bold">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-white" style={{ background: COLORS.confirmed }}>
            <div className="card-body text-center">
              <h4>Confirmés</h4>
              <p className="fs-2 fw-bold">{stats.confirmed}</p>
            </div>
          </div>
        </div>

       

        <div className="col-md-3 mt-3">
          <div className="card shadow border-0 text-white" style={{ background: COLORS.completed }}>
            <div className="card-body text-center">
              <h4>Terminés</h4>
              <p className="fs-2 fw-bold">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ Graphique circulaire */}
      <div className="card shadow mt-5 p-4">
        <h4 className="text-center mb-3">Répartition des statuts</h4>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
