import React, { useState, useRef, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const RoomModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState({});

  const handleChange = (e) => {
    setRoomDetails({
      ...roomDetails,
      [e.target.name]: e.target.value,
    });
  };

  const modalRef = useRef();
  useEffect(() => {
    const options = {
      reserveScrollBarGap: true,
    };
    if (showModal) {
      disableBodyScroll(modalRef, options);
    } else {
      enableBodyScroll(modalRef);
    }
  }, [showModal, modalRef]);

  const updateRoom = async () => {
    const response = await fetch(
      `http://localhost:8000/admin/update-room/${props.room._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomDetails),
      }
    );

    console.log(JSON.stringify(roomDetails));
    const result = await response.json();

    if (result.success) {
      setShowModal(false);
      props.callback();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="Modal">
      <button
        className="bg-blue-500 text-white font-medium px-3 py-2 my-3 rounded-2xl hover:bg-blue-900 hover:drop-shadow-xl"
        onClick={() => setShowModal(true)}
      >
        Edit Details
      </button>
      {showModal ? (
        <div>
          <div
            ref={modalRef}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-10 mb-10"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-auto bg-white outline-none focus:outline-none top-80">
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
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <p className="text-xl">Room Name:</p>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                      id="roomTitle"
                      name="title"
                      type="text"
                      defaultValue={props.room.Subject}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-xl mt-3">Additional Details:</p>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                      id="additionalDetails"
                      name="additionalDetails"
                      type="text"
                      defaultValue={props.room.additionalDetails}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <img src={props.room.image} alt="Escape Room" />
                {/*Room Description*/}
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <p className="text-xl">Room Description:</p>
                  <div className="md:w-2/3 self-center">
                    {/* <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="additionalDetails" name="additionalDetails" type="textarea" defaultValue={room.description} onChange={handleChange}/> */}
                    <textarea
                      className="self-center mt-5"
                      rows={6}
                      cols={60}
                      name="description"
                      defaultValue={props.room.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col justify-start p-6 border-t border-solid border-slate-200 rounded-b text-left">
                  <p className="font-bold text-lg self-center">
                    Additional Details
                  </p>
                  <div className="self-center text-center">
                    <p className="content-between">
                      Adult Ticket Price: $
                      <input
                        className="md:w-1/3 m-2 self-end bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                        id="adultRate"
                        name="adultRate"
                        type="text"
                        defaultValue={props.room.adultRate}
                        onChange={handleChange}
                      />
                    </p>
                    Child Ticket Price: $
                    <input
                      className="md:w-1/3 m-2 self-end bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                      id="achildRate"
                      name="childRate"
                      type="text"
                      defaultValue={props.room.childRate}
                      onChange={handleChange}
                    />
                    <p>
                      Private Room Rate: $
                      <input
                        className="md:w-1/3 m-2 self-end bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                        id="achildRate"
                        name="childRate"
                        type="text"
                        defaultValue={props.room.privateRate}
                        onChange={handleChange}
                      />
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
                    onClick={updateRoom}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          //{" "}
        </div>
      ) : null}
    </div>
  );
};

export default RoomModal;
