export const DIFFICULTY = {
  easy: { clues: 40, label: 'Easy' },
  medium: { clues: 32, label: 'Medium' },
  hard: { clues: 26, label: 'Hard' },
};

export const boxIndex = (r, c) => Math.floor(r / 3) * 3 + Math.floor(c / 3);

function shuffledDigits() {
  const d = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

export function makeSolvedGrid() {
  const grid = new Array(81).fill(0);
  const rows = new Array(9).fill(0);
  const cols = new Array(9).fill(0);
  const boxes = new Array(9).fill(0);

  function fill(pos) {
    if (pos === 81) return true;
    const r = Math.floor(pos / 9), c = pos % 9, b = boxIndex(r, c);
    for (const d of shuffledDigits()) {
      const bit = 1 << d;
      if (rows[r] & bit || cols[c] & bit || boxes[b] & bit) continue;
      grid[pos] = d;
      rows[r] |= bit; cols[c] |= bit; boxes[b] |= bit;
      if (fill(pos + 1)) return true;
      grid[pos] = 0; rows[r] &= ~bit; cols[c] &= ~bit; boxes[b] &= ~bit;
    }
    return false;
  }

  fill(0);
  return grid;
}

// Counts solutions of `grid` up to `limit` (early exit once reached).
export function countSolutions(grid, limit) {
  const rows = new Array(9).fill(0);
  const cols = new Array(9).fill(0);
  const boxes = new Array(9).fill(0);
  const empties = [];

  for (let i = 0; i < 81; i++) {
    const r = Math.floor(i / 9), c = i % 9, b = boxIndex(r, c);
    if (grid[i]) {
      rows[r] |= 1 << grid[i];
      cols[c] |= 1 << grid[i];
      boxes[b] |= 1 << grid[i];
    } else {
      empties.push(i);
    }
  }

  let count = 0;

  function candidatesOf(i) {
    const r = Math.floor(i / 9), c = i % 9, b = boxIndex(r, c);
    const used = rows[r] | cols[c] | boxes[b];
    const list = [];
    for (let d = 1; d <= 9; d++) if (!(used & (1 << d))) list.push(d);
    return list;
  }

  function backtrack() {
    if (count >= limit) return;
    let best = -1, bestCands = null;
    for (const i of empties) {
      if (grid[i]) continue;
      const cands = candidatesOf(i);
      if (cands.length === 0) return;
      if (!bestCands || cands.length < bestCands.length) {
        best = i; bestCands = cands;
        if (cands.length === 1) break;
      }
    }
    if (best === -1) { count++; return; }

    const r = Math.floor(best / 9), c = best % 9, b = boxIndex(r, c);
    for (const d of bestCands) {
      const bit = 1 << d;
      grid[best] = d; rows[r] |= bit; cols[c] |= bit; boxes[b] |= bit;
      backtrack();
      grid[best] = 0; rows[r] &= ~bit; cols[c] &= ~bit; boxes[b] &= ~bit;
      if (count >= limit) return;
    }
  }

  backtrack();
  return count;
}

export function makePuzzle(solvedGrid, cluesTarget) {
  const grid = solvedGrid.slice();
  const order = [...Array(81).keys()];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  let clues = 81;
  for (const idx of order) {
    if (clues <= cluesTarget) break;
    if (grid[idx] === 0) continue;
    const backup = grid[idx];
    grid[idx] = 0;
    if (countSolutions(grid.slice(), 2) === 1) {
      clues--;
    } else {
      grid[idx] = backup;
    }
  }
  return grid;
}

export function generatePuzzle(level) {
  const solution = makeSolvedGrid();
  const puzzle = makePuzzle(solution, DIFFICULTY[level].clues);
  return { solution, puzzle };
}
