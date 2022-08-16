import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Booking from "./Calendar";
//public key for stripe
const stripePromise = loadStripe("pk_test_fmwCa9Gs1HrmcSrEAjsAvKQO00KtWSZf8C");

const RoomModal = ({ room }) => {
  const [showModal, setShowModal] = useState(false);
  const [ticket, setTicket] = useState({});
  const [adult, setAdult] = useState({});
  const [children, setChildren] = useState({});
  const info = ["Adult", "Child", "Private Room"];

  const handleCheckout = async () => {
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: room.Subject,
            description: "Adult",
          },
          unit_amount: room.adultRate * 100,
        },
        quantity: room.maxPlayers,
      },
    ];
    const response = await fetch(
      "http://localhost:8000/checkout/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room }),
      }
    );
    const results = await response.json();
    if (results.success) {
      console.log(results.sessionid);
      const stripe = await stripePromise;
      stripe.redirectToCheckout({
        sessionId: results.sessionID,
      });
    }
  };
  const handleAdult = (e) => {
    setAdult({
      adult: e.target.value,
    });
    if (adult <= 7) {
      // setChildren
    }
  };
  const handleChildren = (e) => {
    setTicket({
      children: e.target.value,
    });
  };
  const handleTicket = () => {
    console.log(ticket);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white font-medium px-3 py-2 my-3 rounded-2xl hover:bg-blue-900 hover:drop-shadow-xl"
        onClick={() => setShowModal(true)}
      >
        Room Details
      </button>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-2">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
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
                <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold mb-3">
                    {room.Subject}
                  </h3>
                  <p>{room.additionalDetails}</p>
                </div>
                <div className="  grid grid-cols-2 divide-x ">
                  <div className="flex flex-col ">
                    <img src={room.image} />
                    {/*Room Description*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-slate-500 text-lg text-justify">
                        {room.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-col items-center ">
                    <Booking />
                  </div>
                </div>
                <div className=" grid grid-cols-2 divide-x">
                  <div className="flex flex-col justify-start p-6 border-t border-solid border-slate-200 rounded-b text-left">
                    <p className="font-bold text-lg">Additional Details</p>
                    <div>
                      {room.adultRate ? (
                        <p>${room.adultRate} per adult</p>
                      ) : null}
                      {room.childRate ? (
                        <p>${room.childRate} per child</p>
                      ) : null}
                      <p>
                        ${room.privateRate} for a private room (
                        {room.maxPlayers} people maximum)
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2>Tickets</h2>

                    <div className="flex flex-row ">
                      <label>Adult</label>
                      <div>
                        <select onChange={handleAdult}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-row ">
                      <label>Children</label>
                      <div>
                        <select onChange={handleChildren}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                      <button onClick={handleTicket}>Click me</button>
                    </div>
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
                    onClick={handleCheckout}
                  >
                    Checkout
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
};

export default RoomModal;
