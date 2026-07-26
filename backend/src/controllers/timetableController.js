import Timetable from "../models/Timetable.js";
import Class from "../models/Class.js";
import Subject from "../models/Subject.js";
import Teacher from "../models/Teacher.js";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

function getPeriodsPerDay(grade) {
  if (grade >= 1 && grade <= 5) return 7;
  if (grade >= 6 && grade <= 8) return 8;
  return 9;
}

function getBreaks(periods) {
  if (periods === 7) {
    return {
      short1: 3,
      lunch: 5,
      short2: 7
    };
  }

  if (periods === 8) {
    return {
      short1: 3,
      lunch: 5,
      short2: 8
    };
  }

  return {
    short1: 3,
    lunch: 6,
    short2: 9
  };
}

function shuffle(array) {

  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function createWeeklyPool(subjects) {

  let pool = [];

  subjects.forEach(subject => {

    for (let i = 0; i < subject.periodsPerWeek; i++) {

      pool.push(subject);

    }

  });

  return shuffle(pool);

}

function getTeacherForSubject(subjectName, teachers, teacherBusy, day, period) {

  const availableTeachers = teachers.filter(
    teacher =>
      teacher.subject === subjectName &&
      teacher.status === "Active"
  );

  for (const teacher of availableTeachers) {

    if (!teacherBusy[teacher.name]) {

      teacherBusy[teacher.name] = {};

    }

    if (!teacherBusy[teacher.name][day]) {

      teacherBusy[teacher.name][day] = [];

    }

    if (!teacherBusy[teacher.name][day].includes(period)) {

      teacherBusy[teacher.name][day].push(period);

      return teacher.name;

    }

  }

  return "TBA";

}

export const generateTimetable = async (req, res) => {

  try {

    await Timetable.deleteMany();

    const classes = await Class.find().sort({
      grade: 1
    });

    const allSubjects = await Subject.find();

    const teachers = await Teacher.find({
      status: "Active"
    });

    const teacherBusy = {};

    teachers.forEach(teacher => {

      teacherBusy[teacher.name] = {};

    });

    const generatedTables = [];

    for (const cls of classes) {

      const sections = [];

      for (let i = 0; i < cls.sections; i++) {

        sections.push(
          String.fromCharCode(65 + i)
        );

      }

      const classSubjects = allSubjects.filter(subject =>
        subject.grades.includes(cls.grade)
      );

      if (classSubjects.length === 0) {

        console.log(
          `No subjects found for Grade ${cls.grade}`
        );

        continue;

      }

      for (const section of sections) {

        const className =
          `${cls.grade}-${section}`;

        const periodsPerDay =
          getPeriodsPerDay(cls.grade);

        const breaks =
          getBreaks(periodsPerDay);

        const weeklyPool =
          createWeeklyPool(classSubjects);

        let poolIndex = 0;

        const schedule = {};

        DAYS.forEach(day => {

          schedule[day] = [];

        });
                for (const day of DAYS) {

          let actualPeriod = 1;

          while (
            schedule[day].length < periodsPerDay
          ) {

            if (
              actualPeriod === breaks.short1
            ) {

              schedule[day].push("Short Break");

              actualPeriod++;

              continue;

            }

            if (
              actualPeriod === breaks.lunch
            ) {

              schedule[day].push("Lunch Break");

              actualPeriod++;

              continue;

            }

            if (
              actualPeriod === breaks.short2
            ) {

              schedule[day].push("Short Break");

              actualPeriod++;

              continue;

            }

            if (
              poolIndex >= weeklyPool.length
            ) {

              poolIndex = 0;

            }

            let subject =
              weeklyPool[poolIndex];

            poolIndex++;

            let attempts = 0;

            while (
              attempts <
              weeklyPool.length
            ) {

              const todaySubjects =
                schedule[day]
                  .filter(
                    p =>
                      typeof p ===
                      "object"
                  )
                  .map(
                    p =>
                      p.subject
                  );

              if (
                !todaySubjects.includes(
                  subject.subjectName
                )
              ) {

                break;

              }

              subject =
                weeklyPool[
                  poolIndex %
                    weeklyPool.length
                ];

              poolIndex++;

              attempts++;

            }

            const teacherName =
              getTeacherForSubject(
                subject.subjectName,
                teachers,
                teacherBusy,
                day,
                actualPeriod
              );

            schedule[day].push({

              subject:
                subject.subjectName,

              teacher:
                teacherName

            });

            actualPeriod++;

          }

        }

        const timetable =
          await Timetable.create({

            className,

            schedule

          });

        generatedTables.push(
          timetable
        );

        console.log(
          `${className} Generated`
        );

      }

    }

    res.status(200).json({

      success: true,

      message:
        "Timetable Generated Successfully",

      totalClasses:
        generatedTables.length,

      generatedTables:
        generatedTables.map(
          t => t.className
        )

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
export const getAllTimetables = async (req, res) => {

  try {

    const timetables = await Timetable.find()
      .sort({ className: 1 });

    res.status(200).json(timetables);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const getTimetableByClass = async (req, res) => {

  try {

    const timetable = await Timetable.findOne({
      className: req.params.className
    });

    if (!timetable) {

      return res.status(404).json({
        success: false,
        message: "Timetable not found"
      });

    }

    res.status(200).json(timetable);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const deleteTimetable = async (req, res) => {

  try {

    const deleted = await Timetable.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {

      return res.status(404).json({
        success: false,
        message: "Timetable not found"
      });

    }

    res.status(200).json({
      success: true,
      message: "Timetable deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};