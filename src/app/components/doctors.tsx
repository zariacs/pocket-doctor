"use client";
import { useState, useEffect } from "react";

type Doctor = {
  // Specified type here and in initialization of doctors to satisfy TypeScript during list element creation which requiers object property references
  id: number;
  fname: string;
  lname: string;
};

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch("/api/doctors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDoctors();
  }, []);

  return (
    <ul>
      {doctors.map((doctor) => (
        <li key={doctor.id}>
          {doctor.fname} {doctor.lname}
        </li>
      ))}
    </ul>
  );
}
