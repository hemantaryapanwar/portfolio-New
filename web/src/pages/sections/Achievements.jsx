import FadeContent from '../../components/reactbits/FadeContent';
import { achievements } from '../../data/resume';

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <FadeContent duration={700} threshold={0.2}>
          <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">Achievements</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-14">
            A few things I'm proud of
          </h2>
        </FadeContent>

        <ul className="divide-y divide-line border-t border-b border-line">
          {achievements.map((a, i) => (
            <li key={a.title}>
              <FadeContent duration={600} delay={i * 60} threshold={0.1}>
                <div className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                  <span className="font-serif text-ink w-full sm:w-64 shrink-0">{a.title}</span>
                  <span className="text-sm text-ink-soft">{a.detail}</span>
                </div>
              </FadeContent>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
