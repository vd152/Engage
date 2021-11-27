const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieSession = require("cookie-session");
var cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

var passport = require("passport");
require("./config/passport")(passport);

const userRouter = require("./routers/userRouter");
const roleRouter = require("./routers/roleRouter");
const groupRouter = require("./routers/groupRouter");
const scheduleRouter = require("./routers/scheduleRouter");
const forumRouter = require("./routers/forumRouter");
const PORT = process.env.PORT || 5001;

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cookieSession({
    name: "engage",
    keys: ["key1", "key2"],
  })
);
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "./public")));

//MongoDB setup
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

//routes
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/group", groupRouter);
app.use("/schedule", scheduleRouter);
app.use("/forum", forumRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
