



let currentCollection = "all";

const COLLECTIONS = {

  nature: [
    { src: "assets/images/nature/carson_01.jpg", label: "Alpine dawn" },
    { src: "assets/images/nature/carson_02.jpg", label: "Winter halo" },
    { src: "assets/images/nature/carson_03.jpg", label: "Dock remnant" },
    { src: "assets/images/nature/carson_04.jpg", label: "Yamnuska edge" },
    { src: "assets/images/nature/carson_08.jpg", label: "Foggy drive" },
    { src: "assets/images/nature/carson_09.jpg", label: "Mexican sunrise" },
    { src: "assets/images/nature/carson_10.jpg", label: "Forgotten rail" },
    { src: "assets/images/nature/carson_12.jpg", label: "Sentinel leaf" },
    { src: "assets/images/nature/carson_13.jpg", label: "Wise tree" },
    { src: "assets/images/nature/carson_14.jpg", label: "Standout leaf" },
    { src: "assets/images/nature/grace_08.jpg", label: "Cornfield" },
    { src: "assets/images/nature/carson_N1.jpg", label: "Frozen leaf" },
    { src: "assets/images/nature/carson_N2.jpg", label: "Crimson and gold" },
    { src: "assets/images/nature/carson_N3.jpg", label: "Summer blooms" },
    { src: "assets/images/nature/carson_N4.jpg", label: "Road leaf" },
    { src: "assets/images/nature/carson_N5.jpg", label: "Frozen mountains" },
    { src: "assets/images/nature/carson_N6.jpg", label: "Misty highway" },
    { src: "assets/images/nature/carson_N7.jpg", label: "West coast sunset" },
    { src: "assets/images/nature/carson_N8.jpg", label: "Timeless swing" },
    { src: "assets/images/nature/carson_N9.jpg", label: "Nature, declared" },
    { src: "assets/images/nature/carson_N10.jpg", label: "Lone mushroom" }
  ],

  buildings: [
    { src: "assets/images/buildings/carson_07.jpg", label: "Notre-Dame" },
    { src: "assets/images/buildings/carson_11.jpg", label: "Lighthouse" },
    { src: "assets/images/buildings/carson_B1.jpg", label: "Moroccan temple" },
    { src: "assets/images/buildings/carson_B2.jpg", label: "Lost Moroccan prince" },
    { src: "assets/images/buildings/carson_B3.jpg", label: "Mexican church" },
  ],

  detail: [
    { src: "assets/images/detail/grace_01.jpg", label: "Spring bee" },
    { src: "assets/images/detail/grace_03.jpg", label: "Summer flowers" },
    { src: "assets/images/detail/grace_04.jpg", label: "Dewdrop" },
    { src: "assets/images/detail/grace_05.jpg", label: "Moss" },
    { src: "assets/images/detail/grace_06.jpg", label: "Mushroom city" },
    { src: "assets/images/detail/grace_07.jpg", label: "Lone mushroom" },
    { src: "assets/images/detail/grace_09.jpg", label: "Dewdrop detail" },
    { src: "assets/images/detail/grace_10.jpg", label: "Moss dewdrop" }
  ],

  animals: [
    { src: "assets/images/animals/grace_02.jpg", label: "Wild turkey" },
    { src: "assets/images/animals/carson_A1.jpg", label: "Tropical macaw" },
    { src: "assets/images/animals/carson_A2.jpg", label: "Stranded jellyfish" }
  ],

  highvis: [
    { src: "assets/images/highvis/carson_HV1.jpg", label: "Five glowing rings" },
    { src: "assets/images/highvis/carson_HV2.jpg", label: "Yellow sun on blue" },
    { src: "assets/images/highvis/carson_HV3.jpg", label: "Rainbow target circle" },
    { src: "assets/images/highvis/carson_HV4.jpg", label: "Diagonal rainbow stripes" },
    { src: "assets/images/highvis/carson_HV5.jpg", label: "Four color squares" },
    { src: "assets/images/highvis/carson_HV6.jpg", label: "Two glowing circles" },
    { src: "assets/images/highvis/carson_HV7.jpg", label: "Neon heart" },
    { src: "assets/images/highvis/carson_HV8.jpg", label: "Neon planet with ring" },
    { src: "assets/images/highvis/carson_HV9.jpg", label: "Neon star" },
    { src: "assets/images/highvis/carson_HV10.jpg", label: "Rocketship" },
    { src: "assets/images/highvis/carson_HV11.jpg", label: "Car" },
    { src: "assets/images/highvis/carson_HV12.jpg", label: "Tree" },
    { src: "assets/images/highvis/carson_HV13.jpg", label: "Apple" },
    { src: "assets/images/highvis/carson_HV14.jpg", label: "Cute bear" },
    { src: "assets/images/highvis/carson_HV15.jpg", label: "Flower" },
    { src: "assets/images/highvis/nova_HV1.jpg", label: "Rocketship blueprint" },
    { src: "assets/images/highvis/nova_HV2.jpg", label: "Gear Blueprint" },
    { src: "assets/images/highvis/nova_HV3.jpg", label: "Car blueprint" },
    { src: "assets/images/highvis/nova_HV4.jpg", label: "Wrench blueprint" },
    { src: "assets/images/highvis/nova_HV5.jpg", label: "Lightbulb blueprint" },
    { src: "assets/images/highvis/nova_HV6.jpg", label: "Warm tea" },
    { src: "assets/images/highvis/nova_HV7.jpg", label: "Antique radio" },
    { src: "assets/images/highvis/nova_HV8.jpg", label: "Bicycle" },
    { src: "assets/images/highvis/nova_HV9.jpg", label: "Sewing machine" },
  ],


  ai: [
  { src: "assets/images/ai/nova_AI1.jpg", label: "Rupture" },
  { src: "assets/images/ai/nova_AI2.jpg", label: "Procession" },
  { src: "assets/images/ai/nova_AI3.jpg", label: "Fragment" },
  { src: "assets/images/ai/nova_AI4.jpg", label: "Inversion" },
  { src: "assets/images/ai/nova_AI5.jpg", label: "Awakening" },
  { src: "assets/images/ai/nova_AI6.jpg", label: "Threshold" },
],

};



  // auto-generate "all"
COLLECTIONS.all = Object.values(COLLECTIONS)
  .filter(Array.isArray)
  .flat();

function getActivePhotoList() {
  if (lowVisionMode && COLLECTIONS.highvis) {
    return COLLECTIONS.highvis;
  }

  return COLLECTIONS[currentCollection] || COLLECTIONS.all;
}


function currentImageSrc() {
  const list = getActivePhotoList();
  return list[photoIndex]?.src || "";
}



const DIFFICULTIES = {
  "3x3": { rows: 3, cols: 3 },
  "4x4": { rows: 4, cols: 4 },
  "5x5": { rows: 5, cols: 5 },
  "6x6": { rows: 6, cols: 6 }
};

const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");
const prevPhotoBtn = document.getElementById("prevPhotoBtn");
const nextPhotoBtn = document.getElementById("nextPhotoBtn");
const randomPhotoBtn = document.getElementById("randomPhotoBtn");
const difficultyBtn = document.getElementById("difficultyBtn");
const difficultyMenu = document.getElementById("difficultyMenu");
const shuffleBtn = document.getElementById("shuffleBtn");
const pauseBtn = document.getElementById("pauseBtn");
const movesLabel = document.getElementById("movesLabel");
const timerLabel = document.getElementById("timerLabel");
const bestLabel = document.getElementById("bestLabel");
const orbBtn = document.getElementById("orbBtn");
const orbMenu = document.getElementById("orbMenu");
const collectionBtn = document.getElementById("collectionBtn");
const collectionMenu = document.getElementById("collectionMenu");
const lvBtn = document.getElementById("lvBtn");
const toneBtn = document.getElementById("toneBtn");
const vibeBtn = document.getElementById("vibeBtn");
const speakBtn = document.getElementById("speakBtn");
const infoBtn = document.getElementById("infoBtn");
const howtoOverlay = document.getElementById("howtoOverlay");
const howtoGotItBtn = document.getElementById("howtoGotItBtn");
const howtoCloseBtn = document.getElementById("howtoCloseBtn");
const loadingOverlay = document.getElementById("loadingOverlay");




