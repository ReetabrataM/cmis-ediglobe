import {
  LayoutDashboard,
  Users,
  BookOpen,
  Wallet,
  ClipboardCheck,
  LogOut,
  GraduationCap,
  UserCog,
  Bell,
  FileText,
  Settings,
  Award,
  PlusCircle,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userName =
    user?.user?.name ||
    user?.name ||
    "Administrator";

  const userEmail =
    user?.user?.email ||
    user?.email ||
    "admin@cmis.com";

 const menuSections = [
  {
    title: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/",
      },
    ],
  },

  {
    title: "ACADEMICS",
    items: [
      {
        title: "Students",
        icon: <Users size={20} />,
        path: "/students",
      },

      {
        title: "Courses",
        icon: <BookOpen size={20} />,
        path: "/courses",
      },

      {
        title: "Attendance",
        icon: <ClipboardCheck size={20} />,
        path: "/attendance",
      },

      {
        title: "Marks",
        icon: <Award size={20} />,
        path: "/marks",
      },

    ],
  },

  {
    title: "FINANCE",
    items: [
      {
        title: "Fees",
        icon: <Wallet size={20} />,
        path: "/fees",
      },
    ],
  },
];

  return (
    <div className="w-[300px] min-h-screen bg-[#040404] border-r border-white/10 flex flex-col justify-between p-6 overflow-y-auto">

      {/* TOP SECTION */}
      <div>

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-700 flex items-center justify-center shadow-2xl">
              <GraduationCap className="text-black" />
            </div>

            <div>
              <h1 className="font-serif text-4xl text-yellow-400">
                CMIS
              </h1>

              <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">
                University ERP
              </p>
            </div>

          </div>
        </motion.div>

        {/* USER CARD */}
        <div className="mb-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">

          <div className="flex items-center gap-4">

            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-700 flex items-center justify-center text-black font-bold text-xl">
                {userName.charAt(0)}
              </div>

              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
            </div>

            <div>

              <div className="flex items-center gap-2 mb-1">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <p className="text-xs uppercase tracking-[0.25em] text-green-400">
                  Online Session
                </p>

              </div>

              <h3 className="text-white font-semibold">
                {userName}
              </h3>

              <p className="text-white/40 text-sm truncate max-w-[160px]">
                {userEmail}
              </p>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="space-y-8">

          {menuSections.map((section) => (
            <div key={section.title}>

              <p className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-3 px-2">
                {section.title}
              </p>

              <div className="space-y-2">

                {section.items.map((item) => {

                  const active =
                    location.pathname === item.path;

                  return (
                    <Link
                      key={item.title}
                      to={item.path}
                    >
                      <motion.div
                        whileHover={{
                          x: 4,
                        }}
                        className={`
                          flex items-center gap-4
                          px-5 py-4 rounded-2xl
                          transition-all duration-300

                          ${
                            active
                              ? "bg-gradient-to-r from-yellow-500/20 to-emerald-500/20 border border-yellow-500/20 shadow-lg"
                              : "hover:bg-white/5"
                          }
                        `}
                      >
                        <div
                          className={
                            active
                              ? "text-yellow-400"
                              : "text-white/60"
                          }
                        >
                          {item.icon}
                        </div>

                        <span
                          className={
                            active
                              ? "text-white font-medium"
                              : "text-white/70"
                          }
                        >
                          {item.title}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* FOOTER */}
      <div>

        {/* SYSTEM STATUS */}
        <div className="mb-5 bg-gradient-to-r from-yellow-500/10 to-emerald-500/10 border border-yellow-500/10 rounded-2xl p-4">

          <p className="text-xs text-white/40 uppercase tracking-widest">
            System Status
          </p>

          <div className="mt-3 space-y-2">

            <div className="flex justify-between text-sm">
              <span className="text-white/50">
                API Server
              </span>

              <span className="text-green-400">
                Online
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-white/50">
                Database
              </span>

              <span className="text-green-400">
                Connected
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-white/50">
                Authentication
              </span>

              <span className="text-green-400">
                Active
              </span>
            </div>

          </div>

        </div>

        {/* LOGOUT */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
        >
          <LogOut size={20} />
          Logout
        </motion.button>

      </div>

    </div>
  );
}

export default Sidebar;