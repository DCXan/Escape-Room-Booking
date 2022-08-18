import React, { useState, useRef, useEffect } from "react";
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

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import OrdersData from "./OrdersData";

const Orders = () => {
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getRooms();
    getCustomers();
  }, []);

  const getRooms = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-customers`
    );
    const result = await response.json();
    if (result.success) {
      setCustomers(result.customers);
      // console.log(result);
    } else {
      console.log(result.message);
    }
  };

  const getCustomers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/customer/get-rooms`
    );

    const result = await response.json();

    if (result.success) {
      setRooms(result.rooms);
      // console.log(result.rooms);
    } else {
      console.log(result.message);
    }
  };

  // const customerItem = customers.map((customer) => {
  //   // console.log(room);
  //   return (
  //     <li
  //       key={room._id}
  //       className="border-gray-800 border-0 text-center bg-fixed rounded-3xl shadow-2xl"
  //     >
  //       <img
  //         src={room.image}
  //         width={500}
  //         className="rounded-t-3xl max-h-48 object-cover mb-3"
  //         alt=""
  //       />
  //       <b className="text-2xl">{room.Subject}</b>
  //       <p className="my-1">{room.additionalDetails}</p>
  //       <div className="flex flex-row justify-center">
  //         <OrdersData room={room} callback={getRooms} />
  //       </div>
  //     </li>
  //   );
  // });

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
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
