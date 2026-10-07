const EMOJIS = [
  { key: "likes", emoji: "👍" },
  { key: "loves", emoji: "❤️" },
  { key: "ideas", emoji: "💡" },
  { key: "claps", emoji: "👏" },
];

function FeedbackCard({ item, onReact }) {
  return (
    <article className="feedback-card">
      <span className="feedback-category">{item.category}</span>

      <p className="feedback-message">{item.message}</p>

      <div className="reaction-row">
        {EMOJIS.map(({ key, emoji }) => (
          <button
            key={key}
            className="reaction-btn"
            onClick={() => onReact(item, key)}
            title={`React with ${emoji}`}
          >
            <span>{emoji}</span>
            <span>{item[key] || 0}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

export default FeedbackCard;