import AppointmentHistory from "./history/appointment-history";
import NewAppointment from "./new/new-appointment";

export default async function AppointmentsPage() {
  return (
    <>
      <h1>Appointments</h1>
      <section>
        <h2>Make a New Appointment</h2>
        <NewAppointment />
      </section>
      <section>
        <h2>Appointment History</h2>
        {/* <AppointmentHistory /> */}
      </section>
    </>
  );
}
