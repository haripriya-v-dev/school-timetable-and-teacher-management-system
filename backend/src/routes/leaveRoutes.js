import express from "express";

import {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
  deleteLeave
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/", applyLeave);

router.get("/", getLeaves);

router.put("/:id", updateLeaveStatus);

router.delete("/:id", deleteLeave);

export default router;