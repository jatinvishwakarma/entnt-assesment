import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const initialForm = { name: "", dob: "", contact: "", healthInfo: "" };

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
     const existingPatients = JSON.parse(localStorage.getItem("patients") || "[]");

  if (existingPatients.length === 0) {
    const defaultPatient = {
      id: "p1751928767845",
      name: "Jatin",
      dob: "2000-01-01",
      contact: "9876543210",
      healthInfo: "No major issues",
      email: "jatin@entnt.in",
      password: "patient123"
    };

    const defaultUser = {
      email: "jatin@entnt.in",
      password: "patient123",
      role: "Patient",
      patientId: "p1751928767845"
    };

    localStorage.setItem("patients", JSON.stringify([defaultPatient]));

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = [...existingUsers.filter(u => u.email !== "jatin@entnt.in"), defaultUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setPatients([defaultPatient]);
  } else {
    setPatients(existingPatients);
  }
  }, []);

  const savePatients = (list) => {
    setPatients(list);
    localStorage.setItem("patients", JSON.stringify(list));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.contact) {
      alert("Name, Date of Birth, and Contact are required.");
      return;
    }
    if (editingId) {
      const updated = patients.map(p =>
        p.id === editingId ? { ...p, ...form } : p
      );
      savePatients(updated);
      setEditingId(null);
    } else {
      const newPatient = {
        ...form,
        id: "p" + Date.now()
      };
      savePatients([...patients, newPatient]);
    }
    setForm(initialForm);
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this patient?")) {
      savePatients(patients.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Patients Management</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">Full Name</label>
          <input
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">Date of Birth</label>
          <input
            name="dob"
            type="date"
            placeholder="Select birth date"
            value={form.dob}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">Contact Number</label>
          <input
            name="contact"
            placeholder="Enter contact number"
            value={form.contact}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">Health Info</label>
          <input
            name="healthInfo"
            placeholder="Brief health notes or condition"
            value={form.healthInfo}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition font-medium"
          >
            {editingId ? "Update" : "Add"} Patient
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm(initialForm);
                setEditingId(null);
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md transition font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-slate-200 rounded-xl shadow-sm text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">DOB</th>
              <th className="text-left p-3 border-b">Contact</th>
              <th className="text-left p-3 border-b">Health Info</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-blue-50 transition">
                <td className="p-3 border-b">{p.name}</td>
                <td className="p-3 border-b">{p.dob}</td>
                <td className="p-3 border-b">{p.contact}</td>
                <td className="p-3 border-b">{p.healthInfo}</td>
                <td className="p-3 border-b">
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded text-sm transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-sm transition"
                    >
                      🗑️ Delete
                    </button>
                    <Link
                      to={`/patients/${p.id}/incidents`}
                      className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded text-sm transition text-center"
                    >
                      📁 Incidents
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-slate-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
