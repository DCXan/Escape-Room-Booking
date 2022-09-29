import React, { useState } from "react";
import Success from "./components/Success";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoomList from "./components/RoomsList";

function App() {
  return (
    <div>
      <RoomList />
    </div>
  );
}
export default App;
