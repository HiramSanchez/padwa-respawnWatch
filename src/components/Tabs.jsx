export default function Tabs({ active, onChange }) {
  const Tab = ({ id, label }) => (
    <button
      className="btn"
      onClick={() => onChange(id)}
      style={{
        background: active === id ? "var(--ready)" : "#202020",
        borderColor: active === id ? "var(--ready)"  : "var(--border)",
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="row" style={{ gap: 8 }}>
      <Tab id="mvp" label="MVP" />
      <Tab id="miniboss" label="MiniBoss" />
      <Tab id="settings" label="Settings" />
    </div>
  );
}
