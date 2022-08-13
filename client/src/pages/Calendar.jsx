import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import React, { useState } from "react"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import moment from "moment"
import "./style.css"

import { useEffect } from "react"
const GetRooms = () => {
  const [rooms, setRooms] = useState({})
  const [slot, setSlot] = useState([])
  const [day, setDay] = useState("")
  const [time, seTime] = useState("")
  moment.locale("en-GB")
  const localizer = momentLocalizer(moment)

  const DnDCalendar = withDragAndDrop(Calendar)
  useEffect(async () => {
    const time = moment("11:00 PM")
    const response = await fetch(`http://localhost:8000/admin/timeslot`)
    const result = await response.json()
    if (result.success) {
      setSlot(result.slot)
    } else {
      console.log(result.message)
    }
  }, [])

  // const eventItems = slot.map(slot =>{

  // })

  return (
    <div>
      <DnDCalendar
        className="rbc-calendar"
        localizer={localizer}
        events={[
          {
            id: 0,
            title: "Cell Block",
            start: new Date(2022, 7, 16, 19, 30, 0), // Year , month(index),day, hour,minutes,seconds
            end: new Date(2022, 7, 16, 20, 30, 0),
          },
        ]}
        defaultDate={moment().toDate()}
        draggableAccessor={events => true}
        step="15"
      />
    </div>
  )
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
// console.log(events)

//   return (
//     <section>
//       <button
//         type="button"
//         className="text-1xl p-1 m-4 hover:drop-shadow-xl hover:bg-light-gray dark:bg-secondary-dark-bg text-white relative"
//         style={{ background: "darkgray", borderRadius: "5%", zIndex: "0" }}
//         onClick={() => setModalOpen(true)}
//       >
//         Add Event
//       </button>

//       <FullCalendar
//         ref={calendarRef}
//         plugins={[dayGridPlugin, interactionPlugin]}
//         editable={true}
//         events={events}
//         initialView="dayGridWeek"
//         // eventAdd={(event) => handleEventAdd(event)}
//         // datesSet={(date) => handleDateSet(date)}
//       />
//       <AddEventModal
//         isOpen={modalOpen}
//         d
//         onClose={() => setModalOpen(false)}
//         // onEventAdded={(event) => onEventAdded(event)}
//       />
//     </section>
//   );
// };

export default GetRooms
