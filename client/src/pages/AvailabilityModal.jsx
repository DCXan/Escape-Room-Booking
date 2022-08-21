import React, { useEffect, useState } from "react"
import DaySelection from "../components/DaySelection"
import TimeslotDropdown from "../components/TimeslotDropdown"

const AvailabilityModal = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [availability, setAvailability] = useState({
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  })
  const [currentAvailability, setCurrentAvailability] = useState([])

  const [timeslot, setTimeslot] = useState("")
  const [selectedDays, setSelectedDays] = useState([])

    useEffect(() => {
        getAvailabilities();
    }, []);


  // Retrieve list of availabities for current room
  const getAvailabilities = async () => {

    const response = await fetch(`http://localhost:8000/admin/get-availabilities/${props.room._id}`);

    const result = await response.json();

    if (result.success) {
      setCurrentAvailability(result.availabilities[0])
    
    } else {
      console.log(result.message);
    }
  }

  // Update or Add availabilities
  const updateAvailability = async () => {
    
    console.log(timeslot);
    console.log(selectedDays);
    console.log(availability)
    console.log(currentAvailability)

    for (let i = 0; i < selectedDays.length; i++) {
      for (let day in availability) {
        if (day === (selectedDays[i]).toLowerCase()) {
          availability[day] = [timeslot]
        }
      }
      
    }
    
    // const response = await fetch(`http://localhost:8000/admin/add-availability/${props.room._id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(availability)
    // })

    // console.log(JSON.stringify(availability));
    // const result = await response.json()
    

    // if (result.success) {
    //   setShowModal(false)
    //   props.callback()
    // } else {
    //   alert(result.message)
    // }

  }

  const closeModal = () => {
    setTimeslot()
    setSelectedDays([])
    setShowModal(false)
  }

  return (
    <div>
      <button
        className="bg-blue-500 text-white font-medium px-3 py-2 m-3 rounded-xl hover:bg-blue-900 hover:drop-shadow-xl"
        onClick={() => setShowModal(true)}
      >
        Edit Availability
      </button>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*CLOSE Modal Button*/}
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-25 float-right text-2xl leading-none font-semibold outline-none focus:outline-none hover:bg-gray-500 hover:rounded-xl mx-2 mt-2"
                  onClick={closeModal}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                {/* Room Name */}
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200">
                  <p className="text-xl mb-2 font-bold">Set Availability for:</p>
                  <div className="">{props.room.Subject}</div>
                </div>

                {/* List of Current Availabilities */}
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <p className="text-xl mb-2 font-bold">Current Availabilities:</p>
                  <div className="">
                    {currentAvailability ? (
                        `Number of Availabilities:  ${currentAvailability.timeslots.saturday}`
                    ) : 'No Timeslots Set'}
                  </div>
                </div>

                {/*Timeslot Selection*/}
                <TimeslotDropdown setTimeslot = {setTimeslot}/>
               
                {/* Day Selection */}
                <DaySelection setSelectedDays = {setSelectedDays}/>
                {/*footer*/}
                <div className="flex items-center justify-end p-6">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={updateAvailability}
                  >
                    Create Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  )
}

export default AvailabilityModal
