const express = require("express")
const stripeRouter = express.Router()

const stripe = require("stripe")(
  "sk_test_51F8bRHLOnCTYLxxk3gEoLoDvkGaz4UWPqs69bKiArbf306fHovYU1L7ExCLqwznB5ZrQmqiPxUebEgqAPSXQSeNb00n0L71bb3"
)

async function createCheckoutSession(req, res) {
  const domainUrl = process.env.WEB_APP_URL
  const { line_items, customer_email } = req.body

  let session
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "usd",
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
    })
    res.send({ url: session.url })
  } catch (error) {
    console.log(error)
  }
}

// connect to stripe
stripeRouter.post("/create-checkout-session", createCheckoutSession)

module.exports = stripeRouter
