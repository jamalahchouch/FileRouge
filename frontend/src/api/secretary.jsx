import axios from "axios";

export const secretaryAPI = {
  createAppointment: (data) => axios.post("/secretary/appointments", data),
  listAppointments: (params) => axios.get("/secretary/appointments", { params }),
  updateAppointment: (id, data) => axios.put(`/secretary/appointments/${id}`, data),
  deleteAppointment: (id) => axios.delete(`/secretary/appointments/${id}`),
  getStats: () => axios.get("/secretary/stats"),
  listAppointments: () => axios.get("/secretary/appointments"),
  createAppointment: (data) => axios.post("/secretary/appointments/create", data),
  listDoctors: () => axios.get("/secretary/doctors"),
  createPatient: (data) => axios.post("/secretary/patient/create", data),
};
