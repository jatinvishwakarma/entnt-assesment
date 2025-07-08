export const defaultPatient = {
  id: "p1",
  name: "John Doe",
  dob: "1990-05-10",
  contact: "1234567890",
  healthInfo: "No allergies",
  email: "john@entnt.in",
  password: "patient123"
};

export const defaultUser = {
  email: "john@entnt.in",
  password: "patient123",
  role: "Patient",
  patientId: "p1"
};

export const adminUser = {
  email: "admin@entnt.in",
  password: "admin123",
  role: "Admin",
  id: "1"
};

export const defaultIncident = {
  id: "i1",
  patientId: "p1",
  title: "Toothache",
  description: "Upper molar pain",
  comments: "Sensitive to cold",
  appointmentDate: "2025-07-01T10:00:00",
  cost: 80,
  status: "Completed",
  files: [
    { name: "invoice.pdf", url: "base64string-or-blob-url" },
    { name: "xray.png", url: "base64string-or-blob-url" }
  ]
};