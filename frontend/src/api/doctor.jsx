// src/api/doctor.js
import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/doctor";

function authHeaders(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export const doctorStats = (token) => axios.get(`${BASE}/stats`, authHeaders(token));
export const doctorAppointments = (token) => axios.get(`${BASE}/appointments`, authHeaders(token));
export const doctorUpdateAppointment = (id, data, token) =>
  axios.put(`${BASE}/appointments/${id}`, data, authHeaders(token));

// Availability endpoints
export const createAvailability = (payload, token) =>
  axios.post(`${BASE}/availability`, payload, authHeaders(token));
export const updateAvailability = (id, payload, token) =>
  axios.put(`${BASE}/availability/${id}`, payload, authHeaders(token));
export const deleteAvailability = (id, token) =>
  axios.delete(`${BASE}/availability/${id}`, authHeaders(token));

// Try to fetch availabilities: if endpoint missing, will reject; caller should handle fallback
export const listAvailabilities = (token) =>
  axios.get(`${BASE}/availability`, authHeaders(token));
