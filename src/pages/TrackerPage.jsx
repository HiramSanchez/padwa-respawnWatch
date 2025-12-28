import MobCard from "../components/MobCard";
import { spawnKey } from "../lib/spawnKey";
import { nowIso, msUntilReady } from "../lib/time";

export default function TrackerPage({ catalog, state, setState, type }) {
  // "cards" (mob + map)
  const all = [];
  for (const mob of catalog) {
    if (mob.type !== type) continue;
    for (const map of mob.maps) {
      const key = spawnKey(mob.mobId, map.mapName);
      const enabledMob = state.enabled[mob.mobId] ?? true; // default ON
      if (!enabledMob) continue;


      const lastKillAt = state.kills[key]?.lastKillAt ?? null;

      all.push({
        key,
        mob,
        map,
        lastKillAt,
        ms: msUntilReady(lastKillAt, map.respawnMinMinutes)
      });
    }
  }

  // order: READY up, then by time
  all.sort((a, b) => a.ms - b.ms);

  const ready = all.filter(x => x.ms <= 0);
  const cooldown = all.filter(x => x.ms > 0);

  function markKilled(itemKey, labelForUser) {
    const alreadyHadKill = Boolean(state.kills[itemKey]?.lastKillAt);

    if (alreadyHadKill) {
      const ok = window.confirm(`Confirm kill?\n${labelForUser}\nThis will reset the timer.`);
      if (!ok) return;
    }

    setState((prev) => ({
      ...prev,
      kills: {
        ...prev.kills,
        [itemKey]: { lastKillAt: nowIso() }
      }
    }));
  }

  return (
    <div style={{ padding: 12 }}>
      <p className="sectionTitle">READY ({ready.length})</p>
      <div className="list">
        {ready.map(item => (
          <MobCard
            key={item.key}
            item={item}
            onKill={() => markKilled(item.key,`${item.mob.name} — ${item.map.mapName}`)}
          />
        ))}
        {ready.length === 0 && (
          <div className="muted small">No spawns ready right now.</div>
        )}
      </div>

      <p className="sectionTitle">COOLDOWN ({cooldown.length})</p>
      <div className="list">
        {cooldown.map(item => (
          <MobCard
            key={item.key}
            item={item}
            onKill={() => markKilled(item.key,`${item.mob.name} — ${item.map.mapName}`)}
          />
        ))}
        {cooldown.length === 0 && (
          <div className="muted small">Nothing on cooldown.</div>
        )}
      </div>
    </div>
  );
}
