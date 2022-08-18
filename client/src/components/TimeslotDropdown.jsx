import React, { useState } from 'react'
import moment from 'moment'


const TimeslotDropdown = () => {

    const [timeslot, setTimeslot] = useState(null)
    const [allTimeslots, setAllTimeslots] = useState([])

    // Generate the timeslots
    let timeslots = []

    let startTime = moment("11:00", "h:mm")
    let endTime = moment("12:00", "h:mm")

    for (let i = 1; i <= 49; i++) {
      timeslots.push({
        id: i,
        time: `${new moment(startTime).format("h:mm A")} - ${new moment(
          endTime
        ).format("h:mm A")}`,
        })
      startTime.add(15, "minutes")
      endTime.add(15, "minutes")
    }

    const handleTimeslotSelection = (e) => {
        setTimeslot(e.target.value)
    }

    const addTimeslot = (e) => {
        handleTimeslotSelection();
        setAllTimeslots(timeslot)
    }

    console.log(timeslots)

    // const timeslotItem = timeslots.map((timeslot, index) => {
    //     return (
    //         <li key={index}>
    //             {timeslot.id}: {timeslot.time}
    //         </li>
    //     )
    // })

  return (
    <select onChange={handleTimeslotSelection}>
        <option value="Select a Timeslot">Select a Timeslot</option>
        {timeslots.map((timeslot) => <option value={timeslot.id}>{timeslot.time}</option>)}
    </select>
  )
}

export default TimeslotDropdown