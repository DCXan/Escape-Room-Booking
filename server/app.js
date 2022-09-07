const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const server = require("https").createServer(app);
const server = require("http").createServer(app);

require("events").EventEmitter.defaultMaxListeners = Infinity;
const compression = require("compression");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
require("dotenv").config();

// Routes

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const customerRouter = require("./routes/customer");
const checkoutRouter = require("./routes/stripe");
const Customers = require("./schemas/Customer");

app.use("/customer", customerRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/checkout", checkoutRouter);

app.get("/", (req, res) => {
  res.redirect("/admin/get-rooms");
});

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
      Customers.watch().on("change", (change) => {
        console.log("Something has changed");
        io.emit("changes", "New customer");
      });
    }
  }
);

const PORT = process.env.PORT || 8000;

io.on(
  "connection",
  (socket) => {
    var clientIp = socket.request.connection.remoteAddress;

    console.log(clientIp);
  },
  console.log(`Server is running on Port ${PORT}`)
);

server.listen(PORT);
