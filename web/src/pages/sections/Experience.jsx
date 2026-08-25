import FadeContent from '../../components/reactbits/FadeContent';
import { experience } from '../../data/resume';

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <FadeContent duration={700} threshold={0.2}>
          <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">Experience</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">Where I've worked</h2>
          <p className="text-ink-soft max-w-lg mb-14">
            Two roles, one theme — turning messy requirements into APIs and interfaces people
            actually rely on.
          </p>
        </FadeContent>

        <div className="space-y-16">
          {experience.map((job, i) => (
            <FadeContent key={job.org} duration={700} delay={i * 100} threshold={0.1}>
              <div className="grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-baseline border-l border-line pl-6 md:pl-8 relative">
                <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-paper border-2 border-accent" />
                <div>
                  <h3 className="text-lg font-medium text-ink">{job.role}</h3>
                  <p className="text-accent text-sm">
                    {job.org} · {job.place}
                  </p>
                </div>
                <span className="text-xs text-ink-faint font-mono md:text-right">{job.period}</span>

                <ul className="md:col-span-2 mt-4 space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="text-sm text-ink-soft leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-ink-faint">
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="md:col-span-2 mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-faint">
                  {job.tags.map((t, idx) => (
                    <span key={t}>
                      {t}
                      {idx < job.tags.length - 1 && <span className="ml-4 text-ink-faint/50">·</span>}
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
