const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())
require("dotenv").config()

// Routers

const adminRouter = require("./routes/admin")
const customerRouter = require("./routes/customer")
const checkoutRouter = require("./routes/stripe")
app.use("/admin", adminRouter)
app.use("/checkout", checkoutRouter)

// Connect MongoDB to server

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.s4nxcwu.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  error => {
    if (error) {
      console.log(error)
    } else {
      console.log("Successfully connected to MongoDB database")
    }
  }
)

app.listen(8000, () => {
  console.log("Server is running on PORT 8000")
})
