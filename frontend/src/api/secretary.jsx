import axios from "axios";

export const secretaryAPI = {
  createAppointment: (data) => axios.post("/secretary/appointments", data),
  listAppointments: (params) => axios.get("/secretary/appointments", { params }),
  updateAppointment: (id, data) => axios.put(`/secretary/appointments/${id}`, data),
  deleteAppointment: (id) => axios.delete(`/secretary/appointments/${id}`),
  getStats: () => axios.get("/secretary/stats"),
};
