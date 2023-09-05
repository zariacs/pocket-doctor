import Create from "../patients/new/create";

export default async function Page() {
  return (
    <>
      <Create></Create>
      <h1>Appointments</h1>
      <section>
        <h2>Make a New Appointment</h2>
        <form></form>
      </section>
      <section>
        <h2>Pending Appointments</h2>
      </section>
      <section>
        <h2>Previous Appointments</h2>
      </section>
    </>
  );
}