let previousCollection = null;

let lowVisionMode = false;
let toneEnabled = false;
let vibeEnabled = false;
let spokenTitlesEnabled = false;


let photoIndex = 0;
let rows = 4;
let cols = 4;
let board = [];
let tileWidth = 0;
let tileHeight = 0;
let image = new Image();
let imageLoaded = false;
let moves = 0;
let timerStarted = false;
let isPaused = false;
let solved = false;
let startTime = 0;
let elapsedMs = 0;
let timerHandle = null;
let confettiParticles = [];
let confettiActive = false;
let dpr = Math.max(1, window.devicePixelRatio || 1);
let currentImage = null; // { src, label }

const lockedTiles = new Set();


const LOADER_MIN_MS = 1200; // adjust this (milliseconds)
const boardWrap = document.querySelector(".board-wrap");




let clusterState = {
  rootByTileId: [],
  membersByRoot: new Map()
};

let solveAnim = {
  active: false,
  start: 0,
  durationMs: 1400
};

let solveRaf = 0;


const dragState = {
  pointerId: null,
  active: false,
  draggedTileId: -1,
  sourceAnchorIndex: -1,
  targetIndex: -1,
  clusterRoot: -1,
  memberTileIds: [],
  memberTileSet: new Set(),
  offsetsByTileId: new Map(),
  x: 0,
  y: 0
};


const DRAG_THRESHOLD_PX = 12; // try 8 to 14 (higher = less sensitive)
let pendingDrag = null;



let loadingStartTime = 0;



function showLoading(text1 = "Loading photo", text2 = "Shuffling tiles…"){
  if (!loadingOverlay) return;

  loaderShownAt = performance.now();

  const t = loadingOverlay.querySelector(".loading-title");
  const s = loadingOverlay.querySelector(".loading-sub");
  if (t) t.textContent = text1;
  if (s) s.textContent = text2;

  loadingOverlay.hidden = false;
  boardWrap?.classList.add("is-loading");
}

function hideLoading(){
  if (!loadingOverlay) return;

  const elapsed = performance.now() - loaderShownAt;
  const wait = Math.max(0, LOADER_MIN_MS - elapsed);

  setTimeout(() => {
    loadingOverlay.hidden = true;
    boardWrap?.classList.remove("is-loading");
  }, wait);
}







const HOWTO_SEEN_KEY = "phuzzle_howto_seen_v1";

function openHowTo() {
  if (!howtoOverlay) return;
  howtoOverlay.hidden = false;
  setOrbOpen(false);
}

function closeHowTo(markSeen = true) {
  if (!howtoOverlay) return;
  howtoOverlay.hidden = true;
  if (markSeen) localStorage.setItem(HOWTO_SEEN_KEY, "1");
}

/* One listener to rule them all */
howtoOverlay?.addEventListener("click", (e) => {
  const t = e.target;

  // click outside card closes
  if (t === howtoOverlay) return closeHowTo(true);

  // click X closes
  if (t.closest && t.closest("#howtoCloseBtn")) return closeHowTo(true);

  // click Got it closes
  if (t.closest && t.closest("#howtoGotItBtn")) return closeHowTo(true);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && howtoOverlay && !howtoOverlay.hidden) closeHowTo(true);
});

infoBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  openHowTo();
});






const portalState = new Map();

function portalOpen(menuEl, anchorBtn, gap = 10) {
  if (!menuEl || !anchorBtn) return;

  if (!portalState.has(menuEl)) {
    portalState.set(menuEl, { parent: menuEl.parentNode, next: menuEl.nextSibling });
    document.body.appendChild(menuEl);
    menuEl.classList.add("menu-portal");
  }


  menuEl.style.right = "auto";
  menuEl.style.bottom = "auto";



  const r = anchorBtn.getBoundingClientRect();
  menuEl.style.left = `${r.left + r.width / 2}px`;
  menuEl.style.top = `${r.bottom + gap}px`;
}

function portalClose(menuEl) {
  const st = portalState.get(menuEl);
  if (!st) return;

  st.parent.insertBefore(menuEl, st.next || null);
  menuEl.classList.remove("menu-portal");
  portalState.delete(menuEl);
}




function toggleDifficulty(forceOpen) {
  const isOpen = difficultyMenu.classList.contains("open");
  const next = typeof forceOpen === "boolean" ? forceOpen : !isOpen;

  if (next) {
    portalOpen(difficultyMenu, difficultyBtn, 10);

    requestAnimationFrame(() => {
      difficultyMenu.classList.add("open");
      difficultyBtn.setAttribute("aria-expanded", "true");
    });
  } else {
    difficultyMenu.classList.remove("open");
    difficultyBtn.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      portalClose(difficultyMenu);
    }, 220);
  }
}

// OPEN / CLOSE difficulty menu
difficultyBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevents outside handlers from interfering
  toggleDifficulty();
});

// PICK a difficulty
difficultyMenu.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-size]");
  if (!btn) return;

  const size = btn.dataset.size; // "3x3", "4x4", etc
  difficultyBtn.textContent = size;

  toggleDifficulty(false);
  applyDifficulty(size);
});


document.addEventListener("pointerdown", (e) => {
  if (!difficultyMenu.contains(e.target) &&
      !difficultyBtn.contains(e.target)) {
    toggleDifficulty(false);
  }
});



function setOrbOpen(open) {
  if (!orbBtn || !orbMenu) return;
  orbBtn.setAttribute("aria-expanded", open ? "true" : "false");
  orbMenu.classList.toggle("open", open);
}

function toggleOrb() {
  const isOpen = orbBtn?.getAttribute("aria-expanded") === "true";
  setOrbOpen(!isOpen);
}

orbBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleOrb();
});

document.addEventListener("pointerdown", (e) => {
  if (!orbMenu || !orbBtn) return;
  const inside = orbMenu.contains(e.target) || orbBtn.contains(e.target);
  if (!inside) setOrbOpen(false);
});

orbMenu?.addEventListener("click", () => {
  // close after action tap
  setOrbOpen(false);
});


function isGracePhoto() {
  const list = getActivePhotoList();
  const src = list[photoIndex]?.src || "";
  return src.toLowerCase().includes("/grace_");
}

function isCarsonPhoto() {
  const list = getActivePhotoList();
  const src = list[photoIndex]?.src || "";
  return src.toLowerCase().includes("/carson_");
}

function isNovaPhoto() {
  const list = getActivePhotoList();
  const src = list[photoIndex]?.src || "";
  return src.toLowerCase().includes("/nova_");
}


function difficultyKey() {
  return `${rows}x${cols}`;
}

function bestTimeStorageKey() {
  const src = currentImageSrc() || "unknown";
  // encode so slashes etc are safe for localStorage keys
  const safe = encodeURIComponent(src);
  return `phuzzle_best_${safe}_${difficultyKey()}`;
}


function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function updateStats() {
  movesLabel.textContent = `Moves: ${moves}`;
  timerLabel.textContent = `Time: ${formatTime(elapsedMs)}`;
}

