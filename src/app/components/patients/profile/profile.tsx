"use client";
import { useEffect, useState } from "react";

export default function PatientProfile() {
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
      setFName(patient.fname);
      setLName(patient.lname);
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
          // All IP address related code has been commented out for now
          // ip: getClientIp(),
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

  // All IP address related code has been commented out for now
  // async function getClientIp() {
  //   const ip = await fetch("https://api.ipify.org?format=json", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .catch((error) => console.error(error));

  //   return ip || "0.0.0.0";
  // }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <h1>My Profile</h1>
      <div className="profile-group">
        <h6>
          {fName} {lName}
        </h6>
      </div>
      <div className="profile-group">
        <h6>Are you allergic to anything?</h6>
        <input
          key="allergies"
          type="text"
          defaultValue={allergies}
          onChange={(event) => setAllergies(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="profile-group">
        <h6>Medications that you&apos;re currently taking:</h6>
        <input
          type="text"
          defaultValue={medications}
          onChange={(event) => setMedications(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="profile-group">
        <h6>Address:</h6>
        <input
          type="text"
          defaultValue={address}
          onChange={(event) => setAddress(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="button">
        <button
          onClick={saveProfile}
          type="button"
          className="btn btn-dark btns"
        >
          Save
        </button>
      </div>
    </>
  );
}
