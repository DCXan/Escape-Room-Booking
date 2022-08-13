import React, { useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { scheduleData } from "../data/dummy";
import { Header } from "../components";

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: "100%", background: "white" }}>
          <tbody>
            <tr style={{ height: "50px" }}>
              <td style={{ width: "100%" }}>
                <DatePickerComponent
                  value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;

// import { Calendar, momentLocalizer } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import React, { useState } from "react";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import moment from "moment";
// import "./style.css";

// import { useEffect } from "react";
// const GetRooms = () => {
//   const [rooms, setRooms] = useState({});
//   const [slot, setSlot] = useState([]);
//   const [day, setDay] = useState("");
//   const [time, seTime] = useState("");
//   moment.locale("en-GB");
//   const localizer = momentLocalizer(moment);

//   const DnDCalendar = withDragAndDrop(Calendar);
//   useEffect(async () => {
//     const time = moment("11:00 PM");
//     const response = await fetch(`http://localhost:8000/admin/timeslot`);
//     const result = await response.json();
//     if (result.success) {
//       setSlot(result.slot);
//     } else {
//       console.log(result.message);
//     }
//   }, []);

//   // const eventItems = slot.map(slot =>{

//   // })

//   return (
//     <div>
//       <DnDCalendar
//         className="rbc-calendar"
//         localizer={localizer}
//         events={[
//           {
//             id: 0,
//             title: "Cell Block",
//             start: new Date(2022, 7, 16, 19, 30, 0), // Year , month(index),day, hour,minutes,seconds
//             end: new Date(2022, 7, 16, 20, 30, 0),
//           },
//         ]}
//         defaultDate={moment().toDate()}
//         draggableAccessor={(events) => true}
//         step="15"
//       />
//     </div>
//   );
// };

// export default GetRooms;
