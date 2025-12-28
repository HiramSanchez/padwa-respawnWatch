export default function TopBar({ title, right }) {
  return (
    <div style={{ padding: 12, borderBottom: "1px solid var(--border)" }} className="row space">
      <div className="row" style={{ gap: 10 }}>
        <div className="badge">Respawn Watch</div>
        <div className="muted small">{title}</div>
      </div>
      <div className="row" style={{ gap: 8 }}>
        {right}
      </div>
    </div>
  );
}
