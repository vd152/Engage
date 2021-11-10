const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config();

var passport = require('passport');
require('./config/passport')(passport);

const userRouter = require('./routers/userRouter')
const PORT = 5000

app.use(
    express.urlencoded({
      extended: false,
    })
);
app.use(express.json());
app.use(passport.initialize());
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
app.get('/', passport.authenticate('jwt',{session: false}), (req,res)=>{
    res.send("Hi there")
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})