import FadeContent from '../../components/reactbits/FadeContent';
import { education } from '../../data/resume';

const facts = [
  { label: 'Based in', value: 'Gurgaon, India' },
  { label: 'Education', value: 'B.Tech CSE, IIIT Sonepat' },
  { label: 'Currently', value: 'SWE @ Deloitte' },
  { label: 'Focus', value: 'Backend Dev, Agentic AI' },
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
            Building, Solving & Exploring
          </h2>
          <div className="space-y-4 text-ink-soft leading-relaxed">
            <p>
              I’m a Software Engineer at Deloitte with a strong problem-solving 
              mindset and an interest in building scalable, user-focused applications.
               I enjoy working across the full stack, exploring new technologies, and 
               solving challenging engineering problems. I’m particularly interested in 
               Agentic AI and multi-agent systems, and how intelligent agents can be 
               used to build more autonomous and efficient software.
            </p>
            <p>
          I hold a B.Tech in Computer Science from the Indian Institute of Information Technology. 
          Outside of work, I enjoy trekking and swimming, which help me stay active, 
          curious, and balanced.
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
