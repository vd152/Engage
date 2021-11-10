const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Media = mongoose.model("media", mediaSchema);