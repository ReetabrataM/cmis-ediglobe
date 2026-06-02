import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";
import { Link } from "react-router-dom";

function CourseList() {
  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchCourses =
    async () => {
      try {
        const { data } =
          await API.get("/courses");

        setCourses(data);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse =
    async (id) => {
      if (
        !window.confirm(
          "Delete this course?"
        )
      )
        return;

      try {
        await API.delete(
          `/courses/${id}`
        );

        setCourses((prev) =>
          prev.filter(
            (course) =>
              course._id !== id
          )
        );
      } catch (err) {
        alert(
          "Delete Failed"
        );
      }
    };

  const filteredCourses =
    courses.filter(
      (course) =>
        course.courseName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        course.courseCode
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        course.department
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-serif text-yellow-400">
              Courses
            </h1>

            <p className="text-white/40 mt-2">
              Manage academic curriculum.
            </p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-64"
            />

            <Link
              to="/courses/add"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-semibold"
            >
              Add Course
            </Link>
          </div>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white/50">
              Total Courses
            </h3>

            <p className="text-4xl font-bold text-yellow-400 mt-2">
              {courses.length}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white/50">
              Departments
            </h3>

            <p className="text-4xl font-bold text-emerald-400 mt-2">
              {
                [
                  ...new Set(
                    courses.map(
                      (c) =>
                        c.department
                    )
                  ),
                ].length
              }
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white/50">
              Search Results
            </h3>

            <p className="text-4xl font-bold text-blue-400 mt-2">
              {
                filteredCourses.length
              }
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCourses.map(
            (course) => (
              <div
                key={course._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-yellow-500/30 transition"
              >
                <h2 className="text-2xl font-semibold">
                  {
                    course.courseName
                  }
                </h2>

                <p className="text-yellow-400 mt-2">
                  {
                    course.courseCode
                  }
                </p>

                <div className="mt-6 space-y-2 text-white/60">
                  <p>
                    Department:{" "}
                    {
                      course.department
                    }
                  </p>

                  <p>
                    Semester:{" "}
                    {
                      course.semester
                    }
                  </p>

                  <p>
                    Credits:{" "}
                    {
                      course.credits
                    }
                  </p>

                  <p>
                    Faculty:{" "}
                    {
                      course.faculty
                    }
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/courses/edit/${course._id}`}
                    className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteCourse(
                        course._id
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseList;