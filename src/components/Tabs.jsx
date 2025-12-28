export default function Tabs({ active, onChange }) {
  const Tab = ({ id, label }) => (
    <button
      className="btn"
      onClick={() => onChange(id)}
      style={{
        background: active === id ? "#242424" : "#202020",
        borderColor: active === id ? "#3a3a3a" : "var(--border)"
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
