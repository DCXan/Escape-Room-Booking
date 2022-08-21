const express = require("express");
const checkoutRouter = express.Router();

const stripe = require("stripe")(
  "sk_test_51F8bRHLOnCTYLxxk3gEoLoDvkGaz4UWPqs69bKiArbf306fHovYU1L7ExCLqwznB5ZrQmqiPxUebEgqAPSXQSeNb00n0L71bb3"
);

checkoutRouter.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
checkoutRouter.post(
  "/webhooks",
  express.raw({ type: "application/json" }),

  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const payload = req.body;
    console.log(sig);

    const endpointSecret =
      "whsec_ca7b3023d8dda0b657dffc2c3723d6a1214e900768f4f45fd80e6327813ccc61";

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log(error);
    }
    if (event.type == "checkout.session.completed") {
      console.log("asdd");
    }
  }
);

// connect to stripe
checkoutRouter.post("/payment", async (req, res) => {
  const { line_items } = req.body;

  const domainUrl = "http://localhost:3001";
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
    });
    res.status(200).json({ success: true, sessionID: session.id });
  } catch (error) {
    console.log(error);
  }
});

checkoutRouter.get("/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  console.log(customer);

  res.json({ customer: customer });
});

module.exports = checkoutRouter;
