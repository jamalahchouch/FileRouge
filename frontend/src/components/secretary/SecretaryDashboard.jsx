import SecretaryAppointments from "./SecretaryAppointments";
import CreateAppointmentForm from "./CreateAppointmentForm";
import SecretaryStats from "./secretarystats";

export default function SecretaryDashboard() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Dashboard Secrétaire</h2>

      <SecretaryStats />

      <div className="row mt-4">
        <div className="col-md-4">
          <CreateAppointmentForm />
        </div>

        <div className="col-md-8">
          <SecretaryAppointments />
        </div>
      </div>
    </div>
  );
}
