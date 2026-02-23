// stats.js
// Phuzzle Stats v1 (localStorage, no backend)

const PHUZZLE_STATS_KEY = "phuzzle_stats_v1";

const DEFAULT_STATS = {
  totalSolves: 0,
  totalMoves: 0,
  totalPlayTimeSec: 0,

  // Modifier system
  modSolves: 0,
  highestDifficultyMultiplier: 1,

  fastestSecBySize: {}, // e.g. { "3x3": 62, "4x4": 141 }
  bestMovesBySize: {}, // e.g. { "4x4": 32 }
  solvesBySize: {},     // e.g. { "3x3": 10, "4x4": 3 }

  streak: {
    current: 0,
    longest: 0,
    lastSolveDate: null // "YYYY-MM-DD"
  }
};

let activeRun = null; // transient state for current puzzle only (not saved until solve)

function safeParse(json) {
  try { return JSON.parse(json); } catch { return null; }
}

function deepMerge(base, incoming) {
  // Minimal merge that preserves new default fields while keeping stored values.
  const out = structuredClone(base);

  if (incoming && typeof incoming === "object") {
    for (const k of Object.keys(incoming)) {
      if (incoming[k] && typeof incoming[k] === "object" && !Array.isArray(incoming[k])) {
        out[k] = deepMerge(out[k] ?? {}, incoming[k]);
      } else {
        out[k] = incoming[k];
      }
    }
  }
  return out;
}

export function loadStats() {
  const raw = localStorage.getItem(PHUZZLE_STATS_KEY);
  const parsed = raw ? safeParse(raw) : null;
  return deepMerge(DEFAULT_STATS, parsed);
}

export function saveStats(stats) {
  localStorage.setItem(PHUZZLE_STATS_KEY, JSON.stringify(stats));
}

function todayLocalISO() {
  // Local date, stable for streaks without timezone headaches
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isYesterday(lastISO, todayISO) {
  if (!lastISO) return false;
  const [y1, m1, d1] = lastISO.split("-").map(Number);
  const [y2, m2, d2] = todayISO.split("-").map(Number);

  const a = new Date(y1, m1 - 1, d1);
  const b = new Date(y2, m2 - 1, d2);

  const diffDays = Math.round((b - a) / 86400000);
  return diffDays === 1;
}

export function statsBeginRun(meta) {
  // meta can include: sizeKey ("4x4"), collectionId, photoId
  activeRun = {
    startedAtMs: performance.now(),
    meta: meta ?? {}
  };
}

export function statsEndRunOnSolve({ sizeKey, moves, elapsedSec }) {
  // If caller doesn’t have elapsedSec, we compute from beginRun
  const stats = loadStats();

  const nowISO = todayLocalISO();
  const lastISO = stats.streak.lastSolveDate;

  // Update streak only once per day on first solve of that day
  if (lastISO !== nowISO) {
    if (!lastISO) {
      stats.streak.current = 1;
    } else if (isYesterday(lastISO, nowISO)) {
      stats.streak.current += 1;
    } else {
      stats.streak.current = 1;
    }
    stats.streak.longest = Math.max(stats.streak.longest, stats.streak.current);
    stats.streak.lastSolveDate = nowISO;
  }

  // Totals
  stats.totalSolves += 1;
  stats.totalMoves += Math.max(0, Number(moves) || 0);

  const sec =
    Number(elapsedSec) ||
    (activeRun ? Math.max(1, Math.round((performance.now() - activeRun.startedAtMs) / 1000)) : 0);

  stats.totalPlayTimeSec += Math.max(0, sec);

    // Modifiers (recorded from statsBeginRun meta)
  const mult = Number(activeRun?.meta?.difficultyMultiplier) || 1;
  if (mult > 1) stats.modSolves += 1;
  stats.highestDifficultyMultiplier = Math.max(
    Number(stats.highestDifficultyMultiplier) || 1,
    mult
  );

  // Per-size counters
  const key = String(sizeKey || "unknown");
  stats.solvesBySize[key] = (stats.solvesBySize[key] || 0) + 1;

  // Fastest time per size
  const prevBest = stats.fastestSecBySize[key];
  if (prevBest == null || sec < prevBest) {
    stats.fastestSecBySize[key] = sec;
  }

  // Best moves per size
  const moveCount = Math.max(0, Number(moves) || 0);
  const prevBestMoves = stats.bestMovesBySize[key];
  if (prevBestMoves == null || moveCount < prevBestMoves) {
    stats.bestMovesBySize[key] = moveCount;
  }

  saveStats(stats);
  activeRun = null;
  return stats;
}

export function statsResetAll() {
  localStorage.removeItem(PHUZZLE_STATS_KEY);
  activeRun = null;
}

export function statsGetSnapshot() {
  return loadStats();
}