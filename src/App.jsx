import './App.css'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Patients from "./pages/Patients";
import Incidents from "./pages/Incidents";
import CalendarView from "./pages/CalendarView";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/login" element={<Login />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/patients" element={<Patients />} />
       <Route path="/patients/:patientId/incidents" element={<Incidents />} />
      <Route path="/calendar" element={<CalendarView />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
    </>
  )
}

export default App