function updateBestLabel() {
  const raw = localStorage.getItem(bestTimeStorageKey());
  if (!raw) {
    bestLabel.textContent = "Best: --:--";
    return;
  }
  const best = Number(raw);
  bestLabel.textContent = Number.isFinite(best) ? `Best: ${formatTime(best)}` : "Best: --:--";
}

function persistBestIfNeeded() {
  const key = bestTimeStorageKey();
  const previous = Number(localStorage.getItem(key));
  if (!Number.isFinite(previous) || elapsedMs < previous) {
    localStorage.setItem(key, String(elapsedMs));
    updateBestLabel();
  }
}

function resetTimerAndMoves() {
    stopSolveAnimation();
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
  }
  timerStarted = false;
  isPaused = false;
  solved = false;
  elapsedMs = 0;
  moves = 0;
  pauseBtn.textContent = "Pause";
  updateStats();
}

function startTimerIfNeeded() {
  if (timerStarted) return;
  timerStarted = true;
  startTime = Date.now();
  timerHandle = setInterval(() => {
    if (isPaused || solved) return;
    elapsedMs = Date.now() - startTime;
    updateStats();
  }, 100);
}

function pauseResumeTimer() {
  if (!timerStarted || solved) return;
  isPaused = !isPaused;
  if (isPaused) {
    pauseBtn.textContent = "Resume";
    return;
  }
  pauseBtn.textContent = "Pause";
  startTime = Date.now() - elapsedMs;
}

function applyDifficulty(size) {
  setDifficulty(size);
  resizeCanvas();

  if (imageLoaded) {
    shuffleBoard();
  } else {
    loadCurrentPhotoAndShuffle();
  }

  updateBestLabel();
}





function toggleCollection(forceOpen) {
  const isOpen = collectionMenu.classList.contains("open");
  const next = typeof forceOpen === "boolean" ? forceOpen : !isOpen;

  if (next) {
    // Move menu outside HUD blur root
    portalOpen(collectionMenu, collectionBtn, 10);

    requestAnimationFrame(() => {
      collectionMenu.classList.add("open");
      collectionBtn.setAttribute("aria-expanded", "true");
    });
  } else {
    collectionMenu.classList.remove("open");
    collectionBtn.setAttribute("aria-expanded", "false");

    // Wait for close animation before restoring
    setTimeout(() => {
      portalClose(collectionMenu);
    }, 220); // match your CSS transition duration
  }
}



// close if you click elsewhere
document.addEventListener("click", (e) => {
  if (!collectionMenu.classList.contains("open")) return;
  if (collectionBtn.contains(e.target) || collectionMenu.contains(e.target)) return;
  toggleCollection(false);
});

// OPEN / CLOSE collection menu
collectionBtn.addEventListener("click", (e) => {
  console.log("collection click");
  e.stopPropagation(); // prevents the document click closer from instantly shutting it
  toggleCollection();
});

// PICK a collection
collectionMenu.addEventListener("click", (e) => {
  console.log("collection click");
  const btn = e.target.closest("button[data-collection]");
  if (!btn) return;

  currentCollection = btn.dataset.collection;
  collectionBtn.textContent = `Collection: ${btn.textContent}`;

  photoIndex = 0;
  toggleCollection(false);
  loadCurrentPhotoAndShuffle();
});


function setDifficulty(value) {
  const pick = DIFFICULTIES[value] || DIFFICULTIES["4x4"];
  rows = pick.rows;
  cols = pick.cols;
}

function initializeSolvedBoard() {
  board = Array.from({ length: rows * cols }, (_, i) => i);
}

function isSolved() {
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== i) return false;
  }
  return true;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function indexToRowCol(index) {
  return { row: Math.floor(index / cols), col: index % cols };
}

function rowColToIndex(row, col) {
  return row * cols + col;
}

function isMatedPair(indexA, indexB) {
  const a = indexToRowCol(indexA);
  const b = indexToRowCol(indexB);
  const dRow = b.row - a.row;
  const dCol = b.col - a.col;
  if (Math.abs(dRow) + Math.abs(dCol) !== 1) return false;

  const tileA = board[indexA];
  const tileB = board[indexB];
  const sa = indexToRowCol(tileA);
  const sb = indexToRowCol(tileB);
  return sb.row - sa.row === dRow && sb.col - sa.col === dCol;
}

function recomputeClusters() {
  const n = rows * cols;
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);

  function find(x) {
    let current = x;
    while (parent[current] !== current) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }
    return current;
  }

  function union(a, b) {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return;
    if (rank[ra] < rank[rb]) {
      parent[ra] = rb;
      return;
    }
    if (rank[rb] < rank[ra]) {
      parent[rb] = ra;
      return;
    }
    parent[rb] = ra;
    rank[ra] += 1;
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const index = rowColToIndex(row, col);
      if (col + 1 < cols) {
        const right = rowColToIndex(row, col + 1);
        if (isMatedPair(index, right)) {
          union(board[index], board[right]);
        }
      }
      if (row + 1 < rows) {
        const down = rowColToIndex(row + 1, col);
        if (isMatedPair(index, down)) {
          union(board[index], board[down]);
        }
      }
    }
  }

  const rootByTileId = new Array(n);
  const membersByRoot = new Map();
  for (let tileId = 0; tileId < n; tileId += 1) {
    const root = find(tileId);
    rootByTileId[tileId] = root;
    if (!membersByRoot.has(root)) membersByRoot.set(root, []);
    membersByRoot.get(root).push(tileId);
  }

  clusterState = { rootByTileId, membersByRoot };
}

function buildTileIndexMap() {
  const tileIndexById = new Array(rows * cols);
  for (let i = 0; i < board.length; i += 1) {
    tileIndexById[board[i]] = i;
  }
  return tileIndexById;
}

function getClusterFromIndex(index) {
  const tileId = board[index];
  const root = clusterState.rootByTileId[tileId];
  const members = clusterState.membersByRoot.get(root) || [tileId];
  return { root, members };
}

function clusterHasLockedTile(memberTileIds) {
  for (const tileId of memberTileIds) {
    if (lockedTiles.has(tileId)) return true;
  }
  return false;
}

