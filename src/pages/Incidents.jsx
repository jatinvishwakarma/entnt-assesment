import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const initialForm = {
  title: "",
  description: "",
  comments: "",
  appointmentDate: "",
  cost: "",
  treatment: "",
  status: "",
  nextDate: "",
  files: [],
};

export default function Incidents() {
  const { patientId } = useParams();
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("incidents") || "[]");
    setIncidents(all.filter((i) => i.patientId === patientId));
  }, [patientId]);

  const saveIncidents = (list) => {
    const all = JSON.parse(localStorage.getItem("incidents") || "[]");
    const filtered = all.filter((i) => i.patientId !== patientId);
    const updated = [...filtered, ...list];
    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(list);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({ name: file.name, url: reader.result });
            reader.readAsDataURL(file);
          })
      )
    ).then((fileObjs) => {
      setForm({ ...form, files: fileObjs });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.appointmentDate) {
      alert("Title and Appointment Date are required.");
      return;
    }

    const newIncident = {
      ...form,
      id: editingId || "i" + Date.now(),
      patientId,
    };

    const updated = editingId
      ? incidents.map((i) => (i.id === editingId ? newIncident : i))
      : [...incidents, newIncident];

    saveIncidents(updated);
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (incident) => {
    setForm(incident);
    setEditingId(incident.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this incident?")) {
      saveIncidents(incidents.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-slate-50 min-h-screen">
<Link
  to="/patients"
  className="inline-flex items-center gap-2 mb-2 text-sm text-slate-700 border border-slate-300 rounded-md px-3 py-1.5 hover:bg-slate-100 hover:text-slate-900 transition"
>
  <span className="text-lg">&larr;</span> Back to Patients
</Link>


      <h1 className="text-2xl font-bold mb-6 text-slate-800">
        Incidents for Patient {patientId}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-base font-semibold text-slate-700 mb-2">
            Appointment Information
          </h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="e.g., Tooth Extraction"
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            placeholder="Short description"
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Comments
          </label>
          <input
            type="text"
            name="comments"
            value={form.comments}
            placeholder="Any internal comments"
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Appointment Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none"
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2 mt-2">
          <h3 className="text-base font-semibold text-slate-700 mb-2">
            Post-Appointment Details
          </h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cost (₹)
          </label>
          <input
            type="number"
            name="cost"
            value={form.cost}
            min="0"
            placeholder="Enter cost"
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Treatment
          </label>
          <input
            type="text"
            name="treatment"
            value={form.treatment}
            placeholder="e.g., Filling"
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none"
          >
            <option value="">Select status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Next Appointment Date
          </label>
          <input
            type="date"
            name="nextDate"
            value={form.nextDate}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Upload Files (Invoices, Images)
          </label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-slate-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-slate-100"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {editingId ? "Update" : "Add"} Incident
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400 transition"
              onClick={() => {
                setForm(initialForm);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
        <table className="w-full text-sm text-slate-700">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-3 font-medium">Title</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id} className="border-t hover:bg-blue-50 transition">
                <td className="p-3">{i.title}</td>
                <td className="p-3">
                  {i.appointmentDate
                    ? new Date(i.appointmentDate).toLocaleString()
                    : "-"}
                </td>
                <td className="p-3">
                  {i.status ? (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        i.status.toLowerCase() === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {i.status}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 flex gap-3 flex-wrap">
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-blue-600 hover:bg-blue-100 border border-blue-600 px-3 py-1 rounded-md text-xs transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i.id)}
                    className="text-red-600 hover:bg-red-100 border border-red-600 px-3 py-1 rounded-md text-xs transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {incidents.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-4 text-slate-500 italic"
                >
                  No incidents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
