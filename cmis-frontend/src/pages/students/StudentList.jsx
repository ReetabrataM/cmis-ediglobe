import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");

      const studentData = Array.isArray(res.data)
        ? res.data
        : res.data?.students || [];

      setStudents(studentData);
      setFilteredStudents(studentData);
    } catch (error) {
      console.log(error);

      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student?.rollNumber
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student?.department
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [search, students]);

  const deleteStudent = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this student?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(`/students/${id}`);

      const updatedStudents =
        students.filter(
          (student) =>
            student._id !== id
        );

      setStudents(updatedStudents);
      setFilteredStudents(
        updatedStudents
      );

      alert("Student Deleted");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
          <div>
            <h1 className="font-serif text-5xl text-yellow-400">
              Students
            </h1>

            <p className="text-white/50 mt-2">
              Manage student records and profiles
            </p>
          </div>

          <Link
            to="/students/add"
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-bold shadow-xl"
          >
            + Add Student
          </Link>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <Users
              className="text-yellow-400 mb-3"
              size={30}
            />

            <h2 className="text-4xl font-bold">
              {students.length}
            </h2>

            <p className="text-white/50">
              Total Students
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-4 text-white/40"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by Name, Roll No, Department..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-400"
          />
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center py-20 text-white/50">
            Loading Students...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-white/50">
            No students found.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {filteredStudents.map(
              (student, index) => (
                <motion.div
                  key={student._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-7"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-serif text-yellow-400">
                        {student.name ||
                          "Unknown Student"}
                      </h2>

                      <p className="text-white/50 mt-2">
                        {student.email ||
                          "No Email"}
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xl font-bold">
                      {student.name
                        ?.charAt(0)
                        ?.toUpperCase() || "S"}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 text-white/70">
                    <p>
                      Roll Number :
                      <span className="text-white ml-2">
                        {student.rollNumber ||
                          "N/A"}
                      </span>
                    </p>

                    <p>
                      Department :
                      <span className="text-white ml-2">
                        {student.department ||
                          "N/A"}
                      </span>
                    </p>

                    <p>
                      Course :
                      <span className="text-white ml-2">
                        {student.course ||
                          "N/A"}
                      </span>
                    </p>

                    <p>
                      Phone :
                      <span className="text-white ml-2">
                        {student.phone ||
                          "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-8">

                    <Link
                      to={`/students/${student._id}`}
                      className="px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                    >
                      View
                    </Link>

                    <Link
                      to={`/students/edit/${student._id}`}
                      className="px-5 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteStudent(
                          student._id
                        )
                      }
                      className="px-5 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300"
                    >
                      Delete
                    </button>

                  </div>
                </motion.div>
              )
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;