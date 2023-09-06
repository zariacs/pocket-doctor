"use client";

import { useEffect } from "react";

export default function NewPatient() {
  async function createPatient() {
    try {
      const response = await fetch("/api/patients/new", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // keeping this data value for future testing if ever needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    createPatient();
  }, []);

  return <></>;
}
