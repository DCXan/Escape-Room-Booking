import React, { useRef, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import Button from "../components/Button";
import AddEventModal from "../components/AddEventModal";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import axios from "axios";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState();
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
  };

  async function handleEventAdd(data) {
    await axios.post("/create-event", data.event);
  }

  async function handleDateSet(data) {
    const response = await axios.get(
      "get-events?start=" +
        formatDate(data.start).toISOString() +
        "&end" +
        formatDate(data.end).toISOString()
    );
    setEvents(response.data);
  }

  return (
    <section>
      <button
        type="button"
        className="text-3xl p-1 m-4 hover:drop-shadow-xl hover:bg-light-gray dark:bg-secondary-dark-bg text-white relative"
        style={{ background: "darkgray", borderRadius: "5%", zIndex: "0" }}
        onClick={() => setModalOpen(true)}
      >
        Add Event
      </button>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        events={events}
        initialView="dayGridWeek"
        eventAdd={(event) => handleEventAdd(event)}
        datesSet={(date) => handleDateSet(date)}
      />
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default Calendar;
