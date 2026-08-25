import FadeContent from '../../components/reactbits/FadeContent';
import { projects } from '../../data/resume';

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <FadeContent duration={700} threshold={0.2}>
          <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">Projects</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            Things I've built on the side
          </h2>
          <p className="text-ink-soft max-w-lg mb-14">
            A couple of self-directed builds — one shipping product UX in the browser, one
            wrangling a forecasting model.
          </p>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <FadeContent key={p.name} duration={700} delay={i * 120} threshold={0.1}>
              <div className="border border-line rounded-lg p-8 h-full flex flex-col hover:border-ink/30 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-serif text-xl text-ink">{p.name}</h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener"
                      className="text-sm text-ink-faint hover:text-ink transition-colors shrink-0"
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
                <span className="text-xs font-mono text-ink-faint mb-4">{p.period}</span>
                <p className="text-sm text-ink-soft leading-relaxed flex-grow">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-faint">
                  {p.tags.map((t, idx) => (
                    <span key={t}>
                      {t}
                      {idx < p.tags.length - 1 && <span className="ml-3 text-ink-faint/50">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
