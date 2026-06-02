import { useEffect, useState } from "react";
import {
  GraduationCap,
  Trophy,
  TrendingUp,
  Search,
  Save,
  Pencil,
  Trash2,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";

function MarksList() {
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [markRows, setMarkRows] = useState([]);

  const [editingMark, setEditingMark] = useState(null);

  const [editForm, setEditForm] = useState({
    assignment: 0,
    quiz: 0,
    midSemester: 0,
    finalExam: 0,
  });

  // ✅ NEW FILTER STATES (Existing Records)
  const [filterDept, setFilterDept] = useState("");
  const [filterSem, setFilterSem] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const marksRes = await API.get("/marks");
      const studentsRes = await API.get("/students");
      const coursesRes = await API.get("/courses");

      setMarks(
        Array.isArray(marksRes.data)
          ? marksRes.data
          : marksRes.data?.data || marksRes.data?.marks || []
      );

      setStudents(
        Array.isArray(studentsRes.data)
          ? studentsRes.data
          : studentsRes.data?.data || studentsRes.data?.students || []
      );

      setCourses(
        Array.isArray(coursesRes.data)
          ? coursesRes.data
          : coursesRes.data?.data || coursesRes.data?.courses || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const departments = [
    ...new Set(students.map((s) => s.department)),
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (!department || course.department === department) &&
      (!semester || Number(course.semester) === Number(semester))
  );

  const loadStudents = () => {
    const filtered = students.filter(
      (student) =>
        student.department === department &&
        Number(student.semester) === Number(semester)
    );

    const rows = filtered.map((student) => ({
      student: student._id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      assignment: "",
      quiz: "",
      midSemester: "",
      finalExam: "",
    }));

    setMarkRows(rows);
  };

  const handleMarkChange = (index, field, value) => {
    const updated = [...markRows];

    updated[index][field] = value === "" ? "" : Number(value);

    setMarkRows(updated);
  };

  const saveAllMarks = async () => {
    if (!selectedCourse) return alert("Select a course");

    try {
      await API.post("/marks/bulk-save", {
        course: selectedCourse,
        records: markRows,
      });

      alert("Marks Saved Successfully");

      fetchData();
    } catch (err) {
      alert("Failed To Save Marks");
    }
  };

  const deleteMark = async (id) => {
    if (!window.confirm("Delete this mark record?")) return;

    try {
      await API.delete(`/marks/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  const openEdit = (mark) => {
    setEditingMark(mark);

    setEditForm({
      assignment: mark.assignment || 0,
      quiz: mark.quiz || 0,
      midSemester: mark.midSemester || 0,
      finalExam: mark.finalExam || 0,
    });
  };

  const saveEdit = async () => {
    try {
      await API.put(`/marks/${editingMark._id}`, editForm);

      setEditingMark(null);
      fetchData();

      alert("Updated Successfully");
    } catch (err) {
      alert("Update Failed");
    }
  };

  const filteredMarks = marks.filter((mark) => {
    const text = search.toLowerCase();

    const matchesSearch =
      mark.student?.name?.toLowerCase().includes(text) ||
      mark.student?.rollNumber?.toLowerCase().includes(text) ||
      mark.student?.department?.toLowerCase().includes(text);

    const matchesDept =
      !filterDept || mark.student?.department === filterDept;

    const matchesSem =
      !filterSem ||
      Number(mark.student?.semester) === Number(filterSem);

    const matchesCourse =
      !filterCourse || mark.course?._id === filterCourse;

    return matchesSearch && matchesDept && matchesSem && matchesCourse;
  });

  const averageMarks = filteredMarks.length
    ? (
        filteredMarks.reduce(
          (a, b) => a + (b.totalMarks || 0),
          0
        ) / filteredMarks.length
      ).toFixed(1)
    : 0;

  const topper = filteredMarks.length
    ? Math.max(...filteredMarks.map((m) => m.totalMarks || 0))
    : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-serif text-yellow-400">
            Academic Performance
          </h1>
          <p className="text-white/50 mt-2">
            Manage student marks, grades and academic records.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <GraduationCap className="text-yellow-400 mb-3" size={30} />
            <h2 className="text-4xl font-bold">{filteredMarks.length}</h2>
            <p className="text-white/50">Total Records</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <TrendingUp className="text-emerald-400 mb-3" size={30} />
            <h2 className="text-4xl font-bold">{averageMarks}</h2>
            <p className="text-white/50">Average Marks</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <Trophy className="text-orange-400 mb-3" size={30} />
            <h2 className="text-4xl font-bold">{topper}</h2>
            <p className="text-white/50">Highest Score</p>
          </div>
        </div>

        {/* FILTERS (BULK ENTRY) */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6,7,8].map((sem) => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <option value="">Select Course</option>
            {filteredCourses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>

          <button
            onClick={loadStudents}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-2xl"
          >
            Load Students
          </button>
        </div>

        {/* BULK ENTRY TABLE */}
        {markRows.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden mb-10">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Enter Marks</h2>

              <button
                onClick={saveAllMarks}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-black font-bold"
              >
                <Save size={18} />
                Save All
              </button>
            </div>

            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-4 text-left">Student</th>
                  <th className="p-4 text-left">Roll</th>
                  <th className="p-4 text-left">Assignment</th>
                  <th className="p-4 text-left">Quiz</th>
                  <th className="p-4 text-left">Mid</th>
                  <th className="p-4 text-left">Final</th>
                </tr>
              </thead>

              <tbody>
                {markRows.map((row, index) => (
                  <tr key={row.student} className="border-t border-white/10">
                    <td className="p-4">{row.studentName}</td>
                    <td className="p-4">{row.rollNumber}</td>

                    {["assignment", "quiz", "midSemester", "finalExam"].map(
                      (field) => (
                        <td key={field} className="p-4">
                          <input
                            type="number"
                            value={row[field]}
                            onChange={(e) =>
                              handleMarkChange(index, field, e.target.value)
                            }
                            className="w-24 bg-black border border-white/10 rounded-lg p-2"
                          />
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-4 text-white/40"
          />
          <input
            type="text"
            placeholder="Search Student, Roll Number or Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-400"
          />
        </div>

        {/* EXISTING RECORDS FILTERS */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">

          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={filterSem}
            onChange={(e) => setFilterSem(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <option value="">All Semesters</option>
            {[1,2,3,4,5,6,7,8].map((s) => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>

          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.courseName}
              </option>
            ))}
          </select>

        </div>

        {/* SAVED RECORDS */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold">Existing Marks Records</h2>
          </div>

          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-left">Roll</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Grade</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMarks.map((mark) => (
                <tr key={mark._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-4">{mark.student?.name}</td>
                  <td className="p-4">{mark.student?.rollNumber}</td>
                  <td className="p-4">{mark.course?.courseName}</td>
                  <td className="p-4 font-bold text-yellow-400">{mark.totalMarks}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      {mark.grade}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(mark)}
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => deleteMark(mark._id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filteredMarks.length === 0 && (
            <div className="p-16 text-center text-white/50">
              No Marks Records Found
            </div>
          )}
        </div>

      </div>

      {/* EDIT MODAL */}
      {editingMark && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-lg">

            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              Edit Marks
            </h2>

            <div className="space-y-4">

              <input
                type="number"
                value={editForm.assignment}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    assignment: Number(e.target.value),
                  })
                }
                className="w-full p-4 rounded-xl bg-black border border-white/10"
              />

              <input
                type="number"
                value={editForm.quiz}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    quiz: Number(e.target.value),
                  })
                }
                className="w-full p-4 rounded-xl bg-black border border-white/10"
              />

              <input
                type="number"
                value={editForm.midSemester}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    midSemester: Number(e.target.value),
                  })
                }
                className="w-full p-4 rounded-xl bg-black border border-white/10"
              />

              <input
                type="number"
                value={editForm.finalExam}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    finalExam: Number(e.target.value),
                  })
                }
                className="w-full p-4 rounded-xl bg-black border border-white/10"
              />

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={saveEdit}
                className="flex-1 py-3 rounded-xl bg-yellow-400 text-black font-bold"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditingMark(null)}
                className="flex-1 py-3 rounded-xl bg-white/10"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default MarksList;