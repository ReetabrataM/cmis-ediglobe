import { useState } from "react";

import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../../api/axios";

function Register() {
  const navigate = useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "admin",
    });

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
        await API.post(
          "/auth/register",
          formData
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Registration failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden px-6">
      {/* GLOW */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-yellow-700/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-10rem] left-[-10rem] w-[30rem] h-[30rem] bg-emerald-800/20 blur-3xl rounded-full" />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
          {/* TITLE */}
          <div className="mb-10 text-center">
            <h1 className="font-serif text-5xl text-yellow-400">
              Create Account
            </h1>

            <p className="mt-4 text-white/50 tracking-[0.2em] uppercase text-xs">
              Premium Campus Platform
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* NAME */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={
                  handleChange
                }
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-yellow-400"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                onChange={
                  handleChange
                }
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-yellow-400"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-3 uppercase tracking-[0.2em] text-sm text-white/50">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="••••••••"
                  onChange={
                    handleChange
                  }
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-yellow-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50"
                >
                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-semibold"
            >
              Register
            </motion.button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-white/50">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;