"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDay, setHours, setMinutes, setSeconds } from "date-fns";

export default function NewAppointment() {
  const [aptDateTime, setAptDateTime] = useState(
    setMinutes(addDays(new Date(), 1), 0)
  );
  const [unAvailableTimes, setUnAvailableTimes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  async function createAppointment() {
    try {
      const response = await fetch("/api/appointments/new", {
        method: "POST",
        // body: JSON.stringify({ date: aptDate, time: aptTime }),
        body: JSON.stringify({ dateTime: aptDateTime }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Keeping this data value for future testing if ever needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchUpcomingAppointments() {
    // I want this to return a list of upcoming appointment times
    try {
      const response = await fetch("/api/appointments/upcoming/date-times");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Converting the json to a list of numbers where each number
      // represents the number of milliseconds since January 1, 1970 00:00:00
      let upcomingAptTimes: Array<number> = [];

      for (let i = 0; i < data.length; i++) {
        const dateTimeString = data[i].dateTime;
        const dateTime = new Date(dateTimeString);
        if (!isNaN(dateTime.getTime())) {
          upcomingAptTimes.push(dateTime.getTime());
        }
      }
      return upcomingAptTimes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return [];
  }

  useEffect(() => {
    // Fetches the upcoming appointments when the component mounts
    async function fetchAppointments() {
      try {
        const response = await fetchUpcomingAppointments();
        setUnAvailableTimes(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const isWeekday = (date: Date) => {
    // Returns true if date falls on a weekday
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const filterPassedTime = (time: Date) => {
    // Returns true if the datetime has already passed
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  function filterBookedAppointments(time: Date) {
    const selectedTime = new Date(time);
    return !unAvailableTimes.includes(selectedTime.getTime());
  }

  const filterUnavailableTimes = (time: Date): boolean => {
    if (loading) {
      // Data is still being fetched, return false to prevent selection
      return filterPassedTime(time);
    }
    // Updates available times once the fetch request is complete
    return filterPassedTime(time) && filterBookedAppointments(time);
  };

  return (
    <>
      <h3>Make a New Appointment</h3>
      <form>
        <DatePicker
          placeholderText="Click to select a date and time"
          selected={aptDateTime}
          shouldCloseOnSelect={false}
          isClearable
          minDate={addDays(new Date(), 1)}
          maxDate={addDays(new Date(), 548)}
          className="form-control"
          filterDate={isWeekday}
          filterTime={filterUnavailableTimes}
          onChange={(date: Date) => setAptDateTime(date)}
          showTimeSelect
          includeTimes={[
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 9),
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 11),
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 13),
            setHours(setMinutes(setSeconds(new Date(), 0), 0), 15),
          ]}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={30}
        />
        <div className="button">
          <button
            onClick={createAppointment}
            type="button"
            className="btn btn-dark"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </>
  );
}
