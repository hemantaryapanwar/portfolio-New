import { Link } from 'react-router-dom';
import FadeContent from '../../components/reactbits/FadeContent';

const sample = [
  5, 3, 0, 0, 7, 0, 0, 0, 0,
  6, 0, 0, 1, 9, 5, 0, 0, 0,
  0, 9, 8, 0, 0, 0, 0, 6, 0,
  8, 0, 0, 0, 6, 0, 0, 0, 3,
  4, 0, 0, 8, 0, 3, 0, 0, 1,
  7, 0, 0, 0, 2, 0, 0, 0, 6,
  0, 6, 0, 0, 0, 0, 2, 8, 0,
  0, 0, 0, 4, 1, 9, 0, 0, 5,
  0, 0, 0, 0, 8, 0, 0, 7, 9,
];

export default function GamesTeaser() {
  return (
    <section id="games" className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <FadeContent duration={700} threshold={0.2}>
          <div className="border border-line rounded-lg p-10 md:p-14 grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">Just for fun</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-5">
                Need a break? There's a game for that.
              </h2>
              <p className="text-ink-soft max-w-md mb-8">
                I built a small arcade alongside this portfolio — starting with a fully playable
                Sudoku (three difficulties, notes, mistake tracking). More games are on the way.
              </p>
              <Link
                to="/games"
                className="inline-flex items-center rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
              >
                Open the arcade →
              </Link>
            </div>

            <div
              className="grid grid-cols-9 border border-line rounded-md overflow-hidden aspect-square max-w-64 mx-auto w-full"
              aria-hidden="true"
            >
              {sample.map((n, i) => {
                const col = i % 9;
                const row = Math.floor(i / 9);
                return (
                  <span
                    key={i}
                    className={`flex items-center justify-center text-[11px] font-mono ${
                      n ? 'text-ink font-medium' : 'text-transparent'
                    } border-t border-l border-line/70 ${col === 8 ? 'border-r border-r-line/70' : ''} ${
                      row === 8 ? 'border-b border-b-line/70' : ''
                    } ${col % 3 === 2 && col !== 8 ? 'border-r-2 border-r-ink/25' : ''} ${
                      row % 3 === 2 && row !== 8 ? 'border-b-2 border-b-ink/25' : ''
                    }`}
                  >
                    {n || '·'}
                  </span>
                );
              })}
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
