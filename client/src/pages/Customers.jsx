import React from "react";
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

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

import { List, Datagrid, TextField } from "react-admin";

function Customers(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="_id" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <TextField source="email" />
        <TextField source="phone" />
        {/* we also need booking information here as well */}
      </Datagrid>
    </List>
  );
}

export default Customers;

// const Customers = () => {
//   const selectionsettings = { persistSelection: true };
//   const toolbarOptions = ["Delete"];
//   const editing = { allowDeleting: true, allowEditing: true };

//   return (
//     <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//       <Header category="Page" title="Customers" />
//       <GridComponent
//         dataSource={customersData}
//         enableHover={false}
//         allowPaging
//         pageSettings={{ pageCount: 5 }}
//         selectionSettings={selectionsettings}
//         toolbar={toolbarOptions}
//         editSettings={editing}
//         allowSorting
//       >
//         <ColumnsDirective>
//           {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//           {customersGrid.map((item, index) => (
//             <ColumnDirective key={index} {...item} />
//           ))}
//         </ColumnsDirective>
//         <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
//       </GridComponent>
//     </div>
//   );
// };

// export default Customers;
