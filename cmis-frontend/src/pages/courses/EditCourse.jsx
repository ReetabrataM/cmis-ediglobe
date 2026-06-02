import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";

function EditCourse() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      courseCode: "",
      courseName: "",
      department: "",
      credits: "",
      semester: "",
      faculty: "",
    });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse =
    async () => {
      const { data } =
        await API.get(
          `/courses/${id}`
        );

      setForm(data);
    };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/courses/${id}`,
        form
      );

      alert(
        "Course Updated"
      );

      navigate("/courses");
    } catch (err) {
      alert(
        "Update Failed"
      );
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-5xl font-serif text-yellow-400 mb-10">
          Edit Course
        </h1>

        <form
          onSubmit={submit}
          className="grid md:grid-cols-2 gap-6 max-w-4xl"
        >
          <input
            value={
              form.courseCode
            }
            onChange={(e) =>
              setForm({
                ...form,
                courseCode:
                  e.target.value,
              })
            }
            placeholder="Course Code"
            className="bg-black border border-white/10 rounded-2xl p-4"
          />

          <input
            value={
              form.courseName
            }
            onChange={(e) =>
              setForm({
                ...form,
                courseName:
                  e.target.value,
              })
            }
            placeholder="Course Name"
            className="bg-black border border-white/10 rounded-2xl p-4"
          />

          <input
            value={
              form.department
            }
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
            placeholder="Department"
            className="bg-black border border-white/10 rounded-2xl p-4"
          />

          <input
            value={
              form.faculty
            }
            onChange={(e) =>
              setForm({
                ...form,
                faculty:
                  e.target.value,
              })
            }
            placeholder="Faculty"
            className="bg-black border border-white/10 rounded-2xl p-4"
          />

          <input
            type="number"
            value={
              form.semester
            }
            onChange={(e) =>
              setForm({
                ...form,
                semester:
                  e.target.value,
              })
            }
            placeholder="Semester"
            className="bg-black border border-white/10 rounded-2xl p-4"
          />

          <input
            type="number"
            value={
              form.credits
            }
            onChange={(e) =>
              setForm({
                ...form,
                credits:
                  e.target.value,
              })
            }
            placeholder="Credits"
            className="bg-black border border-white/10 rounded-2xl p-4"
          />

          <button className="md:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-bold">
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;