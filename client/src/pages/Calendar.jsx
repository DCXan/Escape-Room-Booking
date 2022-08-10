import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import { Button } from "../components/Button";

const Calendar = () => {
  return (
    <section>
      <Button>Add Event</Button>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridWeek" />
    </section>
  );
};

export default Calendar;
