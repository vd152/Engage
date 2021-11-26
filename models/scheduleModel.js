const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    },
    users: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            mode: {
                type: String,
            }
        }
    ],
    totalSeats: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
  },
  { timestamps: true }
);

module.exports = Schedule = mongoose.model("schedule", scheduleSchema);