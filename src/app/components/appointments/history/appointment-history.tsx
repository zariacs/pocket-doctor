"use client";
import { useState, useEffect } from "react";

export default function AppointmentHistory() {
  // Gets and displays all appointments related to the current user

  type Appointment = {
    id: string;
    dateTime: string;
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

  // Without useEffect this function call happens a million times and never stops
  useEffect(() => {
    fetchAppointments();
  }, []);

  if (appointments.length > 0) {
    return (
      <>
        <h3>Appointment History</h3>
        <ul className="list-group">
          {appointments.map((appointment) => (
            // <li key={appointment.id} className="list-group-item">
            //   {new Date(appointment.date).toDateString()}
            //   {" - "}
            //   {new Date(appointment.time).toLocaleTimeString()}
            //   {/* Want to add the name of the doctor related to the appointment as well */}
            // </li>
            <li key={appointment.id} className="list-group-item">
              {new Date(appointment.dateTime).toDateString()}
              {" - "}
              {new Date(appointment.dateTime).toLocaleTimeString([], {
                timeStyle: "short",
              })}
              {/* If the above locale timestring is found to be unsupported in some browsers, I can use this instead:
              .toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
              .replace(/(:\d{2}| [AP]M)$/, "");
                */}
              {/* Want to add the name of the doctor related to the appointment as well */}
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <h3>Appointment History</h3>
        <p>Your appointments will go here</p>
      </>
    );
  }
}
