# School Timetable Management System

A full-stack web application for managing school classes, subjects, teachers, staff leave, and automated timetable generation — built with a vanilla JS frontend and a Node.js/Express/MongoDB backend.

## Overview

Admins can register classes and subjects, onboard teachers, and generate a weekly timetable automatically based on periods-per-week requirements per subject and grade. The system also tracks teacher requirement vs. availability, and handles teacher leave requests.

## Features

- Teacher Management (add / view / delete)
- Subject Management (periods/week, capacity, applicable grades)
- Class Management (grade, sections, periods/day)
- Leave Management (apply, approve, reject)
- Automated Timetable Generation (with breaks, teacher-clash avoidance)
- Teacher Requirement Analysis (required vs. available vs. pending, per subject)
- Dashboard Analytics

## Tech Stack

**Frontend**

- HTML, CSS, Vanilla JavaScript (no framework)

**Backend**

- Node.js
- Express.js

**Database**

- MongoDB
- Mongoose

## Project Structure

```
School-Timetable-Management-System/
│
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Route logic
|   |   ├── middleware/     # Request middleware
│   │   ├── models/         # Mongoose schemas
│   │   └── routes/         # Express routers
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── index.html          # Dashboard
│   ├── login.html
│   ├── classes.html
│   ├── subjects.html
│   ├── teacher.html
│   ├── teacher-details.html
│   ├── timetable.html
│   ├── leave.html
│   ├── style.css
│   ├── api.js               # Shared fetch helper, toasts, modal, sidebar
│   ├── dashboard.js
│   ├── classes.js
│   ├── subjects.js
│   ├── teachers.js
│   ├── timetable.js
│   └── leave.js
├── .gitignore
├── README.md
└── LICENSE
```

## Installation

```bash
git clone https://github.com/<your-username>/School-Timetable-Management-System.git
cd School-Timetable-Management-System/backend
npm install
```

Create a `.env` file inside `backend/` (see below), then:

```bash
npm start
```

The API will run on `http://localhost:5000`.

For the frontend, just open `frontend/login.html` in a browser (or serve the folder with any static server, e.g. the VS Code Live Server extension).

## Environment Variables

Create `backend/.env` with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Never commit your real `.env` file — an `.env.example` is provided instead.

## API Endpoints

| Method | Endpoint                      | Description                           |
| ------ | ----------------------------- | ------------------------------------- |
| POST   | /api/auth/login               | Login                                 |
| POST   | /api/auth/register            | Register admin                        |
| POST   | /api/classes                  | Add class                             |
| GET    | /api/classes                  | Get all classes                       |
| DELETE | /api/classes/:id              | Delete class                          |
| POST   | /api/subjects                 | Add subject                           |
| GET    | /api/subjects                 | Get all subjects                      |
| DELETE | /api/subjects/:id             | Delete subject                        |
| POST   | /api/teachers                 | Add teacher                           |
| GET    | /api/teachers                 | Get all teachers                      |
| DELETE | /api/teachers/:id             | Delete teacher                        |
| GET    | /api/teachers/requirements    | Get subject-wise requirement analysis |
| GET    | /api/teachers/dashboard-stats | Get dashboard summary stats           |
| POST   | /api/leaves                   | Apply for leave                       |
| GET    | /api/leaves                   | Get all leave requests                |
| PUT    | /api/leaves/:id               | Approve/reject leave                  |
| DELETE | /api/leaves/:id               | Delete leave request                  |
| POST   | /api/timetables/generate      | Generate timetable for all classes    |
| GET    | /api/timetables               | Get all generated timetables          |
| GET    | /api/timetables/:className    | Get timetable for a specific class    |
| DELETE | /api/timetables/:id           | Delete a timetable                    |

## Future Improvements

- [ ] JWT-based authentication with protected routes
- [ ] Password hashing with bcrypt
- [ ] Move hardcoded `http://localhost:5000` in the frontend into a config value
- [ ] Responsive/mobile-first UI polish
- [ ] Export generated timetable to PDF
- [ ] Role-based access control (admin vs. teacher views)
- [ ] Input validation on both frontend and backend (currently minimal)
- [ ] Conflict-free scheduling algorithm (current generator uses randomized shuffling with retries, not a constraint solver)

## Author

**Your Name**
[GitHub](https://github.com/<your-username>) · [LinkedIn](https://linkedin.com/in/<your-username>)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
