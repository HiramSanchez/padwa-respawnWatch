export function nowIso() {
  return new Date().toISOString();
}

export function msUntilReady(lastKillAtIso, respawnMinMinutes) {
  if (!lastKillAtIso) return 0; // If never killed -> READY
  const last = new Date(lastKillAtIso).getTime();
  const readyAt = last + respawnMinMinutes * 60 * 1000;
  return readyAt - Date.now();
}

export function formatHMS(ms) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
