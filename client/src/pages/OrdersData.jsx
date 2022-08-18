import React, { useEffect, useState } from "react";

function OrdersData(props) {
  const [room, setRoom] = useState([]);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getBookedRoom();
    getCustomer();
  }, []);

  const getBookedRoom = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-booked-room/${props.room._id}`
    );
    const result = await response.json();

    if (result.success) {
      console.log(result);
      setRoom(result.room);
    } else {
      console.log(result.message);
    }
  };

  const getCustomer = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-customers`
    );
    const result = await response.json();
    if (result.success) {
      console.log(result);
      setCustomer(result.customer);
    } else {
      console.log(result.message);
    }
  };

  return <div>OrdersData</div>;
}

export default OrdersData;
