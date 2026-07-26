import Class from "../models/Class.js";

export const addClass = async (req, res) => {
  try {

    const newClass = await Class.create(req.body);

    res.status(201).json(newClass);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const getClasses = async (req, res) => {
  try {

    const classes = await Class.find().sort({
      grade: 1
    });

    res.json(classes);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const deleteClass = async (req, res) => {
  try {

    await Class.findByIdAndDelete(req.params.id);

    res.json({
      message: "Class deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};