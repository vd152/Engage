const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        name: {
            type: String
        },
        value: {
            type: Boolean
        }
    }]
  },
  { timestamps: true }
);

module.exports = Role = mongoose.model("roles", roleSchema);