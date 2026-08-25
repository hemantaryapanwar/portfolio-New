import FadeContent from '../../components/reactbits/FadeContent';
import { education } from '../../data/resume';

const facts = [
  { label: 'Based in', value: 'Gurgaon, India' },
  { label: 'Education', value: 'B.Tech CSE, IIIT Sonepat' },
  { label: 'Currently', value: 'SWE @ Deloitte' },
  { label: 'Focus', value: 'Java · Spring Boot · React' },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
        <FadeContent duration={700} threshold={0.2}>
          <div className="rounded-lg overflow-hidden border border-line aspect-[4/5] max-w-sm">
            <img
              src="/adventure.jpg"
              alt="Hemant on a mountain trek, snow-capped peaks in the background"
              loading="lazy"
              className="w-full h-full object-cover grayscale-[15%]"
            />
          </div>
          <p className="mt-3 text-sm text-ink-faint max-w-sm">
            Off the clock — trekking through the Himalayas.
          </p>
        </FadeContent>

        <FadeContent duration={700} delay={150} threshold={0.2}>
          <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">About</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
            Backend-leaning engineer who ships the whole stack.
          </h2>
          <div className="space-y-4 text-ink-soft leading-relaxed">
            <p>
              I'm currently a Software Engineer at Deloitte, where I build and maintain RESTful
              APIs with Spring Boot and pair them with responsive React/Redux front ends. Most of
              my recent work sits around JPA/Hibernate, PostgreSQL, and securing services with
              JWT and Spring Security — plus a custom search engine I built using inverted
              indexing and a Trie-based autocomplete that cut query latency by 70%.
            </p>
            <p>
              Before that, I interned at Curer (Maven Lifecare Technologies), building
              appointment and telehealth flows with Angular, Agora, and Firebase. I graduated
              from {education.school.split('(')[0].trim()} with a B.Tech in Computer Science, and
              outside of work I compete on LeetCode and CodeChef — partly for the practice,
              partly because I just like solving puzzles (see the Games section).
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-wide text-ink-faint mb-1">{f.label}</dt>
                <dd className="text-ink font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </FadeContent>
      </div>
    </section>
  );
}