function tryRigidTranslateSwap(draggedTileId, dropCellIndex) {
  const draggedRoot = clusterState.rootByTileId[draggedTileId];
  const members = clusterState.membersByRoot.get(draggedRoot) || [];
  if (!members.length) return false;
  if (clusterHasLockedTile(members)) return false;

  const n = rows * cols;

  // Build fast lookups
  const tileIndexById = buildTileIndexMap();
  const memberSet = new Set(members);

  // Anchor translation based on the dragged tile
  const anchorSrcIndex = tileIndexById[draggedTileId];
  const anchorSrc = indexToRowCol(anchorSrcIndex);
  const anchorDst = indexToRowCol(dropCellIndex);
  const dRow = anchorDst.row - anchorSrc.row;
  const dCol = anchorDst.col - anchorSrc.col;
  if (dRow === 0 && dCol === 0) return false;

  // Build src and dst footprints (by board index)
  const srcCells = [];
  const dstCells = [];
  const srcSet = new Set();
  const dstSet = new Set();

  for (const tileId of members) {
    const srcIndex = tileIndexById[tileId];
    const srcCell = indexToRowCol(srcIndex);

    const relRow = srcCell.row - anchorSrc.row;
    const relCol = srcCell.col - anchorSrc.col;

    const dstRow = anchorDst.row + relRow;
    const dstCol = anchorDst.col + relCol;

    if (dstRow < 0 || dstRow >= rows || dstCol < 0 || dstCol >= cols) return false;

    const dstIndex = rowColToIndex(dstRow, dstCol);

    // No duplicate destination cells
    if (dstSet.has(dstIndex)) return false;

    srcCells.push(srcIndex);
    dstCells.push(dstIndex);
    srcSet.add(srcIndex);
    dstSet.add(dstIndex);
  }

  // Identify overlap, vacated, and newOnly
  // overlap = src ∩ dst
  // vacated = src - overlap
  // newOnly = dst - overlap
  const overlap = new Set();
  for (const idx of srcSet) {
    if (dstSet.has(idx)) overlap.add(idx);
  }

  const vacated = [];
  for (const idx of srcCells) {
    if (!overlap.has(idx)) vacated.push(idx);
  }

  const newOnly = [];
  for (const idx of dstCells) {
    if (!overlap.has(idx)) newOnly.push(idx);
  }

  // Anything in newOnly will be displaced, unless it belongs to the moving cluster
  // Locked tiles cannot be displaced.
  for (const dstIndex of newOnly) {
    const occTile = board[dstIndex];
    // If the destination cell contains a locked tile (and it's not part of the moving cluster), block
    if (!memberSet.has(occTile) && lockedTiles.has(occTile)) return false;
  }

  // Sanity: counts should match for a full-board rigid move
  if (vacated.length !== newOnly.length) return false;

  // Deterministic stable ordering: row-major
  const sortIdx = (a, b) => a - b;
  vacated.sort(sortIdx);
  newOnly.sort(sortIdx);

  // Capture displaced tiles in newOnly order (row-major)
  const displacedTiles = newOnly.map((idx) => board[idx]);

  // Build new board as a copy and apply changes
  const newBoard = board.slice();

  // 1) Move cluster tiles into their translated dst positions (including overlap positions, which effectively stay)
  for (let i = 0; i < members.length; i += 1) {
    const srcIndex = srcCells[i];
    const dstIndex = dstCells[i];
    const tileId = board[srcIndex]; // should equal members[i], but this is safer
    newBoard[dstIndex] = tileId;
  }

  // 2) Place displaced tiles into vacated cells (one-to-one)
  for (let i = 0; i < displacedTiles.length; i += 1) {
    newBoard[vacated[i]] = displacedTiles[i];
  }

  // Final locked integrity check: locked tiles must not move
  for (let idx = 0; idx < n; idx += 1) {
    const tileId = board[idx];
    if (lockedTiles.has(tileId) && newBoard[idx] !== tileId) {
      return false;
    }
  }

  board = newBoard;
  return true;
}

function computeOffGrid01(x, y, cellW, cellH){
  // x,y are piece center in canvas coordinates
  const fx = (x / cellW) - Math.floor(x / cellW); // 0..1
  const fy = (y / cellH) - Math.floor(y / cellH);

  // distance from cell center (0.5,0.5), max at edges
  const dx = Math.abs(fx - 0.5) / 0.5; // 0..1
  const dy = Math.abs(fy - 0.5) / 0.5;

  // combine; keep it simple and obvious
  return Math.max(dx, dy);
}


function lockCorrectTilesNow() {
  for (let index = 0; index < board.length; index += 1) {
    const tileId = board[index];
    if (tileId === index) lockedTiles.add(tileId);
  }
}

function shuffleBoard() {
  initializeSolvedBoard();
  const swaps = Math.max(200, board.length * 30);
  for (let i = 0; i < swaps; i += 1) {
    const a = randomInt(board.length);
    let b = randomInt(board.length);
    while (b === a) b = randomInt(board.length);
    const temp = board[a];
    board[a] = board[b];
    board[b] = temp;
  }
  if (isSolved()) {
    const temp = board[0];
    board[0] = board[1];
    board[1] = temp;
  }
  lockedTiles.clear();
  stopSolveAnimation();
  recomputeClusters();
  resetTimerAndMoves();
  draw();
}

function currentBoardSizeCssPixels() {
  const maxWidth = Math.min(window.innerWidth - 24, 780);
  const maxHeight = Math.max(260, window.innerHeight - 230);
  return Math.max(240, Math.min(maxWidth, maxHeight));
}

function resizeCanvas() {
  const size = currentBoardSizeCssPixels();
  dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  canvas.width = Math.floor(size * dpr);
  canvas.height = Math.floor(size * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  tileWidth = size / cols;
  tileHeight = size / rows;
  draw();
}

function tileIdToSourceRect(tileId) {
  const sx = (tileId % cols) * (image.width / cols);
  const sy = Math.floor(tileId / cols) * (image.height / rows);
  const sw = image.width / cols;
  const sh = image.height / rows;
  return { sx, sy, sw, sh };
}

function drawTileAt(tileId, dx, dy, alpha = 1) {
  if (!imageLoaded) return;
  const { sx, sy, sw, sh } = tileIdToSourceRect(tileId);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, tileWidth, tileHeight);
  ctx.restore();
}

function drawClusterAwareGrid(size) {
  ctx.save();
  ctx.lineWidth = lowVisionMode ? 4 : 1;


  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols - 1; col += 1) {
      const leftIndex = rowColToIndex(row, col);
      const rightIndex = rowColToIndex(row, col + 1);
      const leftTile = board[leftIndex];
      const rightTile = board[rightIndex];
      const sameCluster =
        clusterState.rootByTileId[leftTile] !== undefined &&
        clusterState.rootByTileId[leftTile] === clusterState.rootByTileId[rightTile];
      ctx.strokeStyle = lowVisionMode
        ? (sameCluster ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.72)")
        : (sameCluster ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.24)");

      const x = (col + 1) * tileWidth;
      const y1 = row * tileHeight;
      const y2 = y1 + tileHeight;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();
    }
  }

  for (let row = 0; row < rows - 1; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const topIndex = rowColToIndex(row, col);
      const bottomIndex = rowColToIndex(row + 1, col);
      const topTile = board[topIndex];
      const bottomTile = board[bottomIndex];
      const sameCluster =
        clusterState.rootByTileId[topTile] !== undefined &&
        clusterState.rootByTileId[topTile] === clusterState.rootByTileId[bottomTile];
      ctx.strokeStyle = lowVisionMode
        ? (sameCluster ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.72)")
        : (sameCluster ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.24)");

      const y = (row + 1) * tileHeight;
      const x1 = col * tileWidth;
      const x2 = x1 + tileWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
    }
  }

  ctx.lineWidth = lowVisionMode ? 8 : 2;
  ctx.strokeStyle = lowVisionMode ? "rgba(255,255,255,0.90)" : "rgba(0,0,0,0.45)";

  ctx.strokeRect(0, 0, size, size);
  ctx.restore();
}

function drawLockOverlayForTile(index) {
  const tileId = board[index];
  if (!lockedTiles.has(tileId)) return;

    // Fade locks during solve animation
  let lockAlpha = 1;

  if (solveAnim.active || solved) {
    const now = performance.now();
    const t = solveAnim.active
      ? Math.min(1, (now - solveAnim.start) / solveAnim.durationMs)
      : 1;

    // fade out during first half of animation
    lockAlpha = Math.max(0, 1 - t * 2);
  }

  if (lockAlpha <= 0) return;


  const col = index % cols;
  const row = Math.floor(index / cols);
  const x = col * tileWidth;
  const y = row * tileHeight;

  ctx.save();

const t = performance.now() * 0.003;
const pulse = 0.55 + Math.sin(t) * 0.18;

// Outer glow frame
ctx.shadowColor = `rgba(124, 92, 255, ${pulse})`;
ctx.shadowBlur = 18;
ctx.lineWidth = 3;
ctx.strokeStyle = `rgba(124, 92, 255, ${0.92 * lockAlpha})`;


// Neighbor checks
const topLocked =
  row > 0 && lockedTiles.has(board[(row - 1) * cols + col]);

const bottomLocked =
  row < rows - 1 && lockedTiles.has(board[(row + 1) * cols + col]);

const leftLocked =
  col > 0 && lockedTiles.has(board[row * cols + (col - 1)]);

const rightLocked =
  col < cols - 1 && lockedTiles.has(board[row * cols + (col + 1)]);

ctx.beginPath();

// Top
if (!topLocked) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + tileWidth, y);
}

