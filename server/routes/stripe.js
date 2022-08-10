const express = require("express")
const checkoutRouter = express.Router()

const stripe = require("stripe")(
  "sk_test_51F8bRHLOnCTYLxxk3gEoLoDvkGaz4UWPqs69bKiArbf306fHovYU1L7ExCLqwznB5ZrQmqiPxUebEgqAPSXQSeNb00n0L71bb3"
)

// connect to stripe
checkoutRouter.post("/create-checkout-session", async (req, res) => {
  const { line_items, customer_email } = req.body

  let session
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "usd",
      line_items,
      customer_email,
      success_url: `${domainUrl}/order/success`,
      cancel_url: `${domainUrl}/canceled`,
      phone_number_collection: {
        enabled: true,
      },
    })
    res.send({ url: session.url })
  } catch (error) {
    console.log(error)
  }
})

checkoutRouter.get("/order/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
  const customer = await stripe.customers.retrieve(session.customer)

  res.send(
    `<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`
  )
})

module.exports = checkoutRouter
