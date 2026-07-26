import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    grade: {
      type: Number,
      required: true,
      unique: true
    },

    sections: {
      type: Number,
      required: true,
      default: 3
    },

    periodsPerDay: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Class", classSchema);