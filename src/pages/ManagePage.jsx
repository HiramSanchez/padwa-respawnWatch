export default function ManagePage({ catalog, state, setState }) {
  // rows: 1 for mob
  const rows = catalog
    .map((mob) => ({
      mobId: mob.mobId,
      name: mob.name,
      type: mob.type,
      enabled: state.enabled[mob.mobId] ?? true, // default ON
    }))
    .sort((a, b) => (a.name + a.type).localeCompare(b.name + b.type));

  function setAll(value) {
    const enabled = { ...state.enabled };
    for (const r of rows) enabled[r.mobId] = value;
    setState((prev) => ({ ...prev, enabled }));
  }

  function toggleMob(mobId) {
    setState((prev) => ({
      ...prev,
      enabled: {
        ...prev.enabled,
        [mobId]: !(prev.enabled[mobId] ?? true),
      },
    }));
  }

  return (
    <div style={{ padding: 12 }}>
      <div className="row space" style={{ marginBottom: 12 }}>
        <div className="muted small">
          Turn mobs ON/OFF to control what appears in MVP/MiniBoss.
        </div>
        <div className="row">
          <button className="btn" onClick={() => setAll(false)}>
            Disable all
          </button>
          <button className="btn primary" onClick={() => setAll(true)}>
            Enable all
          </button>
        </div>
      </div>

      <div className="list">
        {rows.map((r) => (
          <div key={r.mobId} className="card">
            <div className="row space">
              <div>
                <div className="h1">{r.name}</div>
                <div className="h2">{r.type.toUpperCase()}</div>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={r.enabled}
                  onChange={() => toggleMob(r.mobId)}
                />
                <span className="badge">{r.enabled ? "ON" : "OFF"}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
