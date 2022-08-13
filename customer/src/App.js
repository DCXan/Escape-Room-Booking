import React, { useState } from "react"

import RoomList from "./components/RoomsList"
import Booking from "./components/Calendar"

function App() {
  return (
    <div>
      <RoomList />
      <Booking />
    </div>
  )
}
export default App
