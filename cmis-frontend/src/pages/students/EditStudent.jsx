import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      rollNumber: "",
      course: "",
      department: "",
      phone: "",
      address: "",
    });

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent =
    async () => {
      try {
        const res =
          await API.get(
            `/students/${id}`
          );

        const student =
          res.data?.student ||
          res.data ||
          {};

        setFormData({
          name:
            student.name || "",
          email:
            student.email || "",
          rollNumber:
            student.rollNumber ||
            "",
          course:
            student.course || "",
          department:
            student.department ||
            "",
          phone:
            student.phone || "",
          address:
            student.address || "",
        });
      } catch (error) {
        console.log(error);
        alert(
          "Failed to load student"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await API.put(
          `/students/${id}`,
          formData
        );

        alert(
          "Student Updated Successfully"
        );

        navigate(
          "/students"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Update Failed"
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center">
          Loading Student...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10">

        <div className="mb-10">
          <h1 className="font-serif text-5xl text-yellow-400">
            Edit Student
          </h1>

          <p className="text-white/50 mt-2">
            Update student details
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-6xl bg-white/5 border border-white/10 rounded-[2rem] p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={
              handleChange
            }
            placeholder="Student Name"
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={
              handleChange
            }
            placeholder="Email"
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
          />

          <input
            type="text"
            name="rollNumber"
            value={
              formData.rollNumber
            }
            onChange={
              handleChange
            }
            placeholder="Roll Number"
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
          />

          <input
            type="text"
            name="course"
            value={
              formData.course
            }
            onChange={
              handleChange
            }
            placeholder="Course"
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
          />

          <input
            type="text"
            name="department"
            value={
              formData.department
            }
            onChange={
              handleChange
            }
            placeholder="Department"
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
          />

          <input
            type="text"
            name="phone"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            placeholder="Phone Number"
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
          />

          <textarea
            name="address"
            value={
              formData.address
            }
            onChange={
              handleChange
            }
            placeholder="Address"
            rows="4"
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 resize-none"
          />

          <button
            type="submit"
            className="md:col-span-2 py-5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-bold hover:scale-[1.01] transition"
          >
            Update Student
          </button>
        </form>

      </div>
    </div>
  );
}

export default EditStudent;