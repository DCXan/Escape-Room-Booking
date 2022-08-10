import React, { useState, useEffect } from 'react'


const RoomsList = () => {

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = async () => {

    const response = await fetch('http://localhost:8000/customer/get-rooms')

    const result = await response.json()
    
    if (result.success) {
      setRooms(result.rooms)
    } else {
      console.log(result.message)
    }
  }

  const roomItem = rooms.map(room => {
    return (
      <li key={room._id} className="roomItem">
        <b>{room.title}</b>
        <p>{room.additionalDetails}</p>
      </li>
    )
  })

  return (
    <div>
      <div>RoomsList</div>
      <ul className='roomList'>
        {roomItem}
      </ul>
    </div>

  )
}

export default RoomsList