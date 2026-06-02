import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";
import {
  Users,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

export default function AttendancePage() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [department, setDepartment] =
    useState("");

  const [semester, setSemester] =
    useState("");

  const [course, setCourse] =
    useState("");

  const [date, setDate] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  const [loading, setLoading] =
    useState(false);

  const [attendanceMap,
    setAttendanceMap] =
    useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {
        const [
          courseRes,
          studentRes,
        ] = await Promise.all([
          API.get("/courses"),
          API.get("/students"),
        ]);

        setCourses(
          courseRes.data || []
        );

        const studentData =
          studentRes.data.students ||
          [];

        setStudents(studentData);

        const temp = {};

        studentData.forEach(
          (student) => {
            temp[
              student._id
            ] = "Present";
          }
        );

        setAttendanceMap(temp);
      } catch (err) {
        console.log(err);
      }
    };

  const filteredCourses =
    courses.filter(
      (c) =>
        (!department ||
          c.department ===
            department) &&
        (!semester ||
          Number(c.semester) ===
            Number(semester))
    );

  const filteredStudents =
    students.filter(
      (student) =>
        (!department ||
          student.department ===
            department) &&
        (!semester ||
          Number(
            student.semester
          ) ===
            Number(semester))
    );

  const toggleStatus = (
    studentId
  ) => {
    setAttendanceMap(
      (prev) => ({
        ...prev,
        [studentId]:
          prev[
            studentId
          ] === "Present"
            ? "Absent"
            : "Present",
      })
    );
  };

  const markAllPresent = () => {
    const updated = {};

    filteredStudents.forEach(
      (student) => {
        updated[
          student._id
        ] = "Present";
      }
    );

    setAttendanceMap(updated);
  };

  const markAllAbsent = () => {
    const updated = {};

    filteredStudents.forEach(
      (student) => {
        updated[
          student._id
        ] = "Absent";
      }
    );

    setAttendanceMap(updated);
  };

  const saveAttendance =
    async () => {
      if (!course) {
        alert(
          "Select Course"
        );
        return;
      }

      try {
        setLoading(true);

        await API.post(
          "/attendance",
          {
            course,
            date,
            records:
              filteredStudents.map(
                (
                  student
                ) => ({
                  student:
                    student._id,
                  status:
                    attendanceMap[
                      student
                        ._id
                    ] ||
                    "Present",
                })
              ),
          }
        );

        alert(
          "Attendance Saved Successfully"
        );
      } catch (err) {
        console.log(err);
        alert(
          "Failed To Save Attendance"
        );
      } finally {
        setLoading(false);
      }
    };

  const presentCount =
    filteredStudents.filter(
      (student) =>
        attendanceMap[
          student._id
        ] === "Present"
    ).length;

  const absentCount =
    filteredStudents.length -
    presentCount;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />

      <div className="flex-1 p-8 lg:p-10">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-serif text-yellow-400">
              Attendance
            </h1>

            <p className="text-white/50 mt-2">
              Student attendance
              management
            </p>
          </div>

          <button
            onClick={
              saveAttendance
            }
            disabled={loading}
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-bold"
          >
            {loading
              ? "Saving..."
              : "Save Attendance"}
          </button>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <Users
              className="text-yellow-400 mb-3"
              size={30}
            />

            <h2 className="text-4xl font-bold">
              {
                filteredStudents.length
              }
            </h2>

            <p className="text-white/50">
              Students
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <CheckCircle
              className="text-green-400 mb-3"
              size={30}
            />

            <h2 className="text-4xl font-bold text-green-400">
              {presentCount}
            </h2>

            <p className="text-white/50">
              Present
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <XCircle
              className="text-red-400 mb-3"
              size={30}
            />

            <h2 className="text-4xl font-bold text-red-400">
              {absentCount}
            </h2>

            <p className="text-white/50">
              Absent
            </p>
          </div>

        </div>

        {/* FILTERS */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">

          <div className="grid md:grid-cols-4 gap-4">

            <select
              value={
                department
              }
              onChange={(e) =>
                setDepartment(
                  e.target.value
                )
              }
              className="bg-black border border-white/10 rounded-xl p-3"
            >
              <option value="">
                Department
              </option>

              {[
                ...new Set(
                  students.map(
                    (s) =>
                      s.department
                  )
                ),
              ].map((dept) => (
                <option
                  key={dept}
                >
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={
                semester
              }
              onChange={(e) =>
                setSemester(
                  e.target.value
                )
              }
              className="bg-black border border-white/10 rounded-xl p-3"
            >
              <option value="">
                Semester
              </option>

              {[1,2,3,4,5,6,7,8].map(
                (sem) => (
                  <option
                    key={sem}
                    value={sem}
                  >
                    Semester {sem}
                  </option>
                )
              )}
            </select>

            <select
              value={course}
              onChange={(e) =>
                setCourse(
                  e.target.value
                )
              }
              className="bg-black border border-white/10 rounded-xl p-3"
            >
              <option value="">
                Course
              </option>

              {filteredCourses.map(
                (course) => (
                  <option
                    key={
                      course._id
                    }
                    value={
                      course._id
                    }
                  >
                    {
                      course.courseName
                    }
                  </option>
                )
              )}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
              className="bg-black border border-white/10 rounded-xl p-3"
            />

          </div>

          <div className="flex gap-3 mt-5">

            <button
              onClick={
                markAllPresent
              }
              className="bg-green-500 px-5 py-2 rounded-xl"
            >
              Mark All Present
            </button>

            <button
              onClick={
                markAllAbsent
              }
              className="bg-red-500 px-5 py-2 rounded-xl"
            >
              Mark All Absent
            </button>

          </div>

        </div>

        {/* STUDENTS */}

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="border-b border-white/10">

                <th className="p-5 text-left">
                  Name
                </th>

                <th className="p-5 text-left">
                  Roll
                </th>

                <th className="p-5 text-left">
                  Department
                </th>

                <th className="p-5 text-left">
                  Semester
                </th>

                <th className="p-5 text-center">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredStudents.map(
                (student) => (
                  <tr
                    key={
                      student._id
                    }
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-5">
                      {
                        student.name
                      }
                    </td>

                    <td className="p-5">
                      {
                        student.rollNumber
                      }
                    </td>

                    <td className="p-5">
                      {
                        student.department
                      }
                    </td>

                    <td className="p-5">
                      {
                        student.semester
                      }
                    </td>

                    <td className="p-5 text-center">

                      <button
                        onClick={() =>
                          toggleStatus(
                            student._id
                          )
                        }
                        className={`px-5 py-2 rounded-full font-semibold ${
                          attendanceMap[
                            student
                              ._id
                          ] ===
                          "Present"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {
                          attendanceMap[
                            student
                              ._id
                          ]
                        }
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}