import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true
    },

    schedule: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Timetable", timetableSchema);