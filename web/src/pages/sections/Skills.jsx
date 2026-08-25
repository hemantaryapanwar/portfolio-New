import FadeContent from '../../components/reactbits/FadeContent';
import { skills } from '../../data/resume';

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <FadeContent duration={700} threshold={0.2}>
          <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">Skills</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-14">Tools of the trade</h2>
        </FadeContent>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {skills.map((group, i) => (
            <FadeContent key={group.category} duration={700} delay={i * 100} threshold={0.15}>
              <h3 className="text-sm uppercase tracking-wide text-ink-faint mb-3">
                {group.category}
              </h3>
              <p className="text-ink text-lg leading-relaxed">{group.items.join(' · ')}</p>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
