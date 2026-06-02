import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";

import API from "../../api/axios";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] =
    useState(null);

  useEffect(() => {
    const fetchStudent =
      async () => {
        try {
          const res =
            await API.get(
              `/students/${id}`
            );

          setStudent(
            res.data.student
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchStudent();
  }, [id]);

  if (!student) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="font-serif text-6xl text-yellow-400">
                {student.name}
              </h1>

              <p className="text-white/50 mt-2">
                {student.email}
              </p>
            </div>

            <div className="w-28 h-28 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-4xl font-bold">
              {student.name
                ?.charAt(0)
                .toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white/5 rounded-2xl p-6">
              <p className="text-white/50">
                Course
              </p>

              <h2 className="text-2xl mt-2">
                {
                  student.course
                }
              </h2>
            </div>

            <div className="bg-white/5 rounded-2xl p-6">
              <p className="text-white/50">
                Department
              </p>

              <h2 className="text-2xl mt-2">
                {
                  student.department
                }
              </h2>
            </div>

            <div className="bg-white/5 rounded-2xl p-6">
              <p className="text-white/50">
                Phone
              </p>

              <h2 className="text-2xl mt-2">
                {
                  student.phone
                }
              </h2>
            </div>

            <div className="bg-white/5 rounded-2xl p-6">
              <p className="text-white/50">
                Address
              </p>

              <h2 className="text-2xl mt-2">
                {
                  student.address
                }
              </h2>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/students"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-300 text-black font-bold"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;