import React, { useState, useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { employeesGrid } from "../data/dummy";
import { Header } from "../components";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    displayEmployees();
  }, []);

  const displayEmployees = async () => {
    const employees = await fetch(
      process.env.REACT_APP_BASE_URL + "/user/login"
    );
    const result = await employees.json();
    if (result.success) {
      console.log(result);
      setEmployees(result.users);
    } else {
      console.log("unable to get employees");
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={employees}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
