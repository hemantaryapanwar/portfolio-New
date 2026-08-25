import SplitText from '../../components/reactbits/SplitText';
import CountUp from '../../components/reactbits/CountUp';
import FadeContent from '../../components/reactbits/FadeContent';
import { stats } from '../../data/resume';

export default function Hero() {
  return (
    <section id="home" className="pt-40 md:pt-48 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm tracking-wide text-ink-faint uppercase mb-6">
          Software Engineer · Gurgaon, India
        </p>

        <SplitText
          tag="h1"
          text="Building reliable software, one clean commit at a time."
          splitType="words"
          duration={0.9}
          delay={40}
          className="font-serif font-medium text-ink text-4xl sm:text-5xl md:text-6xl leading-[1.1] max-w-3xl"
        />

        <FadeContent duration={700} delay={300} threshold={0}>
          <p className="mt-8 text-lg text-ink-soft max-w-xl">
            I'm a Software Engineer at Deloitte with 2.5+ years shipping Java/Spring Boot
            microservices and React/Redux SPAs. I care about clean APIs, fast queries, and
            interfaces that don't get in the way.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
            >
              View my work
            </a>
            <a
              href="/games"
              className="inline-flex items-center text-sm font-medium text-ink-soft hover:text-ink transition-colors"
            >
              Play a game →
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl text-ink">
                  <CountUp to={s.value} duration={1.6} separator="," />
                  {s.suffix}
                </div>
                <div className="text-sm text-ink-faint mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
