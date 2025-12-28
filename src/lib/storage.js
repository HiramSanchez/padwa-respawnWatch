const KEY = "respawn_watch_state_v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { enabled: {}, kills: {}, ui: { compact: false } };
    const parsed = JSON.parse(raw);
    return {
      enabled: parsed.enabled ?? {},
      kills: parsed.kills ?? {},
      ui: {
        compact: parsed.ui?.compact ?? false
      }
    };
  } catch {
    return { enabled: {}, kills: {}, ui: { compact: false } };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
