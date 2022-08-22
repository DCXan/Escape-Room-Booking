const express = require("express")
const checkoutRouter = express.Router()
const bodyParser = require("body-parser")
const stripe = require("stripe")(process.env.STRIPE_SK)
const buffer = require("micro")
checkoutRouter.use((req, res, next) => {
  if (req.originalUrl === "/webhooks") {
    next()
  } else {
    bodyParser.json()(req, res, next)
  }
})

checkoutRouter.post(
  "/webhooks",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers["stripe-signature"]
    let event
    const endpointSecret =
      "whsec_ca7b3023d8dda0b657dffc2c3723d6a1214e900768f4f45fd80e6327813ccc61"

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (error) {
      console.log(error.message)
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      console.log("asdf")
    }
  }
)

// connect to stripe
checkoutRouter.post("/payment", async (req, res) => {
  const { line_items, userInfo } = req.body

  const domainUrl = "http://localhost:3001"
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "usd",
      line_items: line_items,

      success_url: `${domainUrl}/success`,
      cancel_url: `${domainUrl}`,
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        firstName: userInfo.firstName,
      },
    })
    res.status(200).json({ success: true, sessionID: session.id })
  } catch (error) {
    console.log(error)
  }
})

checkoutRouter.get("/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
  const customer = await stripe.customers.retrieve(session.customer)

  console.log(customer)

  res.json({ customer: customer })
})

module.exports = checkoutRouter
