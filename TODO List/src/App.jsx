import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
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
    setEditingText(text);
  };

  const saveEdit = (id) => {
    if (editingText.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
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
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <div className="tasks-section">
        <h2>📌 Tasks to do - {tasks.filter((t) => !t.done).length}</h2>
        <ul>
          {tasks
            .filter((t) => !t.done)
            .map((task) => (
              <li key={task.id}>
                {editingId === task.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                    />
                    <button className="save-btn" onClick={() => saveEdit(task.id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="task-row">
                    <span onClick={() => toggleTask(task.id)}>{task.text}</span>
                    <div className="actions">
                      <button className="edit-btn" onClick={() => startEditing(task.id, task.text)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  </div>
                )}
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
                {editingId === task.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                    />
                    <button className="save-btn" onClick={() => saveEdit(task.id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="task-row">
                    <span onClick={() => toggleTask(task.id)}>{task.text}</span>
                    <div className="actions">
                      <button className="edit-btn" onClick={() => startEditing(task.id, task.text)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
