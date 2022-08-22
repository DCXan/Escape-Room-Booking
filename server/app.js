const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const server = require("http").createServer(app)
require("events").EventEmitter.defaultMaxListeners = Infinity
const compression = require("compression")
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
})

app.use(cors())
app.use(express.json())
require("dotenv").config()

// Routes

const adminRouter = require("./routes/admin")
const userRouter = require("./routes/User")
const customerRouter = require("./routes/customer")
const checkoutRouter = require("./routes/stripe")
const notificationRouter = require("./routes/socket")

app.use("/customer", customerRouter)
app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/checkout", checkoutRouter)
app.use("/notifications", notificationRouter)
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

let interval

io.on("connection", socket => {
  console.log("New client connected")
  io.emit("firstEvent", "hell this is test")
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(interval)
  })
})

const getApiAndEmit = socket => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client.
  socket.emit("FromAPI", response)
}

const PORT = process.env.PORT || 8000

io.on(
  "connection",
  socket => {
    var clientIp = socket.request.connection.remoteAddress

    console.log(clientIp)
  },
  console.log(`Server is running on Port ${PORT}`)
)

server.listen(PORT)
