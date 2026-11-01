import { useState } from "react";

const roles = [
  "🔮 Predictor",
  "❓ Questioner",
  "🔍 Clarifier",
  "📝 Summarizer",
];

const problems = [
  "Solve: 3x + 7 = 19",
  "Solve: 2(x - 3) = 10",
  "What is 3/4 + 1/8?",
  "A shirt costs $18 and is on sale for 25% off.",
];

const rolePrompts = {
  "🔮 Predictor":
    "What strategy do you think will help solve this problem?",
  "❓ Questioner":
    "What questions do you have about this problem?",
  "🔍 Clarifier":
    "What part of the problem needs clarification?",
  "📝 Summarizer":
    "Summarize how the group solved the problem.",
};

export default function App() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [problemIndex, setProblemIndex] = useState(0);

  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");

  const [scores, setScores] = useState({});
  const [currentStudent, setCurrentStudent] =
    useState("");
  const [studentScores, setStudentScores] =
  useState({});
  

  function addStudent() {
    if (!studentName.trim()) return;

    setStudents([...students, studentName]);
    setStudentName("");
  }

  function assignRoles() {

  const assigned = students.map((student, index) => ({
    name: student,
    role: roles[index % roles.length],
  }));

  setAssignments(assigned);
}

  function rotateRoles() {
    const rotated = assignments.map((assignment) => {
      const currentRoleIndex = roles.indexOf(
        assignment.role
      );

      return {
        ...assignment,
        role:
          roles[
            (currentRoleIndex + 1) %
            roles.length
          ],
      };
    });

    setAssignments(rotated);
  }

  function nextProblem() {
    setProblemIndex((current) =>
      (current + 1) % problems.length
    );
  }

  function giveFeedback() {
    setScores((prev) => ({
      ...prev,
      responses: (prev.responses || 0) + 1,
    }));
    if (currentStudent.trim()) {
  setStudentScores((prev) => ({
    ...prev,
    [currentStudent]:
      (prev[currentStudent] || 0) + 1,
  }));
}

    if (response.length < 15) {
      setFeedback(
        "⚠️ Try explaining your thinking in more detail."
      );
    } else if (
      response.toLowerCase().includes("because")
    ) {
      setFeedback(
        "✅ Great reasoning! You explained why you chose your approach."
      );
    } else {
      setFeedback(
        "👍 Good start. Can you explain why your strategy works?"
      );
    }
  }
const buttonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
  marginTop: "10px",
};

  return (
    <div
  style={{
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "auto",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  }}
>
    
      <h1
  style={{
    color: "#2563eb",
    textAlign: "center",
    marginBottom: "10px",
  }}
>
  Reciprocal Teaching Math Coach
</h1>

<p
  style={{
    textAlign: "center",
    color: "#64748b",
  }}
>
  Collaborative Math Discussions Made Easy
</p>

      <h2>Add Students</h2>

      <input
        value={studentName}
        onChange={(e) =>
          setStudentName(e.target.value)
        }
        placeholder="Enter student name"
      />

      <button
  onClick={addStudent}
  style={buttonStyle}
>
        Add Student
      </button>

      <h2>Group Roster</h2>

      <ul>
        {students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>

      <button
  onClick={assignRoles}
  style={buttonStyle}
>
        Assign Roles
      </button>

      <button
  onClick={rotateRoles}
  style={buttonStyle}
>
        Rotate Roles
      </button>

      <button
  onClick={nextProblem}
  style={buttonStyle}
>
        Next Problem
      </button>
      <p>Student Count: {students.length}</p>

      <h2>Math Problem</h2>

      <div
  style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  }}
>
        {problems[problemIndex]}
      </div>

      <h2>Student Response</h2>

      <input
        value={currentStudent}
        onChange={(e) =>
          setCurrentStudent(e.target.value)
        }
        placeholder="Student responding"
      />

      <br />
      <br />

      <textarea
        rows="5"
        cols="50"
        value={response}
        onChange={(e) =>
          setResponse(e.target.value)
        }
        placeholder="Explain your thinking..."
      />

      <br />
      <br />

      <button
  onClick={giveFeedback}
  style={buttonStyle}
>
        Get Feedback
      </button>

      <p>{feedback}</p>



      <p>Assignments Count: {assignments.length}</p>

  <h2>Role Assignments</h2>

<div
  style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  }}
>
  <p>Assignments Count: {assignments.length}</p>

  {assignments.length === 0 && (
    <p>No roles assigned yet.</p>
  )}

  {assignments.map((assignment, index) => (
    <div key={index}>
      <strong>{assignment.name}</strong>
      {" → "}
      {assignment.role}

      <br />

      <em>
        {rolePrompts[assignment.role]}
      </em>

      <br />
      <hr />
    </div>
  ))}
</div>  


      <h2
  style={{
    color: "#2563eb",
  }}
>
  Teacher Dashboard
</h2>

      <div
  style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginTop: "20px",
  }}
>
        <p>
          Total Responses:{" "}
          {scores.responses || 0}
        </p>

        <p>
          Students: {students.length}
        </p>

        <p>
          Current Problem:{" "}
          {problemIndex + 1}
        </p>

        <p>
          Last Responding Student:{" "}
          {currentStudent || "None"}
        </p>
        <h3>🏆 Participation Leaderboard</h3>

<ul>
  {Object.entries(studentScores)
    .sort((a, b) => b[1] - a[1])
    .map(([student, count]) => (
      <li key={student}>
        {student}: {count} responses
      </li>
    ))}
</ul>
      </div>
    </div>
  );
}