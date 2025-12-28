export default function TopBar({ title, right }) {
  return (
    <div
      style={{
        padding: 12,
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Row 1: App name */}
      <div className="row space">
        <div className="badge" 
             style={{ color: "#ffffff" }}>Respawn Watch</div>
        <div />
      </div>

      {/* Row 2: Section title + tabs */}
      <div className="row space" style={{ marginTop: 6 }}>
        <div className="muted small" style={{ paddingLeft: 12 }}>{title}</div>
        <div className="row" style={{ gap: 8, paddingRight: 12  }}>
          {right}
        </div>
      </div>
    </div>
  );
}
