import React from "react";
import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";

function AdminView() {
  return (
    <Admin dataProvider={lb4Provider(process.env.REACT_APP_BASE_URL)}>
      <Resource name="customers" />
    </Admin>
  );
}

export default AdminView;
