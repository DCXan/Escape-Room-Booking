import React, { useState, useEffect } from "react";
import RoomModal from "./RoomModal";
import AvailabilityModal from "./AvailabilityModal";
import AddRoomModal from "./AddRoom";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-rooms`
    );

    const result = await response.json();

    if (result.success) {
      setRooms(result.rooms);
      // console.log(result.rooms);
    } else {
      console.log(result.message);
    }
  };

  const deleteRoom = async (roomID) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/delete-room/${roomID}`,
      {
        method: "DELETE",
      }
    );

    console.log(JSON.stringify());
    const result = await response.json();

    if (result.success) {
      getRooms();
    } else {
      alert(result.message);
    }
  };

  const roomItem = rooms.map((room) => {
    // console.log(room);
    return (
      <li
        key={room._id}
        className="border-gray-800 border-0 text-center bg-fixed rounded-3xl shadow-2xl"
      >
        <img
          src={room.image}
          width={500}
          className="rounded-t-3xl max-h-48 object-cover mb-3"
          alt=""
        />
        <b className="text-2xl">{room.Subject}</b>
        <p className="my-1">{room.additionalDetails}</p>
        <div className="flex flex-row justify-center">
          <RoomModal room={room} callback={getRooms} />
          <AvailabilityModal room={room} callback={getRooms} />
          <button
            className="bg-red-500 text-white font-medium px-3 py-2 m-3 rounded-xl hover:bg-red-900 hover:drop-shadow-xl"
            onClick={() => deleteRoom(room._id)}
          >
            Delete Room
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="bg-white">
      <div className="text-7xl text-center mb-6 mt-6">Our Rooms</div>
      <ul className="flex flex-wrap justify-center gap-6 mb-6 ml-6 mr-6">
        {roomItem}
        <div className="border-gray-800 border-0 rounded-3xl shadow-2xl">
          <AddRoomModal callback={getRooms} />
        </div>
      </ul>
    </div>
  );
};

export default RoomsList;
