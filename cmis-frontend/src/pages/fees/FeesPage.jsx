import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import API from "../../api/axios";

function FeesPage() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedDept, setSelectedDept] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState(null);

  const [form, setForm] = useState({
    student: "",
    totalFees: "",
    paidAmount: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  // ================= FETCH FEES =================
  const fetchFees = async () => {
    try {
      const res = await API.get("/fees");

      const feeArray = res?.data?.data || res?.data || [];

      setFees(Array.isArray(feeArray) ? feeArray : []);
    } catch (err) {
      console.log("FEES ERROR:", err);
      setFees([]);
    }
  };

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");

      const studentArray =
        res?.data?.students || res?.data?.data || res?.data || [];

      setStudents(Array.isArray(studentArray) ? studentArray : []);
    } catch (err) {
      console.log("STUDENTS ERROR:", err);
      setStudents([]);
    }
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async () => {
    try {
      const payload = {
        student: form.student,
        totalFees: Number(form.totalFees),
        paidAmount: Number(form.paidAmount),
        dueDate: form.dueDate,
      };

      if (editingFee) {
        await API.put(`/fees/${editingFee._id}`, payload);
      } else {
        await API.post("/fees", payload);
      }

      setIsModalOpen(false);
      setEditingFee(null);

      setForm({
        student: "",
        totalFees: "",
        paidAmount: "",
        dueDate: "",
      });

      fetchFees();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Operation Failed");
    }
  };

  // ================= DELETE =================
  const deleteFee = async (id) => {
    if (!window.confirm("Delete this fee record?")) return;

    try {
      await API.delete(`/fees/${id}`);
      fetchFees();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================= EDIT =================
  const openEdit = (fee) => {
    setEditingFee(fee);

    setForm({
      student: fee.student?._id || "",
      totalFees: fee.totalFees || "",
      paidAmount: fee.paidAmount || "",
      dueDate: fee.dueDate?.split("T")[0] || "",
    });

    setIsModalOpen(true);
  };

  // ================= FILTER =================
  const filteredFees = (fees || []).filter((fee) => {
    const roll = fee?.student?.rollNumber?.toLowerCase() || "";
    const dept = fee?.department?.toLowerCase() || "";

    const matchesSearch =
      roll.includes(search.toLowerCase()) ||
      dept.includes(search.toLowerCase());

    const matchesDept =
      selectedDept === "All" || fee.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  // ================= STATS =================
  const totalCollection = fees.reduce(
    (acc, fee) => acc + Number(fee?.paidAmount || 0),
    0
  );

  const totalPending = fees.reduce(
    (acc, fee) =>
      acc + (Number(fee?.totalFees || 0) - Number(fee?.paidAmount || 0)),
    0
  );

  const paidStudents = fees.filter(
    (fee) =>
      Number(fee.paidAmount) >= Number(fee.totalFees)
  ).length;

  const overdueStudents = fees.filter(
    (fee) =>
      fee?.dueDate &&
      new Date(fee.dueDate) < new Date() &&
      Number(fee.paidAmount) < Number(fee.totalFees)
  ).length;

  const uniqueDepartments = [
    "All",
    ...new Set(fees.map((f) => f.department)),
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold">Fees Management</h1>
            <p className="text-white/50 mt-3">
              Department-wise fee tracking system
            </p>
          </div>

          <button
            onClick={() => {
              setEditingFee(null);
              setForm({
                student: "",
                totalFees: "",
                paidAmount: "",
                dueDate: "",
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-black bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600"
          >
            <Plus size={18} />
            Add Fee Record
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10 text-center">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <Wallet className="text-yellow-400 mx-auto mb-4" size={30} />
            <h2 className="text-3xl font-bold">₹{totalCollection}</h2>
            <p className="text-white/50">Total Collection</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <TrendingUp className="text-emerald-400 mx-auto mb-4" size={30} />
            <h2 className="text-3xl font-bold">₹{totalPending}</h2>
            <p className="text-white/50">Pending Fees</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <CheckCircle className="text-green-400 mx-auto mb-4" size={30} />
            <h2 className="text-3xl font-bold">{paidStudents}</h2>
            <p className="text-white/50">Fully Paid</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <AlertTriangle className="text-red-400 mx-auto mb-4" size={30} />
            <h2 className="text-3xl font-bold">{overdueStudents}</h2>
            <p className="text-white/50">Overdue</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-4 mb-6">
          <input
            className="w-full bg-white/5 p-4 rounded-2xl"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-white/5 p-4 rounded-2xl"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {uniqueDepartments.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10">
          <table className="w-full text-center">
            <thead className="bg-white/5">
              <tr>
                <th className="p-5">Roll</th>
                <th>Dept</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFees.map((fee) => (
                <tr key={fee._id} className="border-t border-white/10">
                  <td className="p-5">{fee.student?.rollNumber}</td>
                  <td>{fee.department}</td>
                  <td>₹{fee.totalFees}</td>
                  <td>₹{fee.paidAmount}</td>
                  <td>
                    ₹{(fee.totalFees || 0) - (fee.paidAmount || 0)}
                  </td>

                  <td className="flex justify-center gap-3 p-4">
                    <button
                      onClick={() => openEdit(fee)}
                      className="text-blue-400"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteFee(fee._id)}
                      className="text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-[#111] p-8 rounded-3xl w-[500px] space-y-4">

              <select
                value={form.student}
                onChange={(e) =>
                  setForm({ ...form, student: e.target.value })
                }
                className="w-full p-3 bg-black rounded"
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.rollNumber} - {s.department}
                  </option>
                ))}
              </select>

              <input
                placeholder="Total Fees"
                value={form.totalFees}
                onChange={(e) =>
                  setForm({ ...form, totalFees: e.target.value })
                }
                className="w-full p-3 bg-black rounded"
              />

              <input
                placeholder="Paid Amount"
                value={form.paidAmount}
                onChange={(e) =>
                  setForm({ ...form, paidAmount: e.target.value })
                }
                className="w-full p-3 bg-black rounded"
              />

              <input
                type="date"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
                className="w-full p-3 bg-black rounded"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-yellow-400 text-black p-3 rounded"
                >
                  {editingFee ? "Update" : "Create"}
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white/10 p-3 rounded"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default FeesPage;