import { useEffect, useMemo, useState } from "react";
import TopBar from "./components/TopBar";
import Tabs from "./components/Tabs";
import TrackerPage from "./pages/TrackerPage";
import ManagePage from "./pages/ManagePage";
import { loadState, saveState } from "./lib/storage";
import plusIcon from "./assets/icons/plus.svg";
import minusIcon from "./assets/icons/minus.svg";

export default function App() {
  const [tab, setTab] = useState("mvp");
  const [catalog, setCatalog] = useState([]);
  const [state, setState] = useState(() => loadState());

  // load catalogue
  useEffect(() => {
    fetch("/data/catalog.json")
      .then(r => r.json())
      .then(setCatalog)
      .catch(() => setCatalog([]));
  }, []);

  // state autosave
  useEffect(() => {
    saveState(state);
  }, [state]);

  // tick for timers to update even without click
  const [, forceTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceTick(x => x + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="container">
      <div className="panel">
        <TopBar
          right={
            <div className="row" style={{ gap: 8 }}>
              <Tabs active={tab} onChange={setTab} />
              <button
                className="btn iconBtn"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    ui: { ...(prev.ui ?? {}), compact: !prev.ui?.compact },
                  }))
                }
                title={
                  state.ui?.compact ? "Compact mode: ON" : "Compact mode: OFF"
                }
              >
                <img
                  src={state.ui?.compact ? plusIcon : minusIcon}
                  alt={state.ui?.compact ? "Compact ON" : "Compact OFF"}
                />
              </button>
            </div>
          }
        />
        {tab === "settings" ? (
          <ManagePage catalog={catalog} state={state} setState={setState} />
        ) : (
          <TrackerPage
            catalog={catalog}
            state={state}
            setState={setState}
            type={tab} // "mvp" or "miniboss"
            compact={state.ui?.compact ?? false}
          />
        )}
      </div>
    </div>
  );
}
