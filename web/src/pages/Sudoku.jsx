import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSudoku from '../hooks/useSudoku';

const LEVELS = ['easy', 'medium', 'hard'];

function formatTime(total) {
  const mm = String(Math.floor(total / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function Sudoku() {
  const sk = useSudoku('easy');

  useEffect(() => {
    const onKey = (e) => {
      if (sk.solved && e.key !== 'Escape') return;
      if (e.key >= '1' && e.key <= '9') {
        sk.inputDigit(Number(e.key));
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        sk.eraseCell();
        return;
      }
      const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (moves[e.key]) {
        e.preventDefault();
        sk.moveSelection(...moves[e.key]);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sk.solved, sk.selected, sk.given, sk.notesMode, sk.values]);

  const peers = sk.peersOf(sk.selected);
  const selectedVal = sk.selected !== -1 ? sk.values[sk.selected] : 0;

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/games" className="text-sm text-ink-faint hover:text-ink transition-colors">
          ← Back to arcade
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink">Sudoku</h1>
            <p className="text-ink-soft text-sm mt-2">
              Fill the grid so every row, column, and 3×3 box contains 1–9 exactly once.
            </p>
          </div>

          <div className="inline-flex border border-line rounded-full p-1">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => sk.setLevel(lvl)}
                className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors ${
                  sk.level === lvl ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[minmax(0,520px)_260px] gap-10 items-start">
          <div>
            <div className="flex items-center justify-between mb-4 text-sm text-ink-soft font-mono">
              <span>⏱ {formatTime(sk.seconds)}</span>
              <span className={sk.mistakes > 0 ? 'text-danger' : ''}>{sk.mistakes} mistakes</span>
              <span className="capitalize">{sk.level}</span>
            </div>

            <div className="relative aspect-square w-full border border-ink/25 rounded-md overflow-hidden bg-paper">
              {sk.loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-paper/80 text-sm text-ink-faint font-mono">
                  generating puzzle…
                </div>
              )}

              <div className="grid grid-cols-9 grid-rows-9 w-full h-full select-none">
                {sk.values.map((val, i) => {
                  const r = Math.floor(i / 9), c = i % 9;
                  const isGiven = sk.given[i];
                  const isSelected = sk.selected === i;
                  const isPeer = sk.selected !== -1 && (r === peers.row || c === peers.col);
                  const isBoxPeer =
                    sk.selected !== -1 && Math.floor(r / 3) * 3 + Math.floor(c / 3) === peers.box;
                  const isSameValue = selectedVal && val === selectedVal && !isSelected;
                  const isError = val !== 0 && !isGiven && val !== sk.solution[i];
                  const cellNotes = sk.notes[i];

                  return (
                    <button
                      key={i}
                      onClick={() => sk.selectCell(i)}
                      className={[
                        'relative flex items-center justify-center text-base sm:text-lg font-serif border-t border-l border-ink/10',
                        c === 8 ? 'border-r border-ink/10' : '',
                        r === 8 ? 'border-b border-ink/10' : '',
                        c % 3 === 2 && c !== 8 ? 'border-r-2 border-r-ink/25' : '',
                        r % 3 === 2 && r !== 8 ? 'border-b-2 border-b-ink/25' : '',
                        isSelected ? 'bg-accent-soft' : isSameValue ? 'bg-accent-soft/60' : isPeer || isBoxPeer ? 'bg-paper-alt' : 'bg-paper',
                        isGiven ? 'font-medium text-ink' : 'text-accent',
                        isError ? 'text-danger' : '',
                      ].join(' ')}
                    >
                      {val ? (
                        val
                      ) : cellNotes.size ? (
                        <span className="grid grid-cols-3 grid-rows-3 w-full h-full p-0.5">
                          {Array.from({ length: 9 }, (_, n) => n + 1).map((n) => (
                            <span key={n} className="flex items-center justify-center text-[8px] sm:text-[9px] font-mono text-ink-faint">
                              {cellNotes.has(n) ? n : ''}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <div className="grid grid-cols-9 lg:grid-cols-5 gap-1.5">
              {Array.from({ length: 9 }, (_, n) => n + 1).map((d) => (
                <button
                  key={d}
                  onClick={() => sk.inputDigit(d)}
                  disabled={sk.digitCounts[d] >= 9}
                  className="aspect-square border border-line rounded-md flex flex-col items-center justify-center font-serif text-base hover:border-ink/40 disabled:opacity-20 disabled:pointer-events-none transition-colors"
                >
                  {d}
                  <span className="text-[9px] font-mono text-ink-faint">{sk.digitCounts[d]}/9</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={sk.eraseCell}
                className="border border-line rounded-md py-2.5 text-sm text-ink-soft hover:border-ink/40 hover:text-ink transition-colors"
              >
                Erase
              </button>
              <button
                onClick={() => sk.setNotesMode((m) => !m)}
                className={`border rounded-md py-2.5 text-sm transition-colors ${
                  sk.notesMode ? 'bg-ink text-paper border-ink' : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink'
                }`}
              >
                Notes {sk.notesMode ? 'On' : 'Off'}
              </button>
              <button
                onClick={sk.useHint}
                disabled={sk.hintsLeft <= 0}
                className="border border-line rounded-md py-2.5 text-sm text-ink-soft hover:border-ink/40 hover:text-ink disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Hint ({sk.hintsLeft})
              </button>
              <button
                onClick={() => sk.newGame()}
                className="border border-line rounded-md py-2.5 text-sm text-ink-soft hover:border-ink/40 hover:text-ink transition-colors"
              >
                New game
              </button>
            </div>

            <p className="text-xs text-ink-faint leading-relaxed border-t border-line pt-4">
              Click a cell, then a number to fill it. Toggle <strong className="text-ink-soft">Notes</strong> to
              pencil in candidates. Arrow keys move; number keys fill.
            </p>
          </aside>
        </div>
      </div>

      {sk.solved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-6">
          <div className="bg-paper border border-line rounded-lg p-10 max-w-sm w-full text-center">
            <h2 className="font-serif text-2xl text-ink mb-2">Solved it!</h2>
            <p className="text-sm text-ink-soft mb-8">Nicely played — here's how it went.</p>
            <div className="grid grid-cols-3 gap-2 mb-8 text-sm">
              <div className="border border-line rounded-md py-3">
                <div className="font-serif text-lg text-ink">{formatTime(sk.seconds)}</div>
                <div className="text-xs text-ink-faint">Time</div>
              </div>
              <div className="border border-line rounded-md py-3">
                <div className="font-serif text-lg text-ink">{sk.mistakes}</div>
                <div className="text-xs text-ink-faint">Mistakes</div>
              </div>
              <div className="border border-line rounded-md py-3">
                <div className="font-serif text-lg text-ink capitalize">{sk.level}</div>
                <div className="text-xs text-ink-faint">Level</div>
              </div>
            </div>
            <button
              onClick={() => sk.newGame()}
              className="w-full rounded-full bg-ink text-paper py-3 text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
