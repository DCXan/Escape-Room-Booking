import React, { useEffect } from "react"

const Success = () => {
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const response = await fetch("http://localhost:3001/success")
    const results = await response.json()
    console.log(results.customer)
  }
  return (
    <div>
      <p></p>
    </div>
  )
}

export default Success
