import Calendar from "react-calendar";
import "./Calendar.css";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Grid } from "@mui/material";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

//public key for stripe

const stripePromise = loadStripe("pk_test_fmwCa9Gs1HrmcSrEAjsAvKQO00KtWSZf8C");

const Booking = ({ room }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [chosenDay, setChoseDay] = useState("");
  const [date, setDate] = useState(new Date());
  const [asdff, setAsdff] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [adultPrice, setAdultPrice] = useState("");
  const [adultQuantity, setAdultQuantity] = useState("");
  const [privateRoom, setPrivateRoom] = useState("");
  const [childrenPrice, setChildrenPrice] = useState("");
  const [childrenQuantity, setChildrenQuantity] = useState("");
  const [chosenSlot, setChosenSlot] = useState("");
  const [answer, setAnswer] = useState([]);
  const [itemChosenChildren, setItemChosenChildren] = useState({});
  const [itemChosenAdult, setItemChosenAdult] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isActive, setIsActive] = useState(false);
  let itemCart = [];
  // const [adultPrice, setAdultPrice] = useState([])

  const handleForm = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  const handleAdult = (e) => {
    const total = e.target.value * room.adultRate;
    setAdultPrice(total);
    setAdultQuantity(e.target.value);
    setItemChosenAdult({
      description: `Adult Tickets for ${room.Subject} on ${chosenSlot}`,
      unit_amount: room.adultRate,
      quantity: e.target.value,
    });
  };

  const handleChildren = (e) => {
    const total = e.target.value * room.childRate;
    console.log(total);
    console.log(e.target.value);
    setChildrenPrice(total);
    setChildrenQuantity(e.target.value);
    setItemChosenChildren({
      description: `Children Tickets for ${room.Subject} on ${chosenSlot}`,
      unit_amount: room.childRate,
      quantity: e.target.value,
    });
  };

  const handleSlots = async (value) => {
    console.log(itemCart);
    setChoseDay(moment().format("MMM Do YY"));
    console.log(chosenDay);
    let timeAvailable = [];
    let timebyDay = [];

    let startTime = moment("11:00", "hh:mm");
    let endTime = moment("12:00", "hh:mm");
    for (let i = 1; i <= 49; i++) {
      timeAvailable.push({
        day: `${new moment(startTime).format("hh:mm A")}-${new moment(
          endTime
        ).format("hh:mm A")}`,
      });

      startTime.add(15, "minutes");
      endTime.add(15, "minutes");
    }
    console.log(timeAvailable);
    setDate(value);
    let selectedDay = moment(value).format("dddd").toLowerCase();

    console.log(selectedDay);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/get-availabilities/${room._id}`
    );
    const results = await response.json();
    console.log(results);

    const fodder = results.availabilities.map((time) => {
      const asdf = Object.entries(time.timeslots);
      console.log(asdf);

      const wasd = asdf.filter(
        (availability) => availability[0] === selectedDay.toLocaleLowerCase()
      );

      for (let elements of wasd[0][1]) {
        const jj = timeAvailable[elements - 1];
        timebyDay.push(jj);
        console.log(jj);
      }
      console.log(wasd);
    });
    setAnswer(timebyDay);
    console.log(answer);
  };

  const handleCheckout = async (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    if (childrenQuantity != 0) {
      itemCart.push(itemChosenChildren);
    }
    if (adultQuantity != 0) {
      itemCart.push(itemChosenAdult);
    }

    const totalQuantity = childrenQuantity + adultQuantity;

    const line_items = itemCart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: room.Subject,
            description: item.description,
          },
          unit_amount: item.unit_amount * 100,
        },
        quantity: item.quantity,
      };
    });
    console.log(line_items);

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/checkout/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room, line_items, userInfo, totalQuantity }),
      }
    );

    const results = await response.json();
    if (results.success) {
      const stripe = await stripePromise;
      stripe.redirectToCheckout({
        sessionId: results.sessionID,
      });
    } else {
      alert(results.message);
    }
    //fixed this
  };
  const handleTimeslots = (e) => {
    console.log(e);
    setChosenSlot(e.target.value);
  };
  const handleClosed = () => {
    setShowModal(false);

    setDate(moment.toDate());
  };
  const handlePrivate = (e) => {};
  const fontColor = {
    style: { color: "rgb(50, 50, 50)" },
  };

  return (
    <>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-emerald-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Book Now
      </button>
      {showModal ? (
        <>
          <div className="backdrop-blur-sm bg-white/30 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-10 mb-10">
            <div className="relative w-auto my-6 mx-auto w-5/12 h-3/4 ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bottom-20">
                {/*header*/}
                <div className="text-3xl font-semibold   border-solid border-slate-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
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
                </div>

                <div className=" relative p-6 flex-auto">
                  <div className="flex flex-row  justify-evenly">
                    <div>
                      <Calendar
                        minDetail="month"
                        onClickDay={(value) => handleSlots(value)}
                        minDate={moment().toDate()}
                        locale="en-US"
                      />
                    </div>
                    <div className="items-center">
                      <p className=" text-2xl font-semibold ">
                        {date.toDateString()}
                      </p>
                      {answer.map((pickedSlot) => {
                        return (
                          <button
                            key={pickedSlot.index}
                            className="border-2 border-black bg-white-500 text-black active:bg-emerald-600  focus:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-300 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={(e) => {
                              handleTimeslots(e);
                              handleClick();
                            }}
                            value={pickedSlot.day}
                          >
                            {pickedSlot.day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-solid border-slate-200">
                    <div
                      className="flex flex-row justify-around"
                      style={{ display: isActive ? "contents" : "none" }}
                    >
                      <Grid>
                        <div className="text-2xl ">
                          <p>Customer info</p>
                        </div>

                        <Grid xs={6} m={3}>
                          <TextField
                            onChange={handleForm}
                            className="mb-"
                            name="firstName"
                            size="small"
                            label="First Name"
                            placeholder="Enter first name"
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid xs={6} m={3}>
                          <TextField
                            onChange={handleForm}
                            name="lastName"
                            size="small"
                            label="Last Name"
                            placeholder="Enter last name"
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid xs={6} m={3}>
                          <TextField
                            onChange={handleForm}
                            name="email"
                            size="small"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            variant="outlined"
                            required
                          />
                        </Grid>
                      </Grid>
                      <Grid>
                        <Grid>
                          <Grid>
                            <p>Tickets</p>
                            <Select
                              value={adultQuantity}
                              onChange={handleAdult}
                              defaultValue="0"
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value="0">
                                <em></em>
                              </MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                            </Select>
                            <TextField
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "black",
                                },
                              }}
                              disabled
                              defaultValue={`adult 13+    $${room.adultRate}`}
                            />
                          </Grid>
                          <Grid>
                            <Select
                              value={childrenQuantity}
                              onChange={handleChildren}
                              displayEmpty
                              defaultValue="0"
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={0}>0</MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                            </Select>
                            <TextField
                              disabled
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "black",
                                },
                              }}
                              defaultValue={`Child 6-12    $${room.childRate}`}
                            />
                          </Grid>
                          <Grid></Grid>
                        </Grid>

                        <Select
                          value={privateRoom}
                          onChange={handlePrivate}
                          displayEmpty
                          defaultValue=""
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={0}>0</MenuItem>
                          <MenuItem value={room.privateRate}>1</MenuItem>
                        </Select>
                        <TextField
                          disabled
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "black",
                            },
                          }}
                          defaultValue={`Private Room     $${room.privateRate}`}
                        />
                      </Grid>
                      <Grid contained direction={"column"} spacing={4}></Grid>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150  hover:text-red-900 active:hover:text-red-900"
                    type="button"
                    onClick={handleClosed}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-emerald-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
  );
};
export default Booking;
