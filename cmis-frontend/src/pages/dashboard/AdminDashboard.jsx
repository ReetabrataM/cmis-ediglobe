import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Sem 1", students: 120 },
  { name: "Sem 2", students: 98 },
  { name: "Sem 3", students: 140 },
  { name: "Sem 4", students: 170 },
];

const BAR_COLORS = ["#d97706", "#b45309", "#f59e0b", "#fbbf24"];

const stats = [
  {
    title: "Total Students",
    value: "2,840",
    icon: "👥",
    delta: "+12% this semester",
    accent: "#f59e0b",
  },
  {
    title: "Faculty Members",
    value: "124",
    icon: "🎓",
    delta: "+3 new this month",
    accent: "#d97706",
  },
  {
    title: "Attendance",
    value: "92%",
    icon: "📋",
    delta: "↑ 4% from last term",
    accent: "#fbbf24",
  },
  {
    title: "Pass Rate",
    value: "98%",
    icon: "✅",
    delta: "Highest in 5 years",
    accent: "#f59e0b",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(10,10,10,0.95)",
          border: "1px solid rgba(245,158,11,0.4)",
          borderRadius: "12px",
          padding: "12px 18px",
          boxShadow: "0 0 20px rgba(245,158,11,0.2)",
        }}
      >
        <p style={{ color: "#f59e0b", fontFamily: "serif", fontSize: "1rem", margin: 0 }}>
          {label}
        </p>
        <p style={{ color: "white", margin: "4px 0 0", fontSize: "0.875rem" }}>
          {payload[0].value} students
        </p>
      </div>
    );
  }
  return null;
};

function StatCard({ title, value, icon, delta, accent, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 120);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.5rem",
        padding: "2rem",
        backdropFilter: "blur(24px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid ${accent}55`;
        e.currentTarget.style.boxShadow = `0 0 36px ${accent}22, inset 0 0 24px ${accent}08`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}30 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: "0.7rem",
            fontFamily: "'DM Sans', sans-serif",
            margin: 0,
          }}
        >
          {title}
        </p>
        <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{icon}</span>
      </div>

      {/* Value */}
      <h2
        style={{
          fontFamily: "'Playfair Display', 'Georgia', serif",
          color: accent,
          fontSize: "clamp(2.2rem, 4vw, 3rem)",
          fontWeight: 700,
          margin: "1rem 0 0.5rem",
          lineHeight: 1,
          textShadow: `0 0 30px ${accent}55`,
        }}
      >
        {value}
      </h2>

      {/* Delta */}
      <p
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.35)",
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
        }}
      >
        {delta}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "2rem",
          right: "2rem",
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`,
          borderRadius: "1px",
        }}
      />
    </div>
  );
}

function AdminDashboard() {
  const [chartVisible, setChartVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
    const t = setTimeout(() => setChartVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background mesh */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 80% 10%, rgba(245,158,11,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 10% 80%, rgba(180,83,9,0.06) 0%, transparent 70%)",
        }}
      />

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "clamp(1.5rem, 4vw, 3.5rem)",
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            marginBottom: "3rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <div
              style={{
                width: "4px",
                height: "48px",
                borderRadius: "2px",
                background: "linear-gradient(180deg, #f59e0b, #b45309)",
                boxShadow: "0 0 16px rgba(245,158,11,0.6)",
              }}
            />
            <h1
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 700,
                color: "#f59e0b",
                margin: 0,
                letterSpacing: "-0.02em",
                textShadow: "0 0 60px rgba(245,158,11,0.3)",
              }}
            >
              Dashboard
            </h1>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              marginLeft: "1.25rem",
              fontSize: "0.875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Luxury Academic Intelligence Platform
          </p>
        </div>

        {/* STATS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          {stats.map((card, i) => (
            <StatCard key={card.title} {...card} index={i} />
          ))}
        </div>

        {/* CHART + SECONDARY PANELS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr minmax(240px, 320px)",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          {/* Main Chart */}
          <div
            style={{
              opacity: chartVisible ? 1 : 0,
              transform: chartVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1.5rem",
              padding: "2rem",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    color: "#f59e0b",
                    fontSize: "1.75rem",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  Student Analytics
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.75rem",
                    margin: "0.4rem 0 0",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Enrollment by semester
                </p>
              </div>
              <span
                style={{
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  color: "#f59e0b",
                  fontSize: "0.7rem",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Live
              </span>
            </div>

            <div style={{ height: "320px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barCategoryGap="30%">
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
                    width={32}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="students" radius={[10, 10, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={index} fill={BAR_COLORS[index]} opacity={0.9} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right side panels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Quick Insights */}
            <div
              style={{
                background:
                  "linear-gradient(145deg, rgba(245,158,11,0.1) 0%, rgba(180,83,9,0.05) 100%)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                backdropFilter: "blur(24px)",
                opacity: chartVisible ? 1 : 0,
                transform: chartVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#f59e0b",
                  fontSize: "1.1rem",
                  margin: "0 0 1.25rem",
                }}
              >
                Quick Insights
              </h3>
              {[
                { label: "New Admissions", value: "48", pct: 78 },
                { label: "Active Courses", value: "32", pct: 64 },
                { label: "Fees Collected", value: "89%", pct: 89 },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: "1.1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "#f59e0b", fontWeight: 600 }}>
                      {item.value}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.pct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #b45309, #f59e0b)",
                        borderRadius: "2px",
                        boxShadow: "0 0 8px rgba(245,158,11,0.5)",
                        transition: "width 1.2s ease 0.8s",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* System Status */}
            <div
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                backdropFilter: "blur(24px)",
                opacity: chartVisible ? 1 : 0,
                transform: chartVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#f59e0b",
                  fontSize: "1.1rem",
                  margin: "0 0 1.25rem",
                }}
              >
                System Status
              </h3>
              {[
                { label: "API Services", status: "Operational", ok: true },
                { label: "Database", status: "Healthy", ok: true },
                { label: "Auth Server", status: "Operational", ok: true },
                { label: "Backup", status: "Running", ok: true },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.55rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>
                    {s.label}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.72rem",
                      color: s.ok ? "#4ade80" : "#f87171",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: s.ok ? "#4ade80" : "#f87171",
                        boxShadow: s.ok ? "0 0 6px #4ade80" : "0 0 6px #f87171",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 900px) {
          .chart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
