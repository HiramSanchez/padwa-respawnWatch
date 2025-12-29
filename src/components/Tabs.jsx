import settingsIcon from "../assets/icons/settings-sliders.svg";

export default function Tabs({ active, onChange }) {
  const Tab = ({ id, label, icon }) => (
    <button
      className={`btn ${icon ? "iconBtn" : ""}`}
      onClick={() => onChange(id)}
      style={{
        background: active === id ? "var(--bReady)" : "#202020",
        borderColor: active === id ? "var(--bReady)" : "var(--border)",
      }}
      title={label}
    >
      {icon ? <img src={icon} alt={label} /> : label}
    </button>
  );

  return (
    <div className="row" style={{ gap: 8 }}>
      <Tab id="mvp" label="MVP" />
      <Tab id="miniboss" label="MiniBoss" />
      <Tab id="settings" label="Settings" icon={settingsIcon} />
    </div>
  );
}

