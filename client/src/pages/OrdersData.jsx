import React, { useEffect, useState } from "react";

function OrdersData(props) {
  console.log(props);

  const customers = props.customers;
  useEffect(() => {
    // getBookedRoom();
  }, []);

  const roomid = customers.map((customer) => customer.roomID);
  console.log(roomid);

  const getBookedRoom = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-booked-room/${roomid}`
    );
    const result = await response.json();

    if (result.success) {
      console.log(result);
      //   setRoom(result);
      //   props.callback();
    } else {
      console.log(result.message);
    }
  };
  return <div>hi</div>;
}

export default OrdersData;
