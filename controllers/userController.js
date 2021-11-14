const User = require("../models/userModel");
const util = require("../utils/generateToken");
exports.getUser = async(req,res) =>{
  User.find()
    .populate("role")
    .select("-password").then(user=>{
      res.status(200).json({
        success: true,
        user
      })
    }).catch(err=>{
      return res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    })
}
exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(422).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }
  let userExists;
  try {
    userExists = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      return res.status(200).json({
        success: true,
        user,
        token: util.generateToken(user._id),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      success: true,
      user: user,
      token: util.generateToken(user._id),
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid email or password.",
    });
  }
};
