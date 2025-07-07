import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setIncidents(JSON.parse(localStorage.getItem("incidents") || "[]"));
    setPatients(JSON.parse(localStorage.getItem("patients") || "[]"));
  }, []);

  const nextAppointments = [...incidents]
    .filter(i => i.appointmentDate)
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const patientCounts = {};
  incidents.forEach(i => {
    patientCounts[i.patientId] = (patientCounts[i.patientId] || 0) + 1;
  });
  const topPatients = Object.entries(patientCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => {
      const patient = patients.find(p => p.id === id);
      return { name: patient ? patient.name : id, count };
    });

  const pending = incidents.filter(i => i.status && i.status.toLowerCase() !== "completed").length;
  const completed = incidents.filter(i => i.status && i.status.toLowerCase() === "completed").length;
  const revenue = incidents.reduce((sum, i) => sum + (parseFloat(i.cost) || 0), 0);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-sm text-slate-500 mb-1">Next 10 Appointments</div>
          <div className="text-3xl font-semibold text-slate-800">{nextAppointments.length}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-sm text-slate-500 mb-2">Top Patients</div>
          <ul className="text-sm text-slate-700 space-y-1">
            {topPatients.map(p => (
              <li key={p.name}>
                <span className="font-medium">{p.name}</span>: {p.count}
              </li>
            ))}
            {topPatients.length === 0 && <li>No patients yet.</li>}
          </ul>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-sm text-slate-500 mb-1">Pending Treatments</div>
          <div className="text-3xl font-semibold text-yellow-600">{pending}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-sm text-slate-500 mb-1">Total Revenue</div>
          <div className="text-3xl font-semibold text-green-700">₹{revenue}</div>
        </div>
      </div>

      <div className="mb-10 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Appointments</h2>
        <div className="grid gap-4">
          {nextAppointments.length > 0 ? (
            nextAppointments.map(i => (
              <div
                key={i.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="mb-2 sm:mb-0">
                  <p className="text-slate-800 font-medium text-sm">
                    {i.title} — Patient ID {i.patientId}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(i.appointmentDate).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    i.status?.toLowerCase() === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {i.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 italic">No upcoming appointments.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <Link
          to="/patients"
          className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition cursor-pointer"
        >
          Manage Patients
        </Link>
        <Link
          to="/calendar"
          className="border border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-5 py-2.5 rounded-md text-sm font-medium transition cursor-pointer"
        >
          View Calendar
        </Link>
      </div>
    </div>
  );
}
