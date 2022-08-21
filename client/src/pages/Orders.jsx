import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import { connect } from "react-redux";
import * as actionCreators from "../contexts/creators/actionCreators";
import OrdersData from "./OrdersData";

const Orders = (props) => {
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [roomID, setRoomID] = useState([]);
  // const customerDetails = [];

  useEffect(() => {
    getCustomers();
    // getRoomDetails();
  }, []);

  const getCustomers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-customers`
    );
    const result = await response.json();

    if (result.success) {
      props.getRooms(result.customers);
      setCustomers(result.customers);
      // setCustomers({
      //   ...result.customers,
      //   customerDetails: [...result.customers, [result.customers.rooms]],
      // });
    } else {
      console.log(result.message);
    }
  };
  console.log(customers);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <OrdersData customers={customers} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    roomID: state.roomReducer.roomID,
    rooms: state.roomReducer.rooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRooms: (rooms) => dispatch(actionCreators.getRooms(rooms)),
    getRoomID: (roomID) => dispatch(actionCreators.getRoomID(roomID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
