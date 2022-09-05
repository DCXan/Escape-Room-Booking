import React, { useState, useEffect } from "react";
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
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Header } from "../components";

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = (props) => {
  const [changeEvent, setChangeEvent] = useState([]);
  const [scheduleObj, setScheduleObj] = useState();
  const [events, setEvents] = useState();

  useEffect(() => {
    getRooms();
  }, []);

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const getRooms = async () => {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + `/admin/get-availabilities`
    );
    const result = await response.json();

    if (result.success) {
      console.log(result);
      setEvents(result.availabilities);
    } else {
      console.log(result.message);
    }
  };

  // const handleChanges = (args) => {
  //   console.log(args);
  //   setChangeEvent({
  //     ...changeEvent,
  //     changes: args.target,
  //   });
  // };

  // const editEvents = async () => {
  //   const addEvents = await fetch(
  //     process.env.REACT_APP_BASE_URL + `/admin/create-room`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(scheduleObj),
  //     }
  //   );
  //   const response = await addEvents.json();
  //   if (response.success) {
  //     // setChangeEvent(response.success);
  //     console.log(response);
  //   } else {
  //     console.log("could not post to database");
  //   }
  // };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        eventSettings={{ dataSource: events }}
        readonly={true}
      >
        <ViewsDirective>
          {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize]} />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: "100%", background: "white" }}>
          <tbody>
            <tr style={{ height: "50px" }}>
              <td style={{ width: "100%" }}>
                <DatePickerComponent
                  readonly={true}
                  value={new Date()}
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