// Bottom
if (!bottomLocked) {
  ctx.moveTo(x, y + tileHeight);
  ctx.lineTo(x + tileWidth, y + tileHeight);
}

// Left
if (!leftLocked) {
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + tileHeight);
}

// Right
if (!rightLocked) {
  ctx.moveTo(x + tileWidth, y);
  ctx.lineTo(x + tileWidth, y + tileHeight);
}

ctx.stroke();


// Inner precision frame
ctx.shadowBlur = 0;
ctx.lineWidth = 1.5;
ctx.strokeStyle = "rgba(86, 204, 242, 0.75)";

const inset = 4;
const ix1 = x + inset;
const iy1 = y + inset;
const ix2 = x + tileWidth - inset;
const iy2 = y + tileHeight - inset;

ctx.beginPath();

if (!topLocked) { ctx.moveTo(ix1, iy1); ctx.lineTo(ix2, iy1); }
if (!bottomLocked) { ctx.moveTo(ix1, iy2); ctx.lineTo(ix2, iy2); }
if (!leftLocked) { ctx.moveTo(ix1, iy1); ctx.lineTo(ix1, iy2); }
if (!rightLocked) { ctx.moveTo(ix2, iy1); ctx.lineTo(ix2, iy2); }

ctx.stroke();


// Corner brackets for signature feel
ctx.lineWidth = 2;
ctx.strokeStyle = "rgba(236, 242, 255, 0.55)";
const s = 10;
const m = 6;

ctx.beginPath();

// Top-left corner only if top edge AND left edge are exposed
if (!topLocked && !leftLocked) {
  ctx.moveTo(x + m, y + m + s);
  ctx.lineTo(x + m, y + m);
  ctx.lineTo(x + m + s, y + m);
}

// Top-right
if (!topLocked && !rightLocked) {
  ctx.moveTo(x + tileWidth - m - s, y + m);
  ctx.lineTo(x + tileWidth - m, y + m);
  ctx.lineTo(x + tileWidth - m, y + m + s);
}

// Bottom-right
if (!bottomLocked && !rightLocked) {
  ctx.moveTo(x + tileWidth - m, y + tileHeight - m - s);
  ctx.lineTo(x + tileWidth - m, y + tileHeight - m);
  ctx.lineTo(x + tileWidth - m - s, y + tileHeight - m);
}

// Bottom-left
if (!bottomLocked && !leftLocked) {
  ctx.moveTo(x + m + s, y + tileHeight - m);
  ctx.lineTo(x + m, y + tileHeight - m);
  ctx.lineTo(x + m, y + tileHeight - m - s);
}

ctx.stroke();


// Small lock glyph, but modern: minimal dot + shackle
const lockX = x + 10;
const lockY = y + 10;
ctx.lineWidth = 2;
ctx.strokeStyle = `rgba(17, 24, 39, ${0.85 * lockAlpha})`;
ctx.beginPath();
ctx.arc(lockX + 7, lockY + 6, 5, Math.PI, 0, false);
ctx.stroke();
ctx.strokeRect(lockX + 3, lockY + 6, 8, 8);

ctx.fillStyle = `rgba(86, 204, 242, ${0.85 * lockAlpha})`;
ctx.beginPath();
ctx.arc(lockX + 7, lockY + 11, 1.6, 0, Math.PI * 2);
ctx.fill();

ctx.restore();

}


function drawConfetti(size) {
  if (!confettiActive) return;

  ctx.save();

  const colors = [
    "#7c5cff",
    "#56ccf2",
    "#86ecf8",
    "#ffffff"
  ];

  for (let p of confettiParticles) {
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.vr;
    p.vy += 0.03; // gravity
    p.life -= 0.01;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }

  ctx.restore();

  confettiParticles = confettiParticles.filter(p => p.life > 0 && p.y < size + 20);

  if (confettiParticles.length === 0) {
    confettiActive = false;
  }
}


function drawGraceWatermark(size) {
  if (!isGracePhoto()) return;
  if (!solved && !(solveAnim && solveAnim.active)) return;

  const now = performance.now();
  const t = (solveAnim && solveAnim.active)
    ? Math.min(1, (now - solveAnim.start) / solveAnim.durationMs)
    : 1;

  // Bring it in smoothly during solve, then keep it
  const fadeIn = Math.min(1, Math.max(0, (t - 0.35) / 0.35));
  const alpha = 0.52 * fadeIn; // ghost level

  const pad = Math.max(14, Math.floor(size * 0.02));
  const x = size - pad;
  const y = size - pad;

  ctx.save();

  // subtle shadow so it reads on bright or dark photos
  ctx.shadowColor = `rgba(0,0,0,${0.45 * fadeIn})`;
  ctx.shadowBlur = 10;

  // Signature line
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillStyle = `rgba(236, 242, 255, ${alpha})`;
  ctx.font = `700 ${Math.max(18, Math.floor(size * 0.05))}px ui-rounded, "Segoe Script", "Brush Script MT", cursive`;
  ctx.fillText("Grace Marshall", x, y);

  // Small subtitle
  ctx.shadowBlur = 6;
  ctx.fillStyle = `rgba(236, 242, 255, ${alpha * 0.95})`;
  ctx.font = `600 ${Math.max(10, Math.floor(size * 0.022))}px ui-sans-serif, system-ui, "Segoe UI", sans-serif`;
  ctx.fillText("PHOTOGRAPHY", x, y - Math.max(18, Math.floor(size * 0.045)));

  ctx.restore();
}


function drawCarsonWatermark(size) {
   if (!isCarsonPhoto()) return;
  if (!solved && !(solveAnim && solveAnim.active)) return;

  const now = performance.now();
  const t = (solveAnim && solveAnim.active)
    ? Math.min(1, (now - solveAnim.start) / solveAnim.durationMs)
    : 1;

  // Bring it in smoothly during solve, then keep it
  const fadeIn = Math.min(1, Math.max(0, (t - 0.35) / 0.35));
  const alpha = 0.52 * fadeIn; // ghost level

  const pad = Math.max(14, Math.floor(size * 0.02));
  const x = size - pad;
  const y = size - pad;

  ctx.save();

  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";

  // Small top label
  ctx.font = `500 ${Math.floor(size * 0.025)}px ui-sans-serif, system-ui`;
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillText("PHOTOGRAPHY", x, y - size * 0.03);

  // Signature line
  ctx.font = `600 ${Math.floor(size * 0.045)}px "Segoe Script", cursive`;
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText("Carson Elliott", x, y);

  ctx.restore();
}

