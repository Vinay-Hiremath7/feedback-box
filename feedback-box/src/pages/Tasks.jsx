import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const STATUSES = ["Pending", "In Progress", "Done"];

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [priority, setPriority] = useState("Medium");

  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Failed to load tasks");
      return;
    }
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();

    if (!title.trim() || !owner.trim()) {
      alert("Please fill in both the task and the owner.");
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        title: title.trim(),
        owner: owner.trim(),
        priority: priority,
        status: "Pending",
      },
    ]);

    if (error) {
      console.error(error);
      alert("Could not add task");
      return;
    }

    setTitle("");
    setOwner("");
    setPriority("Medium");
    loadTasks();
  }

  async function updateStatus(task, newStatus) {
    // optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );

    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", task.id);

    if (error) {
      console.error(error);
      alert("Could not update status");
      loadTasks();
    }
  }

  async function deleteTask(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Could not delete task");
      return;
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const doneCount = tasks.filter((t) => t.status === "Done").length;
  const progress = tasks.length
    ? Math.round((doneCount / tasks.length) * 100)
    : 0;

  return (
    <main className="tasks-page">
      <h1>Productivity &amp; Task Tracker</h1>

      <div className="progress-box">
        <p>
          <strong>{doneCount}</strong> of <strong>{tasks.length}</strong> tasks
          completed
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-text">{progress}% done</p>
      </div>

      <form className="task-form" onSubmit={addTask}>
        <label htmlFor="title">Task</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Install a new coffee machine"
        />

        <label htmlFor="owner">Owner</label>
        <input
          id="owner"
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="e.g. Facilities Team"
        />

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 && <p className="empty-msg">No tasks yet.</p>}

        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.status.replace(" ", "-").toLowerCase()}`}
          >
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>
                👤 {task.owner} &nbsp;|&nbsp; ⚡ {task.priority}
              </p>
            </div>

            <div className="task-actions">
              <select
                value={task.status}
                onChange={(e) => updateStatus(task, e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
                title="Delete task"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Tasks;