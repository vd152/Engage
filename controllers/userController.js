const User = require("../models/userModel");
const util = require("../utils/generateToken");
exports.getUsers = async (req, res) => {
  User.find()
    .populate("role")
    .select("-password")
    .then((user) => {
      res.status(200).json({
        success: true,
        user,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    });
};
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

exports.getUser = async (req, res) => {
  let id = req.params.id;
  User.findById(id)
    .populate("role")
    .populate("groups")
    .populate({
      path: "groups", 
      populate: [{path: "createdBy", select: ["firstName", "lastName"]}]
    })
    .select("-password")
    .then((user) => {
      return res.status(200).json({
        success: true,
        user
      })
    })
    .catch((err) => {
      return res.status(500).json({
        success: "false",
        message: "Something went wrong",
      });
    });
};

exports.deleteUser = async(req, res) => {
  const id = req.body.id
  User.deleteOne({_id: id}).then(data=>{
      return res.status(200).json({
          success: true, 
          data
      })
  }).catch((err) => {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    });
}

exports.editUser = async(req, res) => {
  const {user} = req.body
  const id = req.params.id
  if(!user || !user.email || !user.enrollmentNumber){
    return res.status(422).json({
      success: false,
      message: "Please fill required fields"
    })
  }
  let foundUser;
  try{
    foundUser = await User.findOne({_id: id})
  }catch(err){
    
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
  if(!foundUser){
    return res.status(404).json({
      success: false,
      message: "User not found."
    })
  }

  let newUser = {foundUser, ...user}
  User.findOneAndUpdate({_id: id}, {$set: newUser}, {new: true})
  .select("-password")
  .then(updateduser=>{
    return res.status(200).json({
      success: true,
      user: updateduser
    })
  }).catch(err=>{
    return res.status(500).json({
      success: false,
      message: "something went wrong"
    })
  })
}

exports.verifyCertificate = async(req, res) => {
  const {details} = req.body

  if((req.user.firstName + " " + req.user.lastName ).toLowerCase() !== details.name.toLowerCase()){
    return res.status(422).json({
      success: false,
      message: "Certificate credentials don't match with account details."
    })
  }

  User.findOneAndUpdate({_id: req.user._id}, {vaccinationStatus: details.status}, {new: true})
  .select("-password")
  .then(updatedUser=>{
    return res.status(200).json({
      success: true, 
      user: updatedUser
    })
  }).catch(err=>{
    return res.status(500).json({
      success: false,
      message: "Something went wrong."
    })
  })

}