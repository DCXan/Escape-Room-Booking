import React from 'react'
import moment from 'moment'


const TimeslotDropdown = () => {

    let timeslots = []

    let startTime = moment("11:00", "hh:mm")
    let endTime = moment("12:00", "hh:mm")

    for (let i = 1; i <= 49; i++) {
      timeslots.push(
        `${new moment(startTime).format("h:mm A")} - ${new moment(
          endTime
        ).format("h:mm A")}`,
      )
      startTime.add(15, "minutes")
      endTime.add(15, "minutes")
    }

    console.log(timeslots)

    const timeslot = timeslots.map((slot, index) => {
        return (
            <li key={index}>
                {slot}
            </li>
        )
    })

  return (
    <div>
        {timeslot}
    </div>
  )
}

export default TimeslotDropdown