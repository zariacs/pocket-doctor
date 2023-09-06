"use client";
import { currentUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function PatientProfile() {
  //   type Patient = {
  //     id: string;
  //     fname: string;
  //     lname: string;
  //     email: string;
  //     allergies: string;
  //     medications: string;
  //     address: string;
  //   };

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [address, setAddress] = useState("");

  async function fetchProfile() {
    try {
      const res = await fetch("/api/patients/profile");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const patient = await res.json();
      console.log(patient);
      setAllergies(patient.allergies);
      setMedications(patient.medications);
      setAddress(patient.address);
      setFName(patient.fName);
      setLName(patient.lName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function saveProfile() {
    try {
      const res = await fetch("/api/patients/profile/update", {
        method: "PUT",
        body: JSON.stringify({
          allergies: allergies,
          medications: medications,
          address: address,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json(); // Keeping this data value for future testing if ever needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <h1>My Profile</h1>
      <h3>First name:</h3>
      {fName}
      <h3>Last name:</h3>
      {lName}
      <h3>Allergies:</h3>
      <input
        key="allergies"
        type="text"
        defaultValue={allergies}
        onChange={(event) => setAllergies(event.target.value)}
      />
      <h3>Medications:</h3>
      <input
        type="text"
        defaultValue={medications}
        onChange={(event) => setMedications(event.target.value)}
      />
      <h3>Address:</h3>
      <input
        type="text"
        defaultValue={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <button onClick={saveProfile}>Save</button>
    </>
  );
}
