import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Form state
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // Student list (Exercise 1 + 2 + 3)
  const [students, setStudents] = useState([
    { id: 1, name: "Arun", course: "React" },
    { id: 2, name: "Kavi", course: "Node" },
    { id: 3, name: "Ravi", course: "Java" },
  ]);

  // API data (Exercise 4)
  const [users, setUsers] = useState([]);

  // Fetch API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Add student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !course) return;

    const newStudent = {
      id: students.length + 1,
      name,
      course
    };

    setStudents([...students, newStudent]);

    setName("");
    setCourse("");
  };

  return (
    <div className="main">
      <div className="box">

        <h1>🎓 Day 2 Student App</h1>

        {/* Form */}
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Add Student</button>
        </form>

        {/* Student List */}
        <h3>Student List</h3>
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              {s.name} - {s.course}
            </li>
          ))}
        </ul>

        {/* API List */}
        <h3>Fetched Users</h3>
        <ul>
          {users.slice(0, 5).map((u) => (
            <li key={u.id}>
              {u.name}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;