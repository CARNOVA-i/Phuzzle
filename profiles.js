// profiles.js
// Phuzzle Local Profiles v1 (localStorage only, no backend)

const PHUZZLE_PROFILES_KEY = "phuzzle_profiles_v1";

// Keep IDs short but collision-resistant for local use
function makeId() {
  return "p_" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

function safeParse(json) {
  try { return JSON.parse(json); } catch { return null; }
}

function nowMs() {
  return Date.now();
}

function defaultIndex() {
  const id = makeId();
  return {
    activeId: id,
    profiles: [
      { id, name: "Player 1", createdAt: nowMs(), lastPlayedAt: nowMs() }
    ]
  };
}

function loadIndex() {
  const raw = localStorage.getItem(PHUZZLE_PROFILES_KEY);
  const parsed = raw ? safeParse(raw) : null;
  if (!parsed || typeof parsed !== "object") return null;
  if (!Array.isArray(parsed.profiles)) parsed.profiles = [];
  return parsed;
}

function saveIndex(idx) {
  localStorage.setItem(PHUZZLE_PROFILES_KEY, JSON.stringify(idx));
}

function ensureActive(idx) {
  if (!idx.profiles.length) {
    const fresh = defaultIndex();
    idx.activeId = fresh.activeId;
    idx.profiles = fresh.profiles;
    return;
  }
  const has = idx.profiles.some(p => p.id === idx.activeId);
  if (!has) idx.activeId = idx.profiles[0].id;
}

// Public: scoped key helper
export function profilesScopedKey(baseKey, profileId) {
  const id = profileId || profilesGetActiveId();
  return `${baseKey}__${id}`;
}

export function profilesGetAll() {
  const idx = loadIndex();
  return idx?.profiles ? idx.profiles.slice() : [];
}

export function profilesGetActiveId() {
  const idx = loadIndex();
  if (!idx) return null;
  ensureActive(idx);
  return idx.activeId;
}

export function profilesGetActive() {
  const idx = loadIndex();
  if (!idx) return null;
  ensureActive(idx);
  return idx.profiles.find(p => p.id === idx.activeId) || null;
}

export function profilesSetActive(id) {
  const idx = loadIndex() || defaultIndex();
  const p = idx.profiles.find(x => x.id === id);
  if (!p) return profilesGetActive();
  idx.activeId = id;
  p.lastPlayedAt = nowMs();
  saveIndex(idx);
  return p;
}

export function profilesCreate(name) {
  const idx = loadIndex() || defaultIndex();
  const clean = String(name || "").trim() || `Player ${idx.profiles.length + 1}`;
  const id = makeId();
  const p = { id, name: clean, createdAt: nowMs(), lastPlayedAt: nowMs() };
  idx.profiles.push(p);
  idx.activeId = id;
  saveIndex(idx);
  return p;
}

export function profilesRename(id, name) {
  const idx = loadIndex();
  if (!idx) return null;
  const p = idx.profiles.find(x => x.id === id);
  if (!p) return null;
  const clean = String(name || "").trim();
  if (!clean) return p;
  p.name = clean;
  saveIndex(idx);
  return p;
}

export function profilesDelete(id) {
  const idx = loadIndex();
  if (!idx) return null;
  idx.profiles = idx.profiles.filter(p => p.id !== id);
  ensureActive(idx);
  saveIndex(idx);
  return idx;
}

// Init with optional one-time migration from legacy global stats key
// Example:
// profilesInit({ migrateLegacyStatsKey: "phuzzle_stats_v1", defaultName: "Carson" })
export function profilesInit(opts = {}) {
  let idx = loadIndex();

  // First-time setup
  if (!idx) {
    idx = defaultIndex();
    if (opts.defaultName) idx.profiles[0].name = String(opts.defaultName).trim() || idx.profiles[0].name;
    saveIndex(idx);
  }

  ensureActive(idx);
  saveIndex(idx);

  // One-time stats migration: move legacy global stats into the default active profile
  const legacyKey = opts.migrateLegacyStatsKey;
  if (legacyKey) {
    const legacy = localStorage.getItem(legacyKey);
    const migratedFlag = `${legacyKey}__migrated_v1`;
    const already = localStorage.getItem(migratedFlag);

    if (legacy && !already) {
      const scoped = profilesScopedKey(legacyKey, idx.activeId);
      // Only copy if profile-scoped stats don't exist yet
      if (!localStorage.getItem(scoped)) {
        localStorage.setItem(scoped, legacy);
      }
      // Keep legacy as a safety net for one version; mark migrated
      localStorage.setItem(migratedFlag, "1");
    }
  }

  return profilesGetActive();
}