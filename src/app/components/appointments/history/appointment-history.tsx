"use client";
import { useState, useEffect } from "react";

export default function AppointmentHistory() {
  // Gets and displays all appointments related to the current user

  type Appointment = {
    id: string;
    date: Date;
    time: Date;
    doctorId: string;
  };
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function fetchAppointments() {
    try {
      const res = await fetch("/api/appointments/history");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <h1>Appointment History</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {new Date(appointment.date).toDateString()}{" "}
            {new Date(appointment.time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </>
  );
}
