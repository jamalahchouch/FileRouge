import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorLayout from "../layout/DoctorLayout";

export default function DoctorStats() {
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0 });

  const loadStats = async () => {
    try {
      const res = await axios.get("/api/doctor/stats");
      setStats(res.data);
    } catch (err) {
      console.error("doctorStats error", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
   <DoctorLayout doctor={doctor}>
    <div>
      <h4>Statistics</h4>
      <div className="d-flex gap-3 mt-3">
        <div className="p-3 bg-primary text-white rounded flex-fill text-center">
          <h5>Total</h5>
          <p className="fs-3">{stats.total}</p>
        </div>
        <div className="p-3 bg-success text-white rounded flex-fill text-center">
          <h5>Confirmed</h5>
          <p className="fs-3">{stats.confirmed}</p>
        </div>
        <div className="p-3 bg-warning text-dark rounded flex-fill text-center">
          <h5>Pending</h5>
          <p className="fs-3">{stats.pending}</p>
        </div>
      </div>
    </div>
    </DoctorLayout>
  );
}
