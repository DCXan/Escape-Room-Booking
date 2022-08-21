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
import { connect } from "react-redux";

import { contextMenuItems } from "../data/dummy";

function OrdersData(props) {
  const [details, setDetails] = useState();

  useEffect(() => {}, []);

  const customers = props.customers;

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div>
      <GridComponent
        id="gridcomp"
        dataSource={props.customers}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {/* {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))} */}
          <ColumnsDirective
            headerText="Stasdfasdfasdfsdfasdfasdftus"
            field="customers"
            width="20"
            textAlign="Center"
          ></ColumnsDirective>
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
}

const mapStateToProps = (state) => {
  return {
    roomID: state.roomReducer.roomID,
    rooms: state.roomReducer.rooms,
  };
};
export default connect(mapStateToProps)(OrdersData);
