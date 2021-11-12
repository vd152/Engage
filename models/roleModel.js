const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    Permissions: [{
        name: {
            type: String
        },
        value: {
            type: String
        }
    }]
  },
  { timestamps: true }
);

module.exports = Role = mongoose.model("roles", roleSchema);