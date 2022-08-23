const express = require("express")
const checkoutRouter = express.Router()
const bodyParser = require("body-parser")
const stripe = require("stripe")(process.env.STRIPE_SK)
const Customer = require("../schemas/Customer")

checkoutRouter.use(bodyParser.urlencoded({ extended: false }))
checkoutRouter.use((req, res, next) => {
  if (req.originalUrl === "/webhooks") {
    next()
  } else {
    bodyParser.json()(req, res, next)
  }
})

const addCustomer = async session => {
  const newCustomer = new Customer({
    first_name: session.metadata.firstName,
    last_name: session.metadata.lastName,
    email: session.customer_details.email,
    phone: session.customer_details.phone,
    dateAndTime: "8/21/22",
    numberOfPlayers: session.metadata.totalQuantity,
    amountPaid: session.amount_total * 0.01,
    checkoutStatus: "confirmed",
    rooms: session.metadata.room,
  })
  try {
    await newCustomer.save()
  } catch (error) {
    console.log(error)
  }
}
checkoutRouter.post(
  "/webhooks",
  express.raw({ type: "*/*" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"]
    const payload = req.body

    let event
    const endpointSecret =
      "whsec_ca7b3023d8dda0b657dffc2c3723d6a1214e900768f4f45fd80e6327813ccc61"

    // try {
    //   event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    // } catch (error) {
    //   console.log(error.message)
    // }
    try {
      if (payload.type == "checkout.session.completed") {
        const session = payload.data.object
        console.log("IT WORKS")
        return addCustomer(session)
      }
    } catch (error) {
      console.log(error)
    }
  }
)

// connect to stripe
checkoutRouter.post("/payment", async (req, res) => {
  const { room, line_items, userInfo, totalQuantity } = req.body

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
        lastName: userInfo.lastName,
        totalQuantity,
        room: room._id,
      },
    })
    console.log(session)
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
