import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home.jsx";
// Login
import Login from "./components/Login";
import RegisterDoctor from "./page/RegisterDoctor.jsx";
import RegisterSecretary from "./page/RegisterSecretary.jsx";
import DashboardPatient from "./page/DashboardPatient.jsx"

// Doctor Components
import DoctorDashboard from "./page/DoctorDashboard";
import DoctorAvailability from "./components/doctor/DoctorAvailability";
import DoctorAppointments from "./components/doctor/DoctorAppointments";
import DoctorStats from "./components/doctor/DoctorStats";

// Secretary Components
import SecretaryDashboard from "./components/secretary/SecretaryDashboard";
import SecretaryAppointments from "./components/secretary/SecretaryAppointments";
import SecretaryStats from "./components/secretary/SecretaryStats.jsx";
import CreateAppointmentForm from "./components/secretary/CreateAppointmentForm";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role && role !== userRole) return <Navigate to="/login" />;

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />

        <Route path="/dashboardpatient" element={<DashboardPatient />}/>
         <Route path="/register-doctor" element={<RegisterDoctor />} />
         <Route path="/register-secretary" element={<RegisterSecretary />} />

        {/* Doctor Routes */}
        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRoute role="doctor">
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/availability"
          element={
            <PrivateRoute role="doctor">
              <DoctorAvailability />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <PrivateRoute role="doctor">
              <DoctorAppointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/stats"
          element={
            <PrivateRoute role="doctor">
              <DoctorStats />
            </PrivateRoute>
          }
        />

        <Route
          path="/secretary/*"
          element={
            <PrivateRoute role="secretary">
              <SecretaryDashboard />
            </PrivateRoute>
          }
        />

        {/* Secretary Routes */}
        <Route
          path="/secretary/dashboard"
          element={
            <PrivateRoute role="secretaire">
              <SecretaryDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/secretary/appointments"
          element={
            <PrivateRoute role="secretary">
              <SecretaryAppointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/secretary/stats"
          element={
            <PrivateRoute role="secretary">
              <SecretaryStats />
            </PrivateRoute>
          }
        />
        <Route
          path="/secretary/create-appointment"
          element={
            <PrivateRoute role="secretary">
              <CreateAppointmentForm />
            </PrivateRoute>
          }
        />
        <Route
  path="/secretary"
  element={
    <PrivateRoute role="secretary">
      <SecretaryDashboard />
    </PrivateRoute>
  }
>
  
</Route>

        

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
