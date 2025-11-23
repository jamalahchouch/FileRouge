import { useEffect, useState } from "react";
import { secretaryAPI } from "../../api/secretary";

export default function SecretaryStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    secretaryAPI.getStats().then(res => setStats(res.data));
  }, []);

  if (!stats) return "Chargement...";

  return (
    <div className="card p-3 shadow">
      <h5>Statistiques</h5>
      <ul>
        <li>Total : {stats.total}</li>
        <li>En attente : {stats.pending}</li>
        <li>Confirmés : {stats.confirmed}</li>
        <li>Complétés : {stats.completed}</li>
      </ul>
    </div>
  );
}
