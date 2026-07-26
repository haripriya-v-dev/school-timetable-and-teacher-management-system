import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import classRoutes from "./src/routes/classRoutes.js";
import subjectRoutes from "./src/routes/subjectRoutes.js";
import teacherRoutes from "./src/routes/teacherRoutes.js";
import leaveRoutes from "./src/routes/leaveRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import connectDB from "./src/config/db.js";
import timetableRoutes from "./src/routes/timetableRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/classes", classRoutes);

app.use("/api/subjects", subjectRoutes);

app.use("/api/teachers", teacherRoutes);
app.use("/api/leaves", leaveRoutes);

app.use("/api/auth", authRoutes);
app.use(
  "/api/timetables",
  timetableRoutes
);
connectDB();

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "School Timetable API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
