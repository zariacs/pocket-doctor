"use client";
import type { Appointment } from "@prisma/client";
import { useState, useEffect } from "react";

export default function AppointmentHistory() {
  // Gets and displays all appointments related to the current user
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/appointments/history");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setAppointments(data);
        console.log(appointments);
        console.log("The type of variable is", typeof appointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAppointments();
  });

  return (
    <>
      <h1>Appointment History</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {/* {appointment.date.toString()} {appointment.time.toString()} */}
          </li>
        ))}
      </ul>
    </>
  );
}
