const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const courseRoutes = require(
  "./routes/v1/courseRoutes"
);
const attendanceRoutes = require(
  "./routes/v1/attendanceRoutes"
);
const markRoutes = require(
  "./routes/v1/markRoutes"
);
const feeRoutes = require(
  "./routes/v1/feeRoutes"
);
const dashboardRoutes = require(
  "./routes/v1/dashboardRoutes"
);
const facultyRoutes = require(
  "./routes/v1/facultyRoutes"
);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CMIS API Running");
});

app.use(
  "/api/v1/auth",
  require("./routes/v1/authRoutes")
);
app.use(
  "/api/v1/test",
  require("./routes/v1/testRoutes")
);
app.use(
  "/api/v1/students",
  require("./routes/v1/studentRoutes")
);
app.use(
  "/api/v1/courses",
  require("./routes/v1/courseRoutes")
);
app.use(
  "/api/v1/attendance",
  require("./routes/v1/attendanceRoutes")
);
app.use(
  "/api/v1/marks",
  require("./routes/v1/markRoutes")
);
app.use(
  "/api/v1/attendance",
  attendanceRoutes
);
app.use(
  "/api/v1/marks",
  markRoutes
);
app.use(
  "/api/v1/fees",
  feeRoutes
);
app.use(
  "/api/v1/dashboard",
  dashboardRoutes
);
app.use(
  "/api/v1/faculties",
  facultyRoutes
);
app.use(
  "/api/v1/courses",
  courseRoutes
);

module.exports = app;