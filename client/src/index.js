import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.PB_STRIPE_KEY)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Elements stripe={stripePromise}>
          <Route path="/" element={<App />} />
        </Elements>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
