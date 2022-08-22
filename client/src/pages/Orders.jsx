import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { connect } from "react-redux";
import * as actionCreators from "../contexts/creators/actionCreators";
import OrdersData from "./OrdersData";

const Orders = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
    getCustomersDetails();
  }, []);

  const getCustomers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-limited-customer-details`
    );
    const result = await response.json();

    if (result.success) {
      setCustomers(result.customers);
    } else {
      console.log(result.message);
    }
  };

  const getCustomersDetails = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-customers`
    );
    const result = await response.json();
    if (result.success) {
      props.getRooms(result.customers);
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <OrdersData customers={customers} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    rooms: state.roomReducer.rooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRooms: (rooms) => dispatch(actionCreators.getRooms(rooms)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
