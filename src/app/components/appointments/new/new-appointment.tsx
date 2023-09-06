"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDay, setHours, setMinutes, setSeconds } from "date-fns";

export default function NewAppointment() {
  const [aptDate, setAptDate] = useState(new Date());
  // Sets the initially selected time as 9:00 AM, the earliest possible appointment time
  // on any day
  const [aptTime, setaptTime] = useState(
    setHours(setMinutes(setSeconds(new Date(), 0), 0), 9)
  );

  //   const [aptTime, setaptTime] = useState("");
  // The time selected by user will be converted to a time slot string as follows:
  // 9:00 AM - "A"
  // 11:00 AM - "B"
  // 1:00 PM - "C"
  // 3:00 PM - "D"
  // This conversion will be implemented by naming the key for each time slot button
  // as the letter it corresponds to, then when a time button is clicked, setting the
  // time slot (aptTime) to the key of the button selected (where the key is the
  // corresponding letter/char/string).

  //   useEffect(() => {
  //     async function createAppointment() {
  //       try {
  //         const response = await fetch("/api/appointments/new", {
  //           method: "POST",
  //           body: JSON.stringify({ date: aptDate, time: aptTime }),
  //         });
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json(); // keeping this data value for future testing if ever needed
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }

  //     createAppointment();
  //   }),
  //     [];

  async function createAppointment() {
    try {
      const response = await fetch("/api/appointments/new", {
        method: "POST",
        body: JSON.stringify({ date: aptDate, time: aptTime }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // keeping this data value for future testing if ever needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const isWeekday = (date: Date) => {
    // Returns true if date falls on a weekday
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  return (
    <>
      <h1>Make a New Appointment</h1>
      <form>
        <DatePicker
          placeholderText="Click to select a date"
          selected={aptDate}
          onChange={(date: Date) => setAptDate(date)}
          shouldCloseOnSelect={false}
          isClearable
          minDate={addDays(new Date(), 0)}
          // Alternatively could use today's date as the minDate. However:
          // In future, I could add the amount of days between today and the next available appointment's date,
          // disabling the option of looking at current and future days that don't have available appointments.
          // This is why I used addDays here instead of just using today's date as the minDate to make
          // implementing this idea easier in future.
          // In future, can also exclude specific dates that are all filled up appointment-wise using filterDate
          // and a relevant function that returns a boolean for if that day has availability
          // Doing this may make the addDays idea unnecessary ^.^ and I prefer prioritizing this second option
          // as it is more useful than just the first one and includes the effect of the first one as well plus more
          maxDate={addDays(new Date(), 548)}
          // Can schedule an appointment up to one and a half years in advance to facilitate people who want to
          // schedule an annual checkup
          filterDate={isWeekday}
          // Disallows weekend appointments
        />
        <DatePicker
          placeholderText="Click to select a time"
          selected={aptTime}
          onChange={(date: Date) => setaptTime(date)}
          isClearable
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          includeTimes={[
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 9),
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 11),
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 13),
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 15),
          ]}
        />
        ;<button onClick={createAppointment}>Book Appointment</button>
      </form>
    </>
  );
}
