import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({
      createdAt: -1
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    res.json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);

    res.json({
      message: "Leave deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};