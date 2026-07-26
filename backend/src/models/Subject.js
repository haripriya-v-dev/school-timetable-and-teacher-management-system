import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true
    },

    periodsPerWeek: {
      type: Number,
      required: true
    },

    teacherCapacity: {
      type: Number,
      default: 30
    },

    grades: [
      {
        type: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Subject", subjectSchema);