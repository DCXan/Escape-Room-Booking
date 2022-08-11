import React, { useRef, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import Button from "../components/Button";
import AddEventModal from "../components/AddEventModal";
import { add, sub, format, parse } from "date-fns";
import axios from "axios";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState();
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: event.start,
      end: event.end,
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    await axios.post("/calendar/create-event", data.event);
  }

  // async function handleDateSet(data) {
  //   const response = await axios.get(
  //     "/get-events?start=" +
  //       data.start.toISOString() +
  //       "&end" +
  //       data.end.toISOString()
  //   );
  //   setEvents(response.data);
  // }

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
        // datesSet={(date) => handleDateSet(date)}
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
