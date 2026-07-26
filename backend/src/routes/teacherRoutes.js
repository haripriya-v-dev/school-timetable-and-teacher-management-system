import express from "express";

import {
  addTeacher,
  getTeachers,
  deleteTeacher,
  getTeacherRequirements,
  getDashboardStats
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", addTeacher);

router.get("/", getTeachers);

router.get(
  "/requirements",
  getTeacherRequirements
);

router.get(
  "/dashboard-stats",
  getDashboardStats
);

router.delete("/:id", deleteTeacher);

export default router;