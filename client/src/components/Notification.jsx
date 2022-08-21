import React, { useState, useEffect } from "react";

import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { connect } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { Orders } from "../pages";
import NotificationSocket from "./NotificationSocket";

const Notification = (props) => {
  const { currentColor } = useStateContext();
  const [loadClient, setLoadClient] = useState(true);

  const customers = props.rooms;

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <NotificationSocket />
          <button
            type="button"
            className="text-dark text-xs rounded p-1 px-2 bg-orange-theme "
          >
            {" "}
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {/* LOAD OR UNLOAD THE CLIENT */}
        <button onClick={() => setLoadClient((prevState) => !prevState)}>
          STOP CLIENT
        </button>
        {/* SOCKET IO CLIENT*/}
        {loadClient ? <NotificationSocket /> : null}
        {customers?.map((customer, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
          >
            <img
              className="rounded-full h-10 w-10"
              src={customer.rooms.image}
              alt="Escape Room"
            />
            <div>
              <h5 className="font-bold dark:text-gray-200">
                {customer.rooms.Subject}
              </h5>
              <p className=" text-gray-500 text-sm  dark:text-gray-400">
                {" "}
                Customer Name: {customer.first_name} {customer.last_name}{" "}
              </p>
              <p className=" text-gray-500 text-sm  dark:text-gray-200">
                Players Booked: {customer.numberOfPlayers}
              </p>
              <p className=" text-gray-500 text-sm  dark:text-gray-400">
                {" "}
                Total Paid: ${customer.amountPaid}{" "}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-5 flex justify-center">
          <a
            className="bg-blue-500 hover:bg-blue-700 w-full content-center text-white text-center font-bold py-2 px-4 rounded-full tracking-wide"
            href={`http://localhost:3000/orders`}
          >
            See all notifications
          </a>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    rooms: state.roomReducer.rooms,
  };
};

export default connect(mapStateToProps)(Notification);
