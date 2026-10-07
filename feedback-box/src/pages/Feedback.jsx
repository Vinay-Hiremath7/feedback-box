import { useState } from "react";
import { supabase } from "../supabase";

function Feedback() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim() || !category) {
      alert("Please select a category and write your suggestion.");
      return;
    }

    const { error } = await supabase
      .from("feedback")
      .insert([{ message: message.trim(), category: category }]);

    if (error) {
      console.error(error);
      alert("Could not submit feedback. Please try again.");
      return;
    }

    setMessage("");
    setCategory("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <main className="feedback-page">
      <h1>Give Anonymous Feedback</h1>
      <p className="page-note">
        🔒 Your name is never collected. Nothing is linked back to you.
      </p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Select a category --</option>
          <option value="Workplace">Workplace</option>
          <option value="Process">Process</option>
          <option value="Tools">Tools</option>
          <option value="Culture">Culture</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="message">Your Suggestion</label>
        <textarea
          id="message"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your idea or suggestion here..."
        />

        <button type="submit">Submit Anonymously</button>
      </form>

      {submitted && (
        <p className="success-msg">✅ Thanks! Your feedback was posted.</p>
      )}
    </main>
  );
}

export default Feedback;