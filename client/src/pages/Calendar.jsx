import React, { useRef, useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import Button from "../components/Button";
import AddEventModal from "../components/AddEventModal";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState();
  const calendarRef = useRef(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  // const onEventAdded = (event) => {
  //   let calendarApi = calendarRef.current.getApi();
  //   calendarApi.addEvent({
  //     start: event.start,
  //     end: event.end,
  //     title: event.title,
  //   });
  // };

  const getRooms = async () => {
    const response = await fetch(`http://localhost:8000/admin/get-rooms`);
    const result = await response.json();

    if (result.success) {
      setEvents(result.rooms);
    } else {
      console.log(result.message);
    }
  };

  // const displayRooms = rooms.map((room) => {
  //   console.log(room.date);
  //   return (
  //     <li key={room._id}>
  //       <h5>{room.title}</h5>
  //       <p>{room.date}</p>
  //       <p>{room.durationMinutes}</p>
  //     </li>
  //   );
  // });

  // async function handleDateSet(data) {
  //   const response = await axios.get(
  //     "/get-events?start=" +
  //       data.start.toISOString() +
  //       "&end" +
  //       data.end.toISOString()
  //   );
  //   setEvents(response.data);
  // }
  console.log(events);

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
        // eventAdd={(event) => handleEventAdd(event)}
        // datesSet={(date) => handleDateSet(date)}
      />
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        // onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default Calendar;
