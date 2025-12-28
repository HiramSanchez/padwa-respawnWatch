import { useMemo, useState } from "react";

export default function ManagePage({ catalog, state, setState }) {
  // filter: "all" | "mvp" | "miniboss"
  const [filter, setFilter] = useState("all");

  const rows = useMemo(() => {
    return catalog
      .map((mob) => ({
        mobId: mob.mobId,
        name: mob.name,
        type: mob.type, // "mvp" | "miniboss"
        enabled: state.enabled[mob.mobId] ?? true, // default ON
      }))
      .sort((a, b) => (a.name + a.type).localeCompare(b.name + b.type));
  }, [catalog, state.enabled]);

  const filteredRows = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((r) => r.type === filter);
  }, [rows, filter]);

  function setAll(value) {
    // aplica SOLO a los que estás viendo (filtrados)
    const enabled = { ...state.enabled };
    for (const r of filteredRows) enabled[r.mobId] = value;
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

  const FilterBtn = ({ id, label }) => (
    <button
      className="btn"
      onClick={() => setFilter(id)}
      style={{
        background: filter === id ? "#6D248C" : "#202020",
        borderColor: filter === id ? "#6D248C" : "var(--border)",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: 12 }}>
      <div className="row space" style={{ marginBottom: 12 }}>
        <div>
          <div className="muted small">
            Turn mobs ON/OFF to control what appears in MVP/MiniBoss.
          </div>

          <div className="row" style={{ marginTop: 10 }}>
            <FilterBtn id="all" label="All" />
            <FilterBtn id="mvp" label="MVP" />
            <FilterBtn id="miniboss" label="MiniBoss" />
          </div>
        </div>

        <div className="row">
          <button className="btn" onClick={() => setAll(false)}>
            Disable shown
          </button>
          <button className="btn primary" onClick={() => setAll(true)}>
            Enable shown
          </button>
        </div>
      </div>

      <div className="list">
        {filteredRows.map((r) => (
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

        {filteredRows.length === 0 && (
          <div className="muted small">No mobs match this filter.</div>
        )}
      </div>
    </div>
  );
}
