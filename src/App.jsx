import { useEffect, useMemo, useState } from "react";
import TopBar from "./components/TopBar";
import Tabs from "./components/Tabs";
import TrackerPage from "./pages/TrackerPage";
import ManagePage from "./pages/ManagePage";
import { loadState, saveState } from "./lib/storage";

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

  const title = useMemo(() => {
    if (tab === "manage") return "Manage";
    return tab === "mvp" ? "MVP Tracker" : "MiniBoss Tracker";
  }, [tab]);

  return (
    <div className="container">
      <div className="panel">
        <TopBar
          title={title}
          right={<Tabs active={tab} onChange={setTab} />}
        />

        {tab === "manage" ? (
          <ManagePage catalog={catalog} state={state} setState={setState} />
        ) : (
          <TrackerPage
            catalog={catalog}
            state={state}
            setState={setState}
            type={tab} // "mvp" or "miniboss"
          />
        )}
      </div>
    </div>
  );
}
