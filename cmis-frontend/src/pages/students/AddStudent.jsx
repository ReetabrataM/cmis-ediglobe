import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";

import API from "../../api/axios";

import { motion } from "framer-motion";

function AddStudent() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      course: "",
      department: "",
      phone: "",
      address: "",
      semester: "",
      rollNumber: "",
    });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await API.post(
          "/students",
          formData
        );

        alert(
          "Student Added Successfully"
        );

        navigate("/students");
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to add student"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 lg:p-10 overflow-hidden">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="font-serif text-5xl text-yellow-400">
            Add Student
          </h1>

          <p className="text-white/50 mt-3">
            Create premium student
            academic records.
          </p>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
        >
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* NAME */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="John Doe"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="john@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
              />
            </div>
            {/* ROLL NUMBER */}
<div>
  <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
    Roll Number
  </label>

  <input
    type="text"
    name="rollNumber"
    value={formData.rollNumber}
    onChange={handleChange}
    placeholder="CS2026001"
    required
    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
  />
</div>

            {/* COURSE */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Course
              </label>

              <input
                type="text"
                name="course"
                value={
                  formData.course
                }
                onChange={
                  handleChange
                }
                placeholder="Computer Science"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
              />
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={
                  formData.department
                }
                onChange={
                  handleChange
                }
                placeholder="Engineering"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
              />
            </div>
            {/* SEMESTER */}
<div>
  <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
    Semester
  </label>

  <input
    type="number"
    name="semester"
    value={formData.semester}
    onChange={handleChange}
    placeholder="1"
    min="1"
    max="8"
    required
    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
  />
</div>

            {/* PHONE */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                placeholder="+91 9876543210"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                placeholder="Mumbai, India"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition"
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2 pt-4">
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-bold text-lg shadow-2xl"
              >
                {loading
                  ? "Saving..."
                  : "Save Student"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddStudent;