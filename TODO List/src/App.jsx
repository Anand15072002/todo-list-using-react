import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Add or Update Task
  const handleSave = () => {
    if (newTask.trim() === "") return;

    if (editingId) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, text: newTask } : task
        )
      );
      setEditingId(null);
    } else {
      // Add new task
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    }

    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setNewTask(text); // put task text into input field
  };

  return (
    <div className="app">
      <h1>✨ Todo App</h1>

      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <button className="add-btn" onClick={handleSave}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <div className="tasks-section">
        <h2>📌 Tasks to do - {tasks.filter((t) => !t.done).length}</h2>
        <ul>
          {tasks.filter((t) => !t.done).length === 0 && (
            <p>Enter a Task!</p>
          )}

          {tasks
            .filter((t) => !t.done)
            .map((task) => (
              <li key={task.id}>
                <div className="task-row">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.text}</span>
                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(task.id, task.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="tasks-section">
        <h2>✅ Done - {tasks.filter((t) => t.done).length}</h2>
        <ul>
          {tasks
            .filter((t) => t.done)
            .map((task) => (
              <li key={task.id} className="done">
                <div className="task-row">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.text}</span>
                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(task.id, task.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
