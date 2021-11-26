const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    displayPicture: {
        type: String,
        default: null
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
  },
  { timestamps: true }
);

module.exports = Group = mongoose.model("groups", groupSchema);
