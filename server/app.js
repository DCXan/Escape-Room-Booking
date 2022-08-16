const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
require("dotenv").config();

// Routers

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/User");
const checkoutRouter = require("./routes/stripe");

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/checkout", checkoutRouter);

// Connect MongoDB to server

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.s4nxcwu.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully connected to MongoDB database");
    }
  }
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
