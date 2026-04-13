import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://127.0.0.1:5000/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task) return;
    await axios.post("http://127.0.0.1:5000/todos", { task });
    setTask("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/todos/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await axios.put(`http://127.0.0.1:5000/todos/toggle/${id}`);
    fetchTodos();
  };

  const stats = {
    total: todos.length,
    done: todos.filter(t => t.done).length,
    pending: todos.filter(t => !t.done).length
  };

  return (
    <div className="app">

      <div className="card">

        <h1>🌸 PinkNotes</h1>

        <p className="slogan">
          “Soft mind, organized life ✨”
        </p>

        {/* INPUT */}
        <div className="inputBox">

          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Write your cute task..."
          />

          <button onClick={addTodo}>Add</button>

        </div>

        {/* STATS */}
        <div className="stats">
          <div>Total 💕 {stats.total}</div>
          <div>Done 💚 {stats.done}</div>
          <div>Pending 💭 {stats.pending}</div>
        </div>

        {/* LIST */}
        <ul>
          {todos.map((t) => (
            <li key={t.id} className="item">

              <span
                onClick={() => toggleTodo(t.id)}
                className={t.done ? "done" : ""}
              >
                {t.task}
              </span>

              <button className="delete"
                onClick={() => deleteTodo(t.id)}>
                ✨
              </button>

            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default App;