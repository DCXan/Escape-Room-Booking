import React, { useState } from 'react'

const RoomModal = ({room}) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className='bg-blue-500 text-white font-medium px-3 py-2 my-3 rounded-2xl hover:bg-blue-900 hover:drop-shadow-xl'
        onClick={() => setShowModal(true)}
      >
        Room Details
      </button>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-2">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-25 float-right text-2xl leading-none font-semibold outline-none focus:outline-none hover:bg-gray-500 hover:rounded-xl mx-2 my-2"
                    onClick={() => setShowModal(false)}
                    >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </span>
                  </button>
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold mb-3">
                        {room.title}
                    </h3>
                    <p>{room.additionalDetails}</p>
                </div>
                {/*Room Description*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg text-justify">
                    {room.description}
                  </p>
                </div>
                <div className="flex flex-col justify-start p-6 border-t border-solid border-slate-200 rounded-b text-left">
                    <p className='font-bold text-lg'>Additional Details</p>
                    <div>
                        {room.adultRate ? <p>${room.adultRate} per adult</p> : null}
                        {room.childRate ? <p>${room.childRate} per child</p> : null}
                        <p>${room.privateRate} for a private room ({room.maxPlayers} people maximum)</p>

                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Go Back
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}

export default RoomModal