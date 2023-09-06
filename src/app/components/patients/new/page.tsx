import Link from "next/link";
import NewPatient from "./create";

export default async function WelcomeNewPatientPage() {
  return (
    <>
      <NewPatient />
      <h1>Welcome</h1>
      <Link href="/components/appointments/">
        <button type="button" className="btn btn-dark">
          Make a New Appointment
        </button>
      </Link>
    </>
  );
}
