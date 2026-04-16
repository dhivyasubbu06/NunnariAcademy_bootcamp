import React, { useState } from "react";
import "./App.css";

// Component
function StudentCard({ name, course, status }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p><strong>Course:</strong> {course}</p>
      <p className={`status ${status.toLowerCase()}`}>{status}</p>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("Active"); // new state
  const [students, setStudents] = useState([]);

  const handleSubmit = () => {
    if (!name || !course) return;

    const newStudent = { name, course, status };

    setStudents([...students, newStudent]);

    console.log(newStudent);

    // reset
    setName("");
    setCourse("");
    setStatus("Active");
  };

  return (
    <div className="main">
      <div className="box">
        <h1>🎓 Student Form</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        {/* ✅ Status Dropdown */}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button onClick={handleSubmit}>Add Student</button>

        {/* Cards */}
        <div className="card-container">
          {students.map((student, index) => (
            <StudentCard
              key={index}
              name={student.name}
              course={student.course}
              status={student.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;