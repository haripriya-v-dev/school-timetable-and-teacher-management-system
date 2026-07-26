import Teacher from "../models/Teacher.js";
import Subject from "../models/Subject.js";
import Class from "../models/Class.js";

export const addTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.json(teachers);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);

    res.json({
      message: "Teacher deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getTeacherRequirements = async (req, res) => {
  try {
    const subjects = await Subject.find();
    const classes = await Class.find();

    const requirements = [];

    for (const subject of subjects) {
      let totalPeriodsRequired = 0;

      for (const cls of classes) {
        if (subject.grades.includes(cls.grade)) {
          totalPeriodsRequired +=
            cls.sections * subject.periodsPerWeek;
        }
      }

      const requiredTeachers = Math.ceil(
        totalPeriodsRequired / subject.teacherCapacity
      );

      const availableTeachers =
        await Teacher.countDocuments({
          subject: subject.subjectName
        });

      requirements.push({
        subject: subject.subjectName,
        required: requiredTeachers,
        available: availableTeachers,
        pending: Math.max(
          0,
          requiredTeachers - availableTeachers
        )
      });
    }

    res.json(requirements);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const subjects = await Subject.find();
    const classes = await Class.find();

    let totalRequired = 0;

    for (const subject of subjects) {
      let totalPeriodsRequired = 0;

      for (const cls of classes) {
        if (subject.grades.includes(cls.grade)) {
          totalPeriodsRequired +=
            cls.sections * subject.periodsPerWeek;
        }
      }

      totalRequired += Math.ceil(
        totalPeriodsRequired / subject.teacherCapacity
      );
    }

    const totalAvailable =
      await Teacher.countDocuments();

    res.json({
      totalRequired,
      totalAvailable,
      totalPending: Math.max(
        0,
        totalRequired - totalAvailable
      )
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};