import express from "express";

import {
  generateTimetable,
  getAllTimetables,
  getTimetableByClass,
  deleteTimetable
} from "../controllers/timetableController.js";

const router = express.Router();

router.post(
  "/generate",
  generateTimetable
);

router.get(
  "/",
  getAllTimetables
);

router.get(
  "/:className",
  getTimetableByClass
);

router.delete(
  "/:id",
  deleteTimetable
);

export default router;