import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";
import { BookOpen } from "lucide-react";

function AddCourse() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    credits: 3,
    semester: 1,
    faculty: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/courses", form);

      navigate("/courses");

      setForm({
        courseCode: "",
        courseName: "",
        department: "",
        credits: 3,
        semester: 1,
        faculty: "",
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#050505] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="max-w-5xl">

          {/* HEADER */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1 h-12 rounded-full bg-gradient-to-b from-yellow-400 to-amber-600 shadow-[0_0_16px_rgba(245,158,11,0.6)]" />
              <h1 className="text-5xl font-serif text-yellow-400 tracking-tight"
                style={{ textShadow: "0 0 40px rgba(245,158,11,0.3)" }}>
                Create Course
              </h1>
            </div>
            <p className="text-white/40 ml-5 text-sm tracking-widest uppercase">
              Build academic programs and assign faculty.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">

            {/* Glow orb */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)" }} />

            <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">

              {/* Course Code */}
              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-xs uppercase tracking-widest pl-1">
                  Course Code
                </label>
                <input
                  placeholder="e.g. CS-301"
                  value={form.courseCode}
                  onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
                  className="bg-black/60 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/60 focus:shadow-[0_0_16px_rgba(245,158,11,0.15)] transition-all duration-200"
                />
              </div>

              {/* Course Name */}
              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-xs uppercase tracking-widest pl-1">
                  Course Name
                </label>
                <input
                  placeholder="e.g. Data Structures"
                  value={form.courseName}
                  onChange={(e) => setForm({ ...form, courseName: e.target.value })}
                  className="bg-black/60 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/60 focus:shadow-[0_0_16px_rgba(245,158,11,0.15)] transition-all duration-200"
                />
              </div>

              {/* Department */}
              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-xs uppercase tracking-widest pl-1">
                  Department
                </label>
                <input
                  placeholder="e.g. Computer Science"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="bg-black/60 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/60 focus:shadow-[0_0_16px_rgba(245,158,11,0.15)] transition-all duration-200"
                />
              </div>

              {/* Faculty */}
              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-xs uppercase tracking-widest pl-1">
                  Faculty
                </label>
                <input
                  placeholder="e.g. Dr. Sharma"
                  value={form.faculty}
                  onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                  className="bg-black/60 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/60 focus:shadow-[0_0_16px_rgba(245,158,11,0.15)] transition-all duration-200"
                />
              </div>

              {/* Semester */}
              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-xs uppercase tracking-widest pl-1">
                  Semester
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1"
                  value={form.semester}
                  onChange={(e) => setForm({ ...form, semester: e.target.value })}
                  className="bg-black/60 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/60 focus:shadow-[0_0_16px_rgba(245,158,11,0.15)] transition-all duration-200"
                />
              </div>

              {/* Credits */}
              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-xs uppercase tracking-widest pl-1">
                  Credits
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3"
                  value={form.credits}
                  onChange={(e) => setForm({ ...form, credits: e.target.value })}
                  className="bg-black/60 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/60 focus:shadow-[0_0_16px_rgba(245,158,11,0.15)] transition-all duration-200"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-semibold p-4 flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(245,158,11,0.3)]"
              >
                <BookOpen size={18} />
                {loading ? "Creating..." : "Create Course"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;