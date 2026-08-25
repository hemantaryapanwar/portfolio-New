import { useCallback, useEffect, useRef, useState } from 'react';
import { DIFFICULTY, boxIndex, generatePuzzle } from '../lib/sudoku';

const MAX_HINTS = 3;
const emptyNotes = () => Array.from({ length: 81 }, () => new Set());

export default function useSudoku(initialLevel = 'easy') {
  const [level, setLevelState] = useState(initialLevel);
  const [solution, setSolution] = useState(() => new Array(81).fill(0));
  const [given, setGiven] = useState(() => new Array(81).fill(false));
  const [values, setValues] = useState(() => new Array(81).fill(0));
  const [notes, setNotes] = useState(emptyNotes);
  const [selected, setSelected] = useState(-1);
  const [notesMode, setNotesMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef(null);

  const newGame = useCallback((nextLevel) => {
    const lvl = nextLevel || level;
    setLoading(true);
    setRunning(false);
    setSolved(false);
    setSelected(-1);
    setMistakes(0);
    setHintsLeft(MAX_HINTS);
    setNotes(emptyNotes());

    setTimeout(() => {
      const { solution: sol, puzzle } = generatePuzzle(lvl);
      setSolution(sol);
      setValues(puzzle.slice());
      setGiven(puzzle.map((v) => v !== 0));
      setSeconds(0);
      setLoading(false);
      setRunning(true);
    }, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    newGame(initialLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const setLevel = useCallback((lvl) => {
    setLevelState(lvl);
    newGame(lvl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCell = useCallback((i) => {
    if (solved) return;
    setSelected(i);
  }, [solved]);

  const inputDigit = useCallback((d) => {
    if (solved || selected === -1 || given[selected]) return;
    const i = selected;

    if (notesMode) {
      if (values[i]) return;
      setNotes((prev) => {
        const next = prev.map((s) => new Set(s));
        if (next[i].has(d)) next[i].delete(d);
        else next[i].add(d);
        return next;
      });
      return;
    }

    setValues((prev) => {
      const next = prev.slice();
      next[i] = d;
      return next;
    });
    setNotes((prev) => {
      const next = prev.map((s) => new Set(s));
      next[i].clear();
      return next;
    });
    if (d !== solution[i]) setMistakes((m) => m + 1);
  }, [solved, selected, given, notesMode, values, solution]);

  const eraseCell = useCallback(() => {
    if (solved || selected === -1 || given[selected]) return;
    const i = selected;
    setValues((prev) => {
      const next = prev.slice();
      next[i] = 0;
      return next;
    });
    setNotes((prev) => {
      const next = prev.map((s) => new Set(s));
      next[i].clear();
      return next;
    });
  }, [solved, selected, given]);

  const useHint = useCallback(() => {
    if (solved || selected === -1 || hintsLeft <= 0) return;
    const i = selected;
    if (given[i] || values[i] === solution[i]) return;
    setValues((prev) => {
      const next = prev.slice();
      next[i] = solution[i];
      return next;
    });
    setNotes((prev) => {
      const next = prev.map((s) => new Set(s));
      next[i].clear();
      return next;
    });
    setHintsLeft((h) => h - 1);
  }, [solved, selected, hintsLeft, given, values, solution]);

  // Win check
  useEffect(() => {
    if (loading || solved) return;
    if (values.length !== 81) return;
    const complete = values.every((v, i) => v === solution[i]);
    if (complete && values.some((v) => v !== 0)) {
      setSolved(true);
      setRunning(false);
    }
  }, [values, solution, loading, solved]);

  const moveSelection = useCallback((dr, dc) => {
    setSelected((cur) => {
      const base = cur === -1 ? 0 : cur;
      const r = Math.floor(base / 9), c = base % 9;
      const nr = Math.min(8, Math.max(0, r + dr));
      const nc = Math.min(8, Math.max(0, c + dc));
      return nr * 9 + nc;
    });
  }, []);

  const digitCounts = Array.from({ length: 10 }, (_, d) =>
    d === 0 ? 0 : values.filter((v) => v === d).length
  );

  const peersOf = (i) => {
    if (i === -1) return { row: -1, col: -1, box: -1 };
    return { row: Math.floor(i / 9), col: i % 9, box: boxIndex(Math.floor(i / 9), i % 9) };
  };

  return {
    level,
    setLevel,
    difficultyMeta: DIFFICULTY,
    solution,
    given,
    values,
    notes,
    selected,
    selectCell,
    notesMode,
    setNotesMode,
    mistakes,
    hintsLeft,
    maxHints: MAX_HINTS,
    seconds,
    solved,
    loading,
    newGame,
    inputDigit,
    eraseCell,
    useHint,
    moveSelection,
    digitCounts,
    peersOf,
  };
}
