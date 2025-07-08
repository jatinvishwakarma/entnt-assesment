# ENTNT Dental Assessment

A simple React-based dental clinic management app with mock data, authentication, patient management, and incident tracking.

---

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jatinvishwakarma/entnt-assesment.git
   cd entnt-dental-assesment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Login with default credentials**
   - **Admin:** `admin@entnt.in` / `admin123`
   - **Patient:** `john@entnt.in` / `patient123`

---

## Project Architecture

```
src/
│
├── components/
│   ├── Navbar.jsx
│   └── DataInitializer.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── data/
│   └── mockData.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Patients.jsx
│   └── ... (other pages)
│
└── App.jsx
```

- **components/**: Shared UI components (Navbar, DataInitializer, etc.)
- **context/**: React Context for authentication and session management.
- **data/**: Centralized mock data for users, patients, and incidents.
- **pages/**: Main application pages (Dashboard, Login, Patients, etc.)

---

## Key Features

- **Authentication**: Role-based login for Admin and Patient using mock data.
- **Patients Management**: Add, edit, delete, and search patients.
- **Incidents Management**: Track dental incidents/appointments for each patient.
- **Dashboard**: Admin dashboard with stats and quick links.
- **Search**: Filter patients by name, contact, or health info.
- **Mock Data**: All data is initialized and managed in localStorage for demo purposes.

---

## Technical Decisions

- **React Context** is used for authentication state.
- **localStorage** is used for persistent mock data (users, patients, incidents).
- **Mock data** is centralized in `src/data/mockData.js` for easy reuse and updates.
- **DataInitializer** (or initialization logic in Login/AuthContext) ensures the app is always bootstrapped with default data.
- **No backend/API**: All data is client-side for simplicity and demo purposes.
- **Tailwind CSS** (if used) for rapid and responsive UI styling.

---

## Known Issues / Limitations

- **No real backend**: All data is lost if localStorage is cleared.
- **No password hashing**: Plain text passwords for demo only.
- **No advanced validation**: Minimal form validation.
- **No file upload**: Incident files are mock entries only.
- **No pagination**: All patients/incidents are shown in a single list/table.
- **No user registration**: Only default users can log in.

---

## Contacts

- **Author:** Jatin Vishwakarma
- **Contact:** [jatinvish1307@gmail.com]

---
