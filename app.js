const PHOTO_LIST = [
  // Carson
  "assets/images/carson_01.jpg",
  "assets/images/carson_02.jpg",
  "assets/images/carson_03.jpg",
  "assets/images/carson_04.jpg",
  "assets/images/carson_07.jpg",
  "assets/images/carson_08.jpg",
  "assets/images/carson_09.jpg",
  "assets/images/carson_10.jpg",
  "assets/images/carson_11.jpg",
  "assets/images/carson_12.jpg",
  "assets/images/carson_13.jpg",
  "assets/images/carson_14.jpg",

  // Grace
  "assets/images/grace_01.jpg",
  "assets/images/grace_02.jpg",
  "assets/images/grace_03.jpg",
  "assets/images/grace_04.jpg",
  "assets/images/grace_05.jpg",
  "assets/images/grace_06.jpg",
  "assets/images/grace_07.jpg",
  "assets/images/grace_08.jpg",
  "assets/images/grace_09.jpg",
  "assets/images/grace_10.jpg"
];


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
const difficultySelect = document.getElementById("difficultySelect");
const shuffleBtn = document.getElementById("shuffleBtn");
const pauseBtn = document.getElementById("pauseBtn");
const movesLabel = document.getElementById("movesLabel");
const timerLabel = document.getElementById("timerLabel");
const bestLabel = document.getElementById("bestLabel");

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
const lockedTiles = new Set();

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





function isGracePhoto() {
  const src = PHOTO_LIST[photoIndex] || "";
  return src.toLowerCase().includes("/grace_");
}

function isCarsonPhoto() {
  const src = PHOTO_LIST[photoIndex] || "";
  return src.toLowerCase().includes("/carson_");
}


function difficultyKey() {
  return `${rows}x${cols}`;
}

function bestTimeStorageKey() {
  return `phuzzle_best_${photoIndex}_${difficultyKey()}`;
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
  ctx.lineWidth = 1;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols - 1; col += 1) {
      const leftIndex = rowColToIndex(row, col);
      const rightIndex = rowColToIndex(row, col + 1);
      const leftTile = board[leftIndex];
      const rightTile = board[rightIndex];
      const sameCluster =
        clusterState.rootByTileId[leftTile] !== undefined &&
        clusterState.rootByTileId[leftTile] === clusterState.rootByTileId[rightTile];
      ctx.strokeStyle = sameCluster ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.24)";
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
      ctx.strokeStyle = sameCluster ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.24)";
      const y = (row + 1) * tileHeight;
      const x1 = col * tileWidth;
      const x2 = x1 + tileWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
    }
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0,0,0,0.45)";
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
  
  const currentImage = PHOTO_LIST[currentPhotoIndex];
  if (isCarsonPhoto(currentImage)) drawCarsonWatermark(size);
  else drawGraceWatermark(size);

  

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
    recomputeClusters();
    if (isSolved()) {
      solved = true;
      if (timerHandle) {
        clearInterval(timerHandle);
        timerHandle = null;
      }
      persistBestIfNeeded();
      startSolveAnimation();
      spawnConfetti(canvas.width / dpr);
      if (navigator.vibrate) navigator.vibrate(40);
    }
  }

  resetDragState();
  updateStats();
  draw();
}

function beginDrag(e) {
  if (!imageLoaded || solved || isPaused) return;
  const point = clientToCanvasPoint(e.clientX, e.clientY);
  const startIndex = boardIndexFromPoint(point.x, point.y);
  if (startIndex < 0) return;

  const draggedTileId = board[startIndex];
  const cluster = getClusterFromIndex(startIndex);
  if (clusterHasLockedTile(cluster.members)) return;

  const tileIndexById = buildTileIndexMap();
  const anchorCell = indexToRowCol(startIndex);
  const offsetsByTileId = new Map();
  for (const tileId of cluster.members) {
    const index = tileIndexById[tileId];
    const cell = indexToRowCol(index);
    offsetsByTileId.set(tileId, {
      dRow: cell.row - anchorCell.row,
      dCol: cell.col - anchorCell.col
    });
  }

  dragState.pointerId = e.pointerId;
  dragState.active = true;
  dragState.draggedTileId = draggedTileId;
  dragState.sourceAnchorIndex = startIndex;
  dragState.targetIndex = startIndex;
  dragState.clusterRoot = cluster.root;
  dragState.memberTileIds = cluster.members.slice();
  dragState.memberTileSet = new Set(cluster.members);
  dragState.offsetsByTileId = offsetsByTileId;
  dragState.x = point.x;
  dragState.y = point.y;

  canvas.setPointerCapture(e.pointerId);
  draw();
}

function moveDrag(e) {
  if (!dragState.active || dragState.pointerId !== e.pointerId) return;
  const point = clientToCanvasPoint(e.clientX, e.clientY);
  dragState.x = point.x;
  dragState.y = point.y;
  dragState.targetIndex = boardIndexFromPoint(point.x, point.y);
  draw();
}

function endDrag(e) {
  if (!dragState.active || dragState.pointerId !== e.pointerId) return;
  if (canvas.hasPointerCapture(e.pointerId)) {
    canvas.releasePointerCapture(e.pointerId);
  }
  completeMoveIfNeeded();
}

function cancelDrag(e) {
  if (!dragState.active || dragState.pointerId !== e.pointerId) return;
  if (canvas.hasPointerCapture(e.pointerId)) {
    canvas.releasePointerCapture(e.pointerId);
  }
  resetDragState();
  draw();
}

function loadCurrentPhotoAndShuffle() {
  imageLoaded = false;
  draw();
  const src = PHOTO_LIST[photoIndex];
  image = new Image();
  image.onload = () => {
    imageLoaded = true;
    resizeCanvas();
    shuffleBoard();
    updateBestLabel();
  };
  image.onerror = () => {
    imageLoaded = false;
    draw();
  };
  image.src = src;
}

function stepPhoto(delta) {
  if (!PHOTO_LIST.length) return;
  const total = PHOTO_LIST.length;
  photoIndex = (photoIndex + delta + total) % total;
  loadCurrentPhotoAndShuffle();
}

function randomPhoto() {
  if (PHOTO_LIST.length <= 1) {
    loadCurrentPhotoAndShuffle();
    return;
  }
  let next = randomInt(PHOTO_LIST.length);
  while (next === photoIndex) next = randomInt(PHOTO_LIST.length);
  photoIndex = next;
  loadCurrentPhotoAndShuffle();
}

function onDifficultyChange() {
  setDifficulty(difficultySelect.value);
  resizeCanvas();
  if (imageLoaded) {
    shuffleBoard();
  } else {
    loadCurrentPhotoAndShuffle();
  }
  updateBestLabel();
}

prevPhotoBtn.addEventListener("click", () => stepPhoto(-1));
nextPhotoBtn.addEventListener("click", () => stepPhoto(1));
randomPhotoBtn.addEventListener("click", randomPhoto);
shuffleBtn.addEventListener("click", shuffleBoard);
pauseBtn.addEventListener("click", pauseResumeTimer);
difficultySelect.addEventListener("change", onDifficultyChange);

canvas.addEventListener("pointerdown", beginDrag);
canvas.addEventListener("pointermove", moveDrag);
canvas.addEventListener("pointerup", endDrag);
canvas.addEventListener("pointercancel", cancelDrag);
canvas.addEventListener("lostpointercapture", cancelDrag);

window.addEventListener("resize", resizeCanvas);

setDifficulty(difficultySelect.value);
updateStats();
updateBestLabel();
loadCurrentPhotoAndShuffle();
