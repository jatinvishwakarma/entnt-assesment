import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (user?.role === "Patient") {
      const patients = JSON.parse(localStorage.getItem("patients") || "[]");
      const found = patients.find(p => p.id === user.patientId);
      setPatient(found);

      const allIncidents = JSON.parse(localStorage.getItem("incidents") || "[]");
      setIncidents(allIncidents.filter(i => i.patientId === user.patientId));
    }
  }, [user]);

  if (!patient) return <div className="p-10 text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Personal Details</h2>
        <div className="space-y-3 text-slate-700 text-sm">
          <div><span className="font-medium">Name:</span> {patient.name}</div>
          <div><span className="font-medium">Date of Birth:</span> {patient.dob}</div>
          <div><span className="font-medium">Contact:</span> {patient.contact}</div>
          <div><span className="font-medium">Health Info:</span> {patient.healthInfo || "N/A"}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Appointments & History</h2>

        {incidents.length === 0 ? (
          <div className="text-gray-500 text-sm">No appointments found.</div>
        ) : (
          <ul className="space-y-6">
            {incidents
              .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
              .map((i) => (
                <li key={i.id} className="border border-slate-200 rounded-lg p-4 bg-blue-50 shadow-sm">
                  <div className="text-sm text-slate-800 space-y-1">
                    <div><strong>Title:</strong> {i.title}</div>
                    <div><strong>Date:</strong> {new Date(i.appointmentDate).toLocaleString()}</div>
                    {i.cost && <div><strong>Cost:</strong> ₹{i.cost}</div>}
                    {i.treatment && <div><strong>Treatment:</strong> {i.treatment}</div>}
                    {i.status && <div><strong>Status:</strong> {i.status}</div>}
                    {i.comments && <div><strong>Comments:</strong> {i.comments}</div>}
                    <div>
                      <strong>Files:</strong>{" "}
                      {i.files && i.files.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {i.files.map((f, idx) => (
                            <li key={idx}>
                              {/\.(jpe?g|png)$/i.test(f.name) ? (
                                <img
                                  src={f.url}
                                  alt={f.name}
                                  className="h-20 rounded border object-cover"
                                />
                              ) : (
                                <a
                                  href={f.url}
                                  download={f.name}
                                  className="text-blue-600 underline"
                                >
                                  {f.name}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400 ml-2">No files</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
