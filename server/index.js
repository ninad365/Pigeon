const express = require('express'); //Import the express dependency
var mongoose = require("mongoose");
var session = require('express-session');
var MongoStore = require('connect-mongo');
var socket = require('socket.io');
var Chat = require('./models/chats');
var cookieParser = require('cookie-parser');

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5050;                  //Save the port number where your server will be listenings
mongoose.connect("mongodb://localhost:27017/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("DB connected successfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/chat-app"
  })
}));

// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/chats"));

app.get("/api", (req, res) => {
  res.json({ "users": ["user1", "user2"]})
})

app.post("/api", (req, res) => {
  console.log(req.body)
  res.json({ "users": ["success", "user2"]})
})

var server = app.listen(port, () => { //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});


let io = socket(server)
io.on('connection', (socket) => {
  socket.on('message', (data) => {
    var newChat = new Chat({
      message: data.message,
      sender: data.sender,
    });
    newChat.save();
    io.sockets.emit('message', data);
  })
});
