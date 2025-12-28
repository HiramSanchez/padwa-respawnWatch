export default function Tabs({ active, onChange }) {
  const Tab = ({ id, label }) => (
    <button
      className="btn"
      onClick={() => onChange(id)}
      style={{
        background: active === id ? "#6D248C" : "#202020",
        borderColor: active === id ? "#6D248C"  : "var(--border)",
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="row" style={{ gap: 8 }}>
      <Tab id="mvp" label="MVP" />
      <Tab id="miniboss" label="MiniBoss" />
      <Tab id="manage" label="Manage" />
    </div>
  );
}
