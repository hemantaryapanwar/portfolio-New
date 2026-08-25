import { Link } from 'react-router-dom';
import FadeContent from '../components/reactbits/FadeContent';

const games = [
  {
    name: 'Sudoku',
    description:
      'Classic 9×9 Sudoku with three difficulties, pencil notes, a timer, and mistake tracking. Fully playable, keyboard friendly.',
    href: '/games/sudoku',
    status: 'live',
  },
  {
    name: '2048',
    description: 'Slide, merge, and chase the tile. In the works.',
    href: null,
    status: 'soon',
  },
  {
    name: 'Memory Match',
    description: 'Flip, remember, match. A quick game to clear your head.',
    href: null,
    status: 'soon',
  },
];

export default function Games() {
  return (
    <div className="pt-40 md:pt-48 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeContent duration={700} threshold={0}>
          <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">The arcade</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink max-w-2xl mb-5">
            A few small games, built the same way as the rest of this site.
          </h1>
          <p className="text-ink-soft max-w-md mb-16">
            Static, fast, and no accounts required. Start with Sudoku — more are on the way.
          </p>
        </FadeContent>

        <div className="grid md:grid-cols-3 gap-6">
          {games.map((g, i) => {
            const Wrapper = g.href ? Link : 'div';
            return (
              <FadeContent key={g.name} duration={600} delay={i * 100} threshold={0.1}>
                <Wrapper
                  {...(g.href ? { to: g.href } : {})}
                  className={`block border border-line rounded-lg p-7 h-full transition-colors ${
                    g.href ? 'hover:border-ink/30' : 'opacity-60'
                  }`}
                >
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide px-2.5 py-1 rounded-full mb-5 ${
                      g.status === 'live'
                        ? 'bg-accent-soft text-accent'
                        : 'bg-paper-alt text-ink-faint'
                    }`}
                  >
                    {g.status === 'live' ? '● Live' : 'Coming soon'}
                  </span>
                  <h2 className="font-serif text-xl text-ink mb-2">{g.name}</h2>
                  <p className="text-sm text-ink-soft leading-relaxed mb-6">{g.description}</p>
                  {g.href && (
                    <span className="text-sm font-medium text-ink">Play now →</span>
                  )}
                </Wrapper>
              </FadeContent>
            );
          })}
        </div>
      </div>
    </div>
  );
}
