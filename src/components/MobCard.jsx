import { formatHMS, msUntilReady, msUntilRealReady } from "../lib/time";

export default function MobCard({ item, onKill, compact }) {
  const { mob, map, lastKillAt } = item;
  const msMin = msUntilReady(lastKillAt, map.respawnMinMinutes);
  const msMax = msUntilRealReady(lastKillAt, map.respawnMaxMinutes);
  const cooldown = msMax > 0;
  const window = msMin <= 0 && msMax > 0;
  const confirmed = msMax <= 0;

  const statusClass = confirmed ? "ready" : window ? "window" : "";
  const statusText = confirmed ? "READY" : window ? "POSSIBLE" : "Respawns in";
  const timerText = cooldown ? formatHMS(msMax) : "00:00:00";

  const weakness = (mob.weakness ?? "na").toString().trim().toLowerCase();
  const weaknessClass = `weak-${weakness.replace(/\s+/g, "-")}`;


  return (
    <div className={`card ${statusClass} ${compact ? "compact" : ""}`}>
      <div className="row space">
        <div className="row" style={{ gap: 10 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "#101010",
              border: "1px solid var(--border)",
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
            }}
            title={mob.imgTag}
          >
            {/* If not img, works as placeholder */}
            <img
              src={`/mobs/${mob.imgTag}.gif`}
              alt={mob.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                // fallback: if no gif, show letters
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML = `<span class="muted small">${(
                  mob.imgTag || ""
                )
                  .slice(0, 2)
                  .toUpperCase()}</span>`;
              }}
            />
          </div>

          <div>
            <p className="h1">{mob.name}</p>
            <p className="h2">
              Map: <span style={{ color: "var(--text)" }}>{map.mapName}</span>
              {"  "}•{"  "}
              Weakness:{" "}
              <span className={`weakness ${weaknessClass}`}>
                {mob.weakness ?? "N/A"}
              </span>
            </p>
          </div>
        </div>

        <div className="badge">{mob.type.toUpperCase()}</div>
      </div>

      <div className="hr" />

      <div className="row space">
        <div style={{ minWidth: 0 }}>
          {compact ? (
            <div className="small muted compactLine" style={{ marginTop: 2 }}>
              {mob.drops?.length ? mob.drops.join(", ") : ""}
              {mob.drops?.length ? " • " : ""}
              {map.route}
            </div>
          ) : (
            <>
              <div className="small muted">Drops</div>
              <div className="small" style={{ marginTop: 2 }}>
                {mob.drops.join(", ")}
              </div>

              <div className="small muted" style={{ marginTop: 8 }}>
                Route
              </div>
              <div className="small" style={{ marginTop: 2 }}>
                {map.route}
              </div>
            </>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="small muted">
            {compact ? "" : statusText}
          </div>
          <div className="timer" style={{ marginTop: 2 }}>
            {compact ? "" : timerText}
          </div>
          <button
            className="btn primary"
            style={{ marginTop: 10 }}
            onClick={onKill}
          >
            Defeated
          </button>
        </div>
      </div>

      {!compact && lastKillAt && (
        <div className="small muted" style={{ marginTop: 10 }}>
          Last kill: {new Date(lastKillAt).toLocaleString()}
        </div>
      )}
    </div>
  );
}