function drawNovaWatermark(size) {
  if (!isNovaPhoto()) return;
  if (!solved && !(solveAnim && solveAnim.active)) return;

  const now = performance.now();
  const t = (solveAnim && solveAnim.active)
    ? Math.min(1, (now - solveAnim.start) / solveAnim.durationMs)
    : 1;

  const fadeIn = Math.min(1, Math.max(0, (t - 0.35) / 0.35));
  const alpha = 0.55 * fadeIn;

  const pad = Math.max(16, Math.floor(size * 0.025));
  const x = size - pad;
  const y = size - pad;

  ctx.save();

  // Subtle depth shadow
  ctx.shadowColor = `rgba(0,0,0,${0.45 * fadeIn})`;
  ctx.shadowBlur = 12;

  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";

  // Main NOVA mark
  ctx.fillStyle = `rgba(236, 242, 255, ${alpha})`;
  ctx.font = `800 ${Math.max(20, Math.floor(size * 0.05))}px ui-sans-serif, system-ui, "Segoe UI", sans-serif`;
  ctx.fillText("NOVA", x, y);

  // Cyan edge glow accent
  ctx.shadowColor = `rgba(86, 204, 242, ${0.6 * fadeIn})`;
  ctx.shadowBlur = 8;
  ctx.fillStyle = `rgba(86, 204, 242, ${alpha * 0.6})`;
  ctx.font = `700 ${Math.max(10, Math.floor(size * 0.02))}px ui-sans-serif, system-ui, "Segoe UI", sans-serif`;
  ctx.fillText("CAR NOVA.i", x, y + Math.max(16, Math.floor(size * 0.03)));

  // Micro stamp
  ctx.shadowBlur = 4;
  ctx.fillStyle = `rgba(255,255,255,${alpha * 0.25})`;
  ctx.font = `600 ${Math.max(8, Math.floor(size * 0.016))}px ui-monospace, monospace`;
  ctx.fillText("AI AUTHORIZED", x, y - Math.max(26, Math.floor(size * 0.055)));

  ctx.restore();
}




