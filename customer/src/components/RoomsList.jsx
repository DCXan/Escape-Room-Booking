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
      <li key={room._id} className="border-gray-800 border-2 text-center bg-fixed rounded-3xl" >
        <img src='test.jpg' width={500}/>
        <b className='text-2xl'>{room.title}</b>
        <p>{room.additionalDetails}</p>
        <button className='bg-blue-500 text-white font-medium px-2 py-2 mb-2 mt-2 rounded-2xl hover:bg-blue-900'>More Details</button>
      </li>
    )
  })

  return (
    <div className='bg-white'>
      <div className='text-7xl text-center mb-4'>Our Rooms</div>
      <ul className='flex flex-wrap justify-center gap-4'>
        {roomItem}
      </ul>
    </div>

  )
}

export default RoomsList