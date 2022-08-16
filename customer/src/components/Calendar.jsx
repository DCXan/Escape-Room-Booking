import Calendar from "react-calendar"
import "../calendar.css"
import React, { useState } from "react"
import moment from "moment"

function Booking({}) {
  const [date, setDate] = useState(new Date())
  const [showMyModal, setShowMyModal] = useState(false)
  const [slots, setslots] = useState(false)
  const handleSlots = value => {
    setDate(value)
  }

  return (
    <div>
      <div className="">
        <Calendar minDetail="month" onClickDay={value => handleSlots(value)} />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
    </div>
  )
}
export default Booking