function drawSolveOverlay(size) {
  if (!solved && !solveAnim.active) return;

  const now = performance.now();
  const t = solveAnim.active
    ? Math.min(1, (now - solveAnim.start) / solveAnim.durationMs)
    : 1;

  // Ease out
  const ease = 1 - Math.pow(1 - t, 3);

  ctx.save();

  // 1) quick white flash at start
  const flash = Math.max(0, 1 - t * 4);
  if (flash > 0) {
    ctx.fillStyle = `rgba(255,255,255,${flash * 0.18})`;
    ctx.fillRect(0, 0, size, size);
  }

  // 2) radial energy bloom
  const cx = size / 2;
  const cy = size / 2;
  const r = size * (0.15 + 0.85 * ease);

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, `rgba(124, 92, 255, ${0.18 * (1 - t)})`);
  grad.addColorStop(0.55, `rgba(86, 204, 242, ${0.12 * (1 - t)})`);
  grad.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // 3) perimeter sweep glow (animated)
  const sweep = Math.sin(t * Math.PI); // 0 -> 1 -> 0
  ctx.shadowColor = `rgba(124, 92, 255, ${0.55 * sweep})`;
  ctx.shadowBlur = 26;
  ctx.lineWidth = 6;
  ctx.strokeStyle = `rgba(124, 92, 255, ${0.35 * sweep})`;
  ctx.strokeRect(3, 3, size - 6, size - 6);

   // 4) SOLVED text (flash + pop + glow)
  const textIn = t < 0.18 ? 0 : Math.min(1, (t - 0.18) / 0.25); // quicker entry
  const impact = Math.max(0, 1 - t * 6); // fast flash at start (0..~0.16s)

  // Pop: overshoot then settle
  const pop = 1 + 0.14 * Math.sin(Math.min(1, t) * Math.PI) * (1 - t);

  // Extra glow pulse tied to impact
  const glowPulse = 0.35 + 0.65 * impact;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(pop, pop);

  // white flash halo behind text
  if (impact > 0) {
    ctx.shadowColor = `rgba(255,255,255,${0.35 * impact})`;
    ctx.shadowBlur = 26;
  }

  // main glow
  ctx.shadowColor = `rgba(86, 204, 242, ${0.75 * glowPulse * textIn})`;
  ctx.shadowBlur = 22;

  ctx.fillStyle = `rgba(236, 242, 255, ${0.98 * textIn})`;
  ctx.font = `800 ${Math.max(28, Math.floor(size * 0.075))}px ui-sans-serif, system-ui, "Segoe UI", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const blink = impact > 0.65 ? 0.35 : 0;
  ctx.fillStyle = `rgba(236, 242, 255, ${Math.min(1, 0.98 * textIn + blink)})`;

  // Outer glow stroke
  ctx.lineWidth = Math.max(3, size * 0.008);
  ctx.strokeStyle = `rgba(124, 92, 255, ${0.45 * textIn})`;
  ctx.shadowBlur = 24;
  ctx.strokeText("SOLVED", 0, 0);

  // Inner crisp accent stroke
  ctx.lineWidth = Math.max(1.5, size * 0.004);
  ctx.strokeStyle = `rgba(86, 204, 242, ${0.9 * textIn})`;
  ctx.shadowBlur = 10;
  ctx.strokeText("SOLVED", 0, 0);

    // White fill on top (this is the actual readable text)
  ctx.shadowColor = `rgba(86, 204, 242, ${0.25 * glowPulse * textIn})`;
  ctx.shadowBlur = 18;
  ctx.fillStyle = `rgba(236, 242, 255, ${Math.min(1, 0.98 * textIn + blink)})`;
  ctx.fillText("SOLVED", 0, 0);

  

  ctx.restore();
  ctx.restore();


}



function draw() {
  const size = canvas.width / dpr;
  ctx.clearRect(0, 0, size, size);
  if (!imageLoaded) {
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#667085";
    ctx.font = "18px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText("Loading photo...", size / 2, size / 2);
    return;
  }

  for (let i = 0; i < board.length; i += 1) {
    const tileId = board[i];
    if (dragState.active && dragState.memberTileSet.has(tileId)) continue;
    const x = (i % cols) * tileWidth;
    const y = Math.floor(i / cols) * tileHeight;
    drawTileAt(tileId, x, y, 1);
  }

  if (dragState.active) {
    for (const tileId of dragState.memberTileIds) {
      const offset = dragState.offsetsByTileId.get(tileId);
      if (!offset) continue;
      const x = dragState.x + offset.dCol * tileWidth - tileWidth / 2;
      const y = dragState.y + offset.dRow * tileHeight - tileHeight / 2;
      drawTileAt(tileId, x, y, 0.86);
    }
  }

  for (let i = 0; i < board.length; i += 1) {
    if (dragState.active && dragState.memberTileSet.has(board[i])) continue;
    drawLockOverlayForTile(i);
  }

  drawClusterAwareGrid(size);
  drawSolveOverlay(size);

  
    if (isNovaPhoto()) {
    drawNovaWatermark(size);
  } else if (isCarsonPhoto()) {
    drawCarsonWatermark(size);
  } else if (isGracePhoto()) {
    drawGraceWatermark(size);
  }

  


  

  drawConfetti(size);
}

function boardIndexFromPoint(x, y) {
  if (x < 0 || y < 0) return -1;
  const size = canvas.width / dpr;
  if (x >= size || y >= size) return -1;
  const col = Math.floor(x / tileWidth);
  const row = Math.floor(y / tileHeight);
  return row * cols + col;
}

function clientToCanvasPoint(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = ((clientX - rect.left) * scaleX) / dpr;
  const y = ((clientY - rect.top) * scaleY) / dpr;
  return { x, y };
}

function resetDragState() {
  dragState.pointerId = null;
  dragState.active = false;
  dragState.draggedTileId = -1;
  dragState.sourceAnchorIndex = -1;
  dragState.targetIndex = -1;
  dragState.clusterRoot = -1;
  dragState.memberTileIds = [];
  dragState.memberTileSet = new Set();
  dragState.offsetsByTileId = new Map();
}

function stopSolveAnimation() {
  solveAnim.active = false;
  if (solveRaf) {
    cancelAnimationFrame(solveRaf);
    solveRaf = 0;
  }
}

function startSolveAnimation() {
  solveAnim.active = true;
  solveAnim.start = performance.now();

  if (solveRaf) cancelAnimationFrame(solveRaf);

  const tick = () => {
    if (!solveAnim.active) return;

    const t = (performance.now() - solveAnim.start) / solveAnim.durationMs;
    draw();

    if (t < 1) {
      solveRaf = requestAnimationFrame(tick);
    } else {
      solveAnim.active = false;
      solveRaf = 0;
      draw(); // final crisp frame
    }
  };

  solveRaf = requestAnimationFrame(tick);
}



function spawnConfetti(size) {
  confettiParticles = [];
  confettiActive = true;

  const count = 70;

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * size,
      y: -20 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 2,
      vy: 2 + Math.random() * 2.5,
      size: 4 + Math.random() * 4,
      rotation: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2,
      life: 1
    });
  }
}


function speakSolvedLabel() {
  const label = currentImage?.label;
  if (!spokenTitlesEnabled || !label) return;

  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(label);
  u.rate = 0.9;
  u.pitch = 1.0;
  u.volume = 1.0;

  speechSynthesis.speak(u);
}





function completeMoveIfNeeded() {
  if (!dragState.active) return;

  let success = false;
  const targetIndex = dragState.targetIndex;
  if (targetIndex >= 0) {
    success = tryRigidTranslateSwap(dragState.draggedTileId, targetIndex);
  }

  if (success) {
    moves += 1;
    startTimerIfNeeded();
    if (!isPaused) {
      elapsedMs = Date.now() - startTime;
    }
    lockCorrectTilesNow();
    if (toneEnabled) proxTone.chirpSuccess();
    if (vibeEnabled) proxVibe.buzzSuccess();

    recomputeClusters();
    if (isSolved()) {
      solved = true;
      if (timerHandle) {
        clearInterval(timerHandle);
        timerHandle = null;
      }
      persistBestIfNeeded();
      startSolveAnimation();
      proxTone.victoryChime();
      spawnConfetti(canvas.width / dpr);
      if (navigator.vibrate) navigator.vibrate(40);
      
      speakSolvedLabel();

    }
  }

  resetDragState();
  updateStats();
  draw();
}


// section for proximity tone and vibe feedback during drag.... For low vision accessibility

function clamp01(x){ return Math.max(0, Math.min(1, x)); }

class ProximityTone {
  constructor(){
    this.ctx = null;
    this.osc = null;
    this.gain = null;
    this.active = false;
    this.hOsc = null;
    this.hGain = null;

  }
  start(){
    if (this.active) return;
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === "suspended") this.ctx.resume();

    this.osc = this.ctx.createOscillator();
    this.gain = this.ctx.createGain();

    this.osc.type = "sine";
    this.gain.gain.value = 0.0001;

    this.osc.connect(this.gain);
    this.gain.connect(this.ctx.destination);

    this.osc.frequency.value = 180;
    this.osc.start();

    const t = this.ctx.currentTime;
    this.gain.gain.setTargetAtTime(0.05, t, 0.02);

    this.active = true;

        // Harmonic layer for off-grid roughness
    this.hOsc = this.ctx.createOscillator();
    this.hGain = this.ctx.createGain();

    this.hOsc.type = "triangle";       // harsh overtone
    this.hGain.gain.value = 0.0001;  // basically off

    this.hOsc.connect(this.hGain);
    this.hGain.connect(this.ctx.destination);

    this.hOsc.frequency.value = this.osc.frequency.value * 1.5; // non-octave harmonic for more interesting roughness
    this.hOsc.start();

  }
  update(closeness, offGrid01){
    if (!this.active) return;

    const c = Math.max(0, Math.min(1, closeness));
    const eased = c * c;

    const minHz = 140;
    const maxHz = 480;
    const hz = minHz + (maxHz - minHz) * eased;

    const t = this.ctx.currentTime;
    this.osc.frequency.setTargetAtTime(hz, t, 0.03);

    // off-grid roughness control
    const og = Math.max(0, Math.min(1, offGrid01 || 0));
    const ogEased = og * og;

    // harmonic frequency tracks main pitch
    if (this.hOsc) this.hOsc.frequency.setTargetAtTime(hz * 2, t, 0.03);

    // fade in roughness as you go off grid
    // keep this subtle: 0.00 to 0.035 ish
    if (this.hGain) this.hGain.gain.setTargetAtTime(0.0001 + 0.035 * ogEased, t, 0.03);
  }

  stop(){
    if (!this.active) return;
    const t = this.ctx.currentTime;
    this.gain.gain.setTargetAtTime(0.0001, t, 0.03);
    setTimeout(() => {
      try { this.osc.stop(); } catch {}
      try { this.osc.disconnect(); } catch {}
      try { this.gain.disconnect(); } catch {}
      try { this.hOsc.stop(); } catch {}
      try { this.hOsc.disconnect(); } catch {}
      try { this.hGain.disconnect(); } catch {}
      this.osc = null;
      this.gain = null;
      this.active = false;
      this.hOsc = null;
      this.hGain = null;  
    }, 120);
  }
  chirpSuccess(){
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "square";
    o.connect(g);
    g.connect(this.ctx.destination);

    const t = this.ctx.currentTime;
    g.gain.setValueAtTime(0.06, t);
    o.frequency.setValueAtTime(1400, t);
    o.frequency.exponentialRampToValueAtTime(700, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    o.start(t);
    o.stop(t + 0.09);
  }

    victoryChime(){
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === "suspended") this.ctx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    o.type = "triangle";
    o.connect(g);
    g.connect(this.ctx.destination);

    g.gain.setValueAtTime(0.0001, now);
    g.gain.setTargetAtTime(0.08, now, 0.01);

    const step = 0.11;

    notes.forEach((hz, i) => {
      o.frequency.setValueAtTime(hz, now + i * step);
    });

    const end = now + notes.length * step + 0.03;
    g.gain.setTargetAtTime(0.0001, end, 0.02);

    o.start(now);
    o.stop(end + 0.08);
  }

}


class ProximityVibe {
  constructor(){
    this.timer = null;
    this.lastInterval = null;
  }
  update(closeness){
    if (!("vibrate" in navigator)) return;
    const c = clamp01(closeness);
    const interval = Math.round(500 - (500 - 80) * (c * c));
    const pulse = Math.round(30 + 70 * c);

    if (this.lastInterval !== null && Math.abs(interval - this.lastInterval) < 25) return;
    this.lastInterval = interval;

    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => navigator.vibrate(pulse), interval);
  }
  stop(){
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.lastInterval = null;
    if ("vibrate" in navigator) navigator.vibrate(0);
  }
  buzzSuccess(){
    if ("vibrate" in navigator) navigator.vibrate([40, 30, 120]);
  }
}

const proxTone = new ProximityTone();
const proxVibe = new ProximityVibe();

function tileHomeCenter(tileId){
  const home = indexToRowCol(tileId); // tileId equals its solved index already
  return {
    x: (home.col + 0.5) * tileWidth,
    y: (home.row + 0.5) * tileHeight
  };
}

function dragAnchorCenter(){
  // dragged tile render center is dragState.x/y already in canvas space
  return { x: dragState.x, y: dragState.y };
}

function computeDragCloseness(){
  const tileId = dragState.draggedTileId;
  if (tileId < 0) return 0;

  const a = dragAnchorCenter();
  const h = tileHomeCenter(tileId);

  const d = Math.hypot(a.x - h.x, a.y - h.y);
  const size = canvas.width / dpr;
  const d0 = Math.hypot(size, size);

  return 1 - clamp01(d / d0);
}



function beginDrag(e) {
  if (!imageLoaded || solved || isPaused) return;

  const startClientX = e.clientX;
  const startClientY = e.clientY;

  const point = clientToCanvasPoint(startClientX, startClientY);
  const startIndex = boardIndexFromPoint(point.x, point.y);
  if (startIndex < 0) return;

  const draggedTileId = board[startIndex];
  const cluster = getClusterFromIndex(startIndex);
  if (clusterHasLockedTile(cluster.members)) return;

  pendingDrag = {
    pointerId: e.pointerId,
    startClientX,
    startClientY,
    startIndex,
    draggedTileId,
    clusterRoot: cluster.root,
    members: cluster.members.slice()
  };
}

function moveDrag(e) {
  if (!dragState.active) {
    if (!pendingDrag || pendingDrag.pointerId !== e.pointerId) return;

    const dx = e.clientX - pendingDrag.startClientX;
    const dy = e.clientY - pendingDrag.startClientY;

    // Favor scroll unless it’s more horizontal than vertical
    if (Math.abs(dy) > Math.abs(dx)) return;

    if (Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;

    canvas.setPointerCapture(e.pointerId);
    e.preventDefault();

    const commitPoint = clientToCanvasPoint(e.clientX, e.clientY);

    const tileIndexById = buildTileIndexMap();
    const anchorCell = indexToRowCol(pendingDrag.startIndex);
    const offsetsByTileId = new Map();

    for (const tileId of pendingDrag.members) {
      const index = tileIndexById[tileId];
      const cell = indexToRowCol(index);
      offsetsByTileId.set(tileId, {
        dRow: cell.row - anchorCell.row,
        dCol: cell.col - anchorCell.col
      });
    }

    dragState.pointerId = e.pointerId;
    dragState.active = true;
    dragState.draggedTileId = pendingDrag.draggedTileId;
    dragState.sourceAnchorIndex = pendingDrag.startIndex;
    dragState.targetIndex = pendingDrag.startIndex;
    dragState.clusterRoot = pendingDrag.clusterRoot;
    dragState.memberTileIds = pendingDrag.members.slice();
    dragState.memberTileSet = new Set(pendingDrag.members);
    dragState.offsetsByTileId = offsetsByTileId;
    dragState.x = commitPoint.x;
    dragState.y = commitPoint.y;

    pendingDrag = null;

    if (toneEnabled) proxTone.start();
    if (vibeEnabled) proxVibe.update(computeDragCloseness());

    draw();
    return;
  }

  if (dragState.pointerId !== e.pointerId) return;

  const point = clientToCanvasPoint(e.clientX, e.clientY);
  dragState.x = point.x;
  dragState.y = point.y;
  dragState.targetIndex = boardIndexFromPoint(point.x, point.y);

  const c = computeDragCloseness();
  const og = computeOffGrid01(dragState.x, dragState.y, tileWidth, tileHeight);

  if (toneEnabled) proxTone.update(c, og);
  if (vibeEnabled) proxVibe.update(c);

  draw();
}

function endDrag(e) {
  // Clear pending drag even if we never activated
  if (pendingDrag && pendingDrag.pointerId === e.pointerId) pendingDrag = null;

  if (!dragState.active || dragState.pointerId !== e.pointerId) return;

  if (canvas.hasPointerCapture?.(e.pointerId)) {
    canvas.releasePointerCapture(e.pointerId);
  }

  if (toneEnabled) proxTone.stop();
  if (vibeEnabled) proxVibe.stop();

  completeMoveIfNeeded();
}


function cancelDrag(e) {
  if (dragState.active && dragState.pointerId === e.pointerId) {
    if (canvas.hasPointerCapture?.(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    if (toneEnabled) proxTone.stop();
    if (vibeEnabled) proxVibe.stop();

    resetDragState();
    draw();
  }
}

function loadCurrentPhotoAndShuffle() {
  imageLoaded = false;
  showLoading("Loading photo", "Shuffling tiles…");
  draw();

  const list = getActivePhotoList();
  if (!list.length) return;

  photoIndex = ((photoIndex % list.length) + list.length) % list.length;

  const item = list[photoIndex];
  if (!item) return;

  currentImage = item;
  const src = item.src;

  image = new Image();
  image.onload = () => {
    imageLoaded = true;
    resizeCanvas();
    shuffleBoard();
    updateBestLabel();
    hideLoading();
  };
  image.onerror = () => {
    imageLoaded = false;
    hideLoading();
    draw();
  };
  image.src = src;
}



function stepPhoto(delta) {
  const list = getActivePhotoList();
  if (!list.length) return;
  const total = list.length;
  photoIndex = (photoIndex + delta + total) % total;
  loadCurrentPhotoAndShuffle();
}

function randomPhoto() {
  const list = getActivePhotoList();
  if (list.length <= 1) {
    loadCurrentPhotoAndShuffle();
    return;
  }
  let next = randomInt(list.length);
  while (next === photoIndex) next = randomInt(list.length);
  photoIndex = next;
  loadCurrentPhotoAndShuffle();
}

function setPressed(btn, on, labelOn, labelOff){
  if (!btn) return;
  btn.setAttribute("aria-pressed", on ? "true" : "false");
  btn.textContent = on ? labelOn : labelOff;
}

lvBtn?.addEventListener("click", () => {
  lowVisionMode = !lowVisionMode;

  document.body.classList.toggle("lv", lowVisionMode);
  setPressed(lvBtn, lowVisionMode, "Low Vision: On", "Low Vision: Off");

  if (lowVisionMode) {
    // Save the user's current collection so we can restore it
    previousCollection = currentCollection;

    // Force the visible collection label (optional but nice)
    currentCollection = "highvis";
    collectionBtn.textContent = "Collection: High Vis";
  } else {
    // Restore previous collection
    currentCollection = previousCollection || "all";
    collectionBtn.textContent = "Collection";
  }

  // Always restart at first image in the active list and reload immediately
  photoIndex = 0;
  loadCurrentPhotoAndShuffle();
});



howtoOverlay?.addEventListener("click", () => {
  console.log("overlay click fired");
});









toneBtn?.addEventListener("click", () => {
  toneEnabled = !toneEnabled;
  setPressed(toneBtn, toneEnabled, "Tone: On", "Tone: Off");
  if (!toneEnabled) proxTone.stop();
});

vibeBtn?.addEventListener("click", () => {
  vibeEnabled = !vibeEnabled;
  setPressed(vibeBtn, vibeEnabled, "Vibe: On", "Vibe: Off");
  if (!vibeEnabled) proxVibe.stop();
});



speakBtn?.addEventListener("click", () => {
  spokenTitlesEnabled = !spokenTitlesEnabled;
  setPressed(speakBtn, spokenTitlesEnabled, "Titles: On", "Titles: Off");
});




prevPhotoBtn.addEventListener("click", () => stepPhoto(-1));
nextPhotoBtn.addEventListener("click", () => stepPhoto(1));
randomPhotoBtn.addEventListener("click", randomPhoto);
shuffleBtn.addEventListener("click", shuffleBoard);
pauseBtn.addEventListener("click", pauseResumeTimer);


canvas.addEventListener("pointerdown", beginDrag);
canvas.addEventListener("pointermove", moveDrag);
canvas.addEventListener("pointerup", endDrag);
canvas.addEventListener("pointercancel", cancelDrag);
canvas.addEventListener("lostpointercapture", cancelDrag);

window.addEventListener("resize", resizeCanvas);

applyDifficulty(difficultyBtn?.textContent?.trim() || "4x4");
updateStats();
updateBestLabel();

if (!localStorage.getItem(HOWTO_SEEN_KEY)) {
  openHowTo();
}

loadCurrentPhotoAndShuffle();
