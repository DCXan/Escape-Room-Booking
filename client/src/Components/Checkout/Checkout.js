import React from "react"
import { useStripe } from "@stripe/react-stripe-js"
import "./style.css"

function StripeCheckout() {
  const stripe = useStripe()

  //   const handleSubmit = () =>{
  //     const line_items = cartItems.map(item =>{
  //         return(

  //         )
  //     })
  //   }

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
