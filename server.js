const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')
const cookieSession = require("cookie-session");

dotenv.config();

var passport = require('passport');
require('./config/passport')(passport);

const userRouter = require('./routers/userRouter')
const roleRouter = require('./routers/roleRouter')
const PORT = 5000

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
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './public')))

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.use('/user', userRouter);
app.use('/role', roleRouter);

app.get("/abc", passport.authenticate('jwt',{session: false}), (req, res) =>{
  res.send("Hey");
})
app.get('/', (req,res)=>{
  console.log(req.user)
    res.send("Hi there")
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})