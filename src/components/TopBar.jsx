import logoIcon from "../assets/icons/duration.svg";

export default function TopBar({ right }) {
  return (
    <div
      style={{
        padding: 12,
        borderBottom: "1px solid var(--border)",
      }}
    >

      {/* Row: tabs */}
      <div className="row space" style={{ marginTop: 6 }}>
        <div className="row" style={{ paddingLeft: 2 }}>
          <div className="row2">
            <div>
              <img alt="logo" className="iconBtn badge" src={logoIcon} />
            </div>
            <div className="badge" style={{ color: "var(--text)" }}>
              Respawn Watch
            </div>
            <div />
          </div>
        </div>
        <div className="row" style={{ gap: 8, paddingRight: 4 }}>
          {right}
        </div>
      </div>
    </div>
  );
}
