import React, { useState, useEffect } from "react";

import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { connect } from "react-redux";

const Notification = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-limited-customers`
    );
    const result = await response.json();

    if (result.success) {
      setCustomers(result.customers);
      console.log(result.customers);
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
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
            className="bg-sky-500 hover:bg-blue-700 w-full content-center text-white text-center font-bold py-2 px-4 rounded-md tracking-wide"
            href={`https://flashbook-bookings.netlify.app/orders`}
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
