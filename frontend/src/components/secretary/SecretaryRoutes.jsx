import { Routes, Route } from "react-router-dom";
import CreateAppointmentForm from "./CreateAppointmentForm";
import DoctorList from "./DoctorList";
import SecretaryStats from "./SecretaryStats";
import NavbarSecretary from "./NavbarSecretary";

export default function SecretaryRoutes() {
  return (
    <>
      <NavbarSecretary />

      <div className="container mt-4">

        <Routes>
          <Route path="/secretary/stats" element={<SecretaryStats />} />

          <Route path="/secretary/create" element={<CreateAppointmentForm />} />

          <Route path="/secretary/doctors" element={<DoctorList />} />
        </Routes>

      </div>
    </>
  );
}
