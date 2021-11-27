const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryType: {
      type: String,
      enum: ["root", "topic"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      default: null,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("categories", categorySchema);
