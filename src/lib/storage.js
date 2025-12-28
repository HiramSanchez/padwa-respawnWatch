const KEY = "respawn_watch_state_v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { enabled: {}, kills: {} };
    const parsed = JSON.parse(raw);
    return {
      enabled: parsed.enabled ?? {},
      kills: parsed.kills ?? {}
    };
  } catch {
    return { enabled: {}, kills: {} };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
