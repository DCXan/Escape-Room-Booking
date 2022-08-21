import React, { useState } from 'react'
import moment from 'moment'


const TimeslotDropdown = ({setTimeslot}) => {

    // const [allTimeslots, setAllTimeslots] = useState([])

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


    // Store timeslot in state when it is selected from dropdown
    const handleTimeslotSelection = (e) => {

        setTimeslot(e.target.value)
        
  
    }

    // const addTimeslot = (e) => {
    //     handleTimeslotSelection();
    //     setAllTimeslots(timeslot)
    // }

    // console.log(timeslots)

  return (
    <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200">
        <p className="text-xl mb-2 font-bold">Select Timeslot:</p>
        <select onChange={handleTimeslotSelection}>
            <option value="Select a Timeslot">Timeslots</option>
            {timeslots.map((timeslot, index) => <option key={index} value={timeslot.id}>{timeslot.time}</option>)}
        </select>
    </div>
  )
}

export default TimeslotDropdown