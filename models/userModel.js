const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: { 
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
    },
    displayPicture: {
      type: String,
      default: null
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
      required: true
    },
    groups: [
      { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
      }
    ],
    vaccinationStatus: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User = mongoose.model("users", userSchema);
