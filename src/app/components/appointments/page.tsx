import PatientProfile from "../patients/profile/profile";
import AppointmentHistory from "./history/appointment-history";
import NewAppointment from "./new/new-appointment";

export default async function AppointmentsPage() {
  return (
    <>
      <h1>Appointments</h1>
      <section>
        <NewAppointment />
      </section>
      <section>
        <AppointmentHistory />
      </section>
      <section>
        <PatientProfile />
      </section>
    </>
  );
}
