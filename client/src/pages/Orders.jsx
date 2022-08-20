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
import OrdersData from "./OrdersData";

const Orders = () => {
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [roomID, setRoomID] = useState([]);

  useEffect(() => {
    getRooms();
    getCustomers();
    // if (customers) {
    //   customers.map((customer) => {
    //     setRoomID(customer.roomID, ...roomID);
    //     //   setRoomID({
    //     //     roomID: customer.roomID,
    //     //   });
    //   });
    // }
  }, []);

  console.log(roomID);

  const getRooms = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/get-rooms`
    );
    const result = await response.json();
    if (result.success) {
      setRooms(result.rooms);

      console.log(result);
    } else {
      console.log(result.message);
    }
  };

  const getCustomers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-customers`
    );

    const result = await response.json();

    if (result.success) {
      setCustomers(result.customers);
    } else {
      console.log(result.message);
    }
  };
  // console.log(roomID);
  // const ordersData = customers.map((customer) => {
  //   return { setRoomID: customer.roomID };
  // });
  // console.log(roomID);

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={customers}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default Orders;
