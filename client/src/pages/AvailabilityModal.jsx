import React, { useEffect, useState } from "react"
import TimeslotDropdown from "../components/TimeslotDropdown"

const AvailabilityModal = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [availability, setAvailability] = useState({})
  const [currentAvailability, setCurrentAvailability] = useState([])

    useEffect(() => {
        getAvailabilities();
    }, []);

  const handleChange = (e) => {
    setAvailability({
      ...availability,
      [e.target.name]: e.target.value
    })
  }

  // Retrieve list of availabities for current room
  const getAvailabilities = async () => {

    const response = await fetch(`http://localhost:8000/admin/get-availabilities/${props.room._id}`);

    const result = await response.json();

    if (result.success) {
      setCurrentAvailability(result.availabilities)
    
    } else {
      console.log(result.message);
    }
  }

  // Update or Add availabilities
  const updateAvailability = async () => {
    
    const response = await fetch(`http://localhost:8000/admin/add-availability/${props.room._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(availability)
    })

    console.log(JSON.stringify(availability));
    const result = await response.json()
    

    if (result.success) {
      setShowModal(false)
      props.callback()
    } else {
      alert(result.message)
    }

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
                {/*header*/}
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-25 float-right text-2xl leading-none font-semibold outline-none focus:outline-none hover:bg-gray-500 hover:rounded-xl mx-2 mt-2"
                  onClick={() => setShowModal(false)}
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
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200">
                  <p className="text-xl mb-2 font-bold">Set Availability for:</p>
                  <div className="">{props.room.Subject}</div>
                </div>
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <p className="text-xl mb-2 font-bold">Current Availabilities:</p>
                  <div className="">
                    {currentAvailability.length > 0 ? (
                        `Number of Availabilities:  ${currentAvailability.length}`
                    ) : 'No Timeslots Set'}
                  </div>
                </div>
                {/*Room Description*/}
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200">
                    <p className="text-xl mb-2 font-bold">Set Timeslots:</p>
                    <TimeslotDropdown/>
                </div>
                <div className="flex flex-col justify-center p-5 border-b border-solid border-slate-200">
                  <p className="text-xl mb-2 font-bold">Set Days:</p>
                  <div className="self-center text-center">
                    <div className="items-center">
                        <label>
                        <input className="mr-1 ml-5" type="checkbox" name="sundayStatus" value="Sunday" id="Sunday"/>
                            Sunday
                        </label>
                        <label>
                        <input className="mr-1 ml-5" type="checkbox" name="mondayStatus" value="Monday" id="Monday"/>
                            Monday
                        </label>
                        <label>
                        <input className="mr-1 ml-5" type="checkbox" name="tuesdayStatus" value="Tuesday" id="Tuesday"/>
                        Tuesday
                        </label>
                        <label>
                        <input className="mr-1 ml-5" type="checkbox" name="wednesdayStatus" value="Wednesday" id="Wednesday"/>
                        Wednesday
                        </label>
                        <label>
                        <input className="mr-1 ml-5" type="checkbox" name="thursdayStatus" value="Thursday" id="Thursday"/>
                        Thursday
                        </label>
                        <label>
                        <input className="mr-1 ml-5" type="checkbox" name="fridayStatus" value="Friday" id="Friday"/>
                        Friday
                        </label>
                        <label>
                        <input className="mr-1 ml-5" type="checkbox" name="saturdayStatus" value="Saturday" id="Saturday"/>
                        Saturday
                        </label>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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
