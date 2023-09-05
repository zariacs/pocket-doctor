import Link from "next/link";
import Create from "./create";

export default function WelcomeNewPatientPage() {
  return (
    <>
      <Create />

      <h1>Welcome</h1>
      <Link href="/components/appointments/">
        <button>Make New Appointment</button>
      </Link>
    </>
  );
}
