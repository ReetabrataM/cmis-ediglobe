import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      /*
        EXPECTED BACKEND RESPONSE:

        {
          token,
          user
        }
      */

      login(data);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white flex items-center justify-center overflow-hidden relative px-5 py-10">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-10rem] left-[-10rem] w-[30rem] h-[30rem] bg-emerald-800/20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-yellow-600/10 rounded-full blur-3xl" />

      {/* GOLD LINE */}
      <svg
        className="absolute inset-0 opacity-20"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <path
          d="M0 400C180 260 370 610 550 500C710 410 760 220 930 290C1150 380 1220 720 1440 520"
          stroke="url(#gold)"
          strokeWidth="2"
        />

        <defs>
          <linearGradient
            id="gold"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop stopColor="#facc15" />

            <stop
              offset="1"
              stopColor="#854d0e"
            />
          </linearGradient>
        </defs>
      </svg>

      {/* MAIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
          {/* TOP ICON */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700 flex items-center justify-center shadow-2xl">
              <GraduationCap
                size={36}
                className="text-black"
              />
            </div>
          </div>

          {/* LOGO */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-5xl md:text-6xl text-yellow-400 tracking-[0.15em]">
              CMIS
            </h1>

            <p className="mt-4 text-white/40 uppercase tracking-[0.35em] text-[11px]">
              Campus Management
              Intelligence Suite
            </p>
          </div>

          {/* TITLE */}
          <div className="mb-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Welcome Back
            </h2>

            <p className="text-white/50 mt-4 leading-7 text-sm md:text-base">
              Access the premium
              academic administration
              experience.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* EMAIL */}
            <div>
              <label className="block text-xs uppercase tracking-[0.25em] text-white/50 mb-3">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={handleChange}
                placeholder="admin@cmis.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition duration-300"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs uppercase tracking-[0.25em] text-white/50 mb-3">
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
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition duration-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-yellow-400 transition"
                >
                  {showPassword ? (
                    <EyeOff
                      size={20}
                    />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 text-black font-semibold shadow-[0_10px_40px_rgba(250,204,21,0.35)]"
            >
              {loading
                ? "Authenticating..."
                : "Login"}
            </motion.button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-white/50 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-400 hover:text-yellow-300 transition"
            >
              Register
            </Link>
          </div>

          {/* DEMO */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-center text-xs text-white/30 uppercase tracking-[0.2em] mb-3">
              Demo Credentials
            </p>

            <div className="bg-white/5 rounded-2xl p-4 text-sm text-white/60">
              <p>
                Email:
                admin@cmis.com
              </p>

              <p>
                Password: 123456
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;