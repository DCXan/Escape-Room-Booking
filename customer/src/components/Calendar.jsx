import Calendar from "react-calendar"
import "../calendar.css"
import { loadStripe } from "@stripe/stripe-js"
import React, { useState } from "react"
import "react-phone-input-2/lib/style.css"
import PhoneInput from "react-phone-input-2"
import moment from "moment"
import TextField from "@mui/material/TextField"

//public key for stripe
const stripePromise = loadStripe("pk_test_fmwCa9Gs1HrmcSrEAjsAvKQO00KtWSZf8C")
moment.locale()
const Booking = ({ room }) => {
  const [showModal, setShowModal] = useState(false)
  const [date, setDate] = useState(new Date())

  const [ticket, setTicket] = useState(false)
  const [answer, setAnswer] = useState(null)
  const handleBooking = async () => {}

  const handleTicket = () => {
    console.log(ticket)
  }

  const handleSlots = async value => {
    let timeAvailable = []
    let timepicked = []
    let startTime = moment("11:00", "hh:mm")
    let endTime = moment("12:00", "hh:mm")
    for (let i = 1; i <= 49; i++) {
      timeAvailable.push({
        i: `${new moment(startTime).format("hh:mm A")}- ${new moment(
          endTime
        ).format("hh:mm A")} `,
      })
      startTime.add(15, "minutes")
      endTime.add(15, "minutes")
    }
    // console.log(timeAvailable[0])
    // setDate(value)
    // const selectedDay = moment(value).format("dddd")
    // console.log(selectedDay)
    // const response = await fetch(
    //   `http://localhost:8000/admin/get-availabilities/${room._id}`
    // )
    // const results = await response.json()
    // console.log(results)

    // const availability = results.availabilities[0].availableDays
    // const availableTimeslots = results.availabilities[0].timeslots
    // console.log(availability)
    // const dailyAvaiabilities = Object.entries(availability)
    // console.log(dailyAvaiabilities)
    // const result = dailyAvaiabilities.filter(entry => entry[0] === selectedDay)
    // console.log(result[0][1])
    // if (result[0][1]) {
    //   // console.log(availableTimeslots)
    //   // for (let i = 0; i < availableTimeslots; i++) {
    //   //   for (let z = 0; z < timeAvailable; i++) {
    //   //     if (availableTimeslots[i] == timeAvailable[z]) {
    //   //       console.log(timeAvailable)
    //   //     }
    //   //   }
    //   // }
    // } else {
    //   console.log("no available bookings")
    // }
    console.log(timeAvailable)
  }

  const handleCheckout = () => {}

  return (
    <>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Book Now
      </button>
      {showModal ? (
        <>
          <div className=" backdrop-blur-sm bg-white/30 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-5/12 h-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="text-3xl font-semibold   border-solid border-slate-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                <div className=" relative p-6 flex-auto">
                  <div className="grid grid-cols-2  0 divide-x">
                    <div className="justify-self-center">
                      <Calendar
                        minDetail="month"
                        onClickDay={value => handleSlots(value)}
                      />
                    </div>
                    <div>
                      <p className=" text-2xl font-semibold ">
                        {date.toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 divide-x border-t border-solid border-slate-200 ">
                    <div className="flex-row ">
                      <div className="text-2xl">
                        <p>Customer info</p>
                      </div>
                      <div className="flex-col ">
                        <TextField
                          size="small"
                          label="First Name"
                          placeholder="Enter first name"
                          variant="outlined"
                          required
                        />
                        <TextField
                          size="small"
                          label="Last Name"
                          placeholder="Enter last name"
                          variant="outlined"
                          required
                        />

                        <TextField
                          size="small"
                          type="email"
                          label="Email"
                          placeholder="Enter email"
                          variant="outlined"
                          required
                        />
                        <PhoneInput InputProps={{ label: "email" }} />
                      </div>
                    </div>
                    <p>Booking</p>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
export default Booking

// const [date, setDate] = useState(new Date())
// const [showMyModal, setShowMyModal] = useState(false)
// const [slots, setslots] = useState(false)

//   return (
//     <div>
//       <div className="">
//         <Calendar minDetail="month" onClickDay={value => handleSlots(value)} />
//       </div>
//       <p className="text-center">
//         <span className="bold">Selected Date:</span> {date.toDateString()}
//       </p>
//     </div>
//   )
// }

// const handleCheckout = async () => {
//   const line_items = [
//     {
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: room.Subject,
//           description: "Adult",
//         },
//         unit_amount: room.adultRate * 100,
//       },
//       quantity: room.maxPlayers,
//     },
//   ]
//   const response = await fetch(
//     "http://localhost:8000/checkout/create-checkout-session",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ room }),
//     }
//   )
//   const results = await response.json()
//   if (results.success) {
//     const stripe = await stripePromise
//     stripe.redirectToCheckout({
//       sessionId: results.sessionID,
//     })
//   }
//
