import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView() {
  const [incidents, setIncidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayIncidents, setDayIncidents] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("incidents") || "[]");
    setIncidents(all);
  }, []);

  useEffect(() => {
    const dayStr = selectedDate.toISOString().slice(0, 10);
    setDayIncidents(
      incidents.filter(
        (i) => i.appointmentDate && i.appointmentDate.slice(0, 10) === dayStr
      )
    );
  }, [selectedDate, incidents]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dayStr = date.toISOString().slice(0, 10);
      if (
        incidents.some(
          (i) => i.appointmentDate && i.appointmentDate.slice(0, 10) === dayStr
        )
      ) {
        return "highlighted-date";
      }
    }
    return null;
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">
        Appointments Calendar
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          className="w-full react-calendar"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">
          Appointments on{" "}
          <span className="text-blue-600 font-medium">
            {selectedDate.toLocaleDateString()}
          </span>
        </h2>

        {dayIncidents.length === 0 ? (
          <div className="text-slate-500 text-sm">No appointments scheduled.</div>
        ) : (
          <ul className="space-y-4">
            {dayIncidents.map((i) => (
              <li
                key={i.id}
                className="p-4 border border-blue-100 rounded-lg bg-blue-50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-md font-semibold text-slate-800">
                    {i.title}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {i.appointmentDate.slice(11, 16)} hrs
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  <strong>Patient:</strong> {i.patientId}
                </div>
                <div className="text-sm text-slate-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      i.status?.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {i.status || "N/A"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>
        {`
          .react-calendar__tile.highlighted-date {
            background: #bfdbfe;
            color: #1e40af;
            border-radius: 6px;
          }
          .react-calendar__tile.highlighted-date:enabled:hover {
            background: #93c5fd;
            color: #1e3a8a;
          }
        `}
      </style>
    </div>
  );
}
