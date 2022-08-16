const express = require("express")
const checkoutRouter = express.Router()

const stripe = require("stripe")(
  "sk_test_51F8bRHLOnCTYLxxk3gEoLoDvkGaz4UWPqs69bKiArbf306fHovYU1L7ExCLqwznB5ZrQmqiPxUebEgqAPSXQSeNb00n0L71bb3"
)

// connect to stripe
checkoutRouter.post("/payment", async (req, res) => {
  const { room } = req.body

  const domainUrl = "http://localhost:3001"
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      currency: "usd",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: room.Subject,
              description: "Adult",
            },
            unit_amount: room.adultRate * 100,
          },
          quantity: room.maxPlayers,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Phone",
              description: "Adult",
            },
            unit_amount: room.adultRate * 100,
          },
          quantity: room.maxPlayers,
        },
      ],

      success_url: `${domainUrl}/success`,
      cancel_url: `${domainUrl}/canceled`,
      phone_number_collection: {
        enabled: true,
      },
    })

    res.json({ success: true, sessionID: session.id })
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
