import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <h1>Anonymous Feedback Box</h1>
      <p className="home-tagline">
        Share your ideas anonymously. React with emojis. Track what gets done.
      </p>

      <div className="home-cards">
        <Link className="home-card" to="/feedback">
          <span className="home-emoji">📝</span>
          <h3>Give Feedback</h3>
          <p>Submit a suggestion without revealing who you are.</p>
        </Link>

        <Link className="home-card" to="/board">
          <span className="home-emoji">📋</span>
          <h3>Feedback Board</h3>
          <p>See what everyone is saying and react with emojis.</p>
        </Link>

        <Link className="home-card" to="/tasks">
          <span className="home-emoji">✅</span>
          <h3>Task Tracker</h3>
          <p>Turn suggestions into trackable tasks.</p>
        </Link>
      </div>
    </main>
  );
}

export default Home;