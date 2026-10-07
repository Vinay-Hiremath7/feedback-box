import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import FeedbackCard from "../components/FeedbackCard";

function Board() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadFeedback() {
    setLoading(true);

    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Failed to load feedback");
      setLoading(false);
      return;
    }

    setFeedback(data);
    setLoading(false);
  }

  // runs once when the page opens
  useEffect(() => {
    loadFeedback();
  }, []);

  async function handleReact(item, field) {
    const newValue = (item[field] || 0) + 1;

    // 1. Update the screen immediately (feels instant)
    setFeedback((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, [field]: newValue } : f))
    );

    // 2. Save it to the database
    const { error } = await supabase
      .from("feedback")
      .update({ [field]: newValue })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert("Could not save your reaction");
      loadFeedback(); // roll back to the truth from the DB
    }
  }

  return (
    <main className="board-page">
      <h1>Feedback Board</h1>

      <button className="refresh-btn" onClick={loadFeedback}>
        ⟳ Refresh
      </button>

      {loading && <p>Loading feedback...</p>}

      {!loading && feedback.length === 0 && (
        <p className="empty-msg">No feedback yet. Be the first to post!</p>
      )}

      <div className="feedback-grid">
        {feedback.map((item) => (
          <FeedbackCard key={item.id} item={item} onReact={handleReact} />
        ))}
      </div>
    </main>
  );
}

export default Board;