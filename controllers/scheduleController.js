const Schedule = require("../models/scheduleModel");

exports.createSchedule = async (req, res) => {
  const { from, to, group, totalSeats } = req.body;
  if (!from || !to || !group || totalSeats < 0) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }
  let scheduleFound;
  try {
    scheduleFound = await Schedule.findOne({
      from: { $lte: (to) },
      to: { $gte: (from) },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }

  if (scheduleFound) {
    return res.status(400).json({
      message: "Schedule is being overlapped",
    });
  }

  let users = [];
  let createdBy = req.user._id;
  const schedule = new Schedule({
    from,
    to,
    group,
    totalSeats,
    users,
    createdBy,
  });
  schedule
    .save()
    .then((createdSchedule) => {
      return res.status(200).json({
        createdSchedule,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.getScheduleByGroup = async (req, res) => {
  const groupid = req.params.groupid;
  Schedule.find({ group: groupid })
    .populate("createdBy")
    .then((schedule) => {
      return res.status(200).json({
        schedule,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.voteSchedule = async (req, res) => {
  const { mode, id } = req.body;
  let sch = await Schedule.findOne({
    _id: id,
    users: { $elemMatch: { id: req.user._id } },
  });
  if (sch) {
    return res.status(422).json({
      message: "User already voted",
    });
  }
  if (mode === "offline") {
    let schedule;
    try {
      schedule = await Schedule.findOne({ _id: id });
      if (
        schedule.users.filter((ele) => ele.mode === "offline").length >
        schedule.totalSeats / 2
      ) {
        return res.status(400).json({
          message: "Offline seats are filled",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "something went wrong",
      });
    }
  }
  Schedule.findOneAndUpdate(
    { _id: id },
    { $push: { users: { id: req.user._id, mode: mode } } },
    { new: true }
  )
    .then((schedule) => {
      return res.status(200).json({
        schedule,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.getAllVotes = async (req, res) => {
  const { id } = req.body;
  Schedule.findOne({ _id: id })
    .populate({
      path: "users",
      populate: [
        {
          path: "id",
          select: ["firstName", "lastName", "email", "enrollmentNumber"],
        },
      ],
    })
    .then((schedule) => {
      if (!schedule.createdBy.equals(req.user._id)) {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }

      return res.status(200).json({
        offline: schedule.users.filter((elem) => elem.mode === "offline"),
        online: schedule.users.filter((elem) => elem.mode === "online"),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "soemthing went wrong",
      });
    });
};
