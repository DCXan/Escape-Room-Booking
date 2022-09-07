import React from "react";
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
  Selection,
  Toolbar,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { connect } from "react-redux";
import { ordersGrid } from "../data/dummy";
import { contextMenuItems } from "../data/dummy";

function OrdersData(props) {
  const customers = props.customers;

  const editing = { allowDeleting: true, allowEditing: true };

  console.log(customers);

  return (
    <div>
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
            Toolbar,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            Selection,
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
