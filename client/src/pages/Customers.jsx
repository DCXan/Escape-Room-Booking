import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { customersGrid } from "../data/dummy";
import { Header } from "../components";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    displayCustomers();
  }, []);

  const displayCustomers = async () => {
    const customers = await fetch(
      process.env.REACT_APP_BASE_URL + "/customer/get-customers"
    );
    const result = await customers.json();

    if (result.success) {
      console.log(result);
      setCustomers(result.customers);
    } else {
      console.log(result.message);
    }
  };

  const actionBegin = async (args, customerID) => {
    if (args.requestType === "delete") {
      console.log("actionBegin triggers");
      const customers = await fetch(
        process.env.REACT_APP_BASE_URL +
          `/customer/delete-customer/${customerID}`,
        {
          method: "DELETE",
        }
      );

      const result = await customers.json();

      if (result.success) {
        console.log(result);
        displayCustomers();
      } else {
        console.log(result.message);
      }
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customers}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        actionBegin={actionBegin}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
