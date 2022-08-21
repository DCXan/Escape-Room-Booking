import React, { useEffect, useState } from "react";

function OrdersData(props) {
  console.log(props);

  const customers = props.customers;
  const rooms = props.rooms;
  useEffect(() => {
    getBookedRoom();
  }, []);

  const roomid = customers.map((customer) => customer.roomID);
  console.log(roomid);
  const customersroomid = rooms.map((room) => room._id);
  console.log(customersroomid);

  const getBookedRoom = async () => {
    if ([roomid == customersroomid]) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/get-room/${roomid}`
      );
      const result = await response.json();
      console.log(result);
    } else {
      console.log("no match");
    }
    // const response = await fetch(
    //   `${process.env.REACT_APP_BASE_URL}/admin/get-room/${roomid}`
    // );
    // const result = await response.json();

    // if (result.success) {
    //   console.log(result);
    // } else {
    //   console.log(result.message);
    // }
  };
  return <div></div>;
}

export default OrdersData;
