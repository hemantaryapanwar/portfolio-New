import FadeContent from '../../components/reactbits/FadeContent';
import { profile } from '../../data/resume';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <FadeContent duration={700} threshold={0.2}>
          <p className="text-sm tracking-wide text-ink-faint uppercase mb-4">Contact</p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink max-w-2xl mx-auto mb-5">
            Let's build something reliable together.
          </h2>
          <p className="text-ink-soft max-w-md mx-auto mb-10">
            Open to backend-heavy full-stack roles at product companies. Feel free to reach
            out — I reply fast.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Email me
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full border border-ink/70 px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <a href={`mailto:${profile.email}`} className="hover:text-ink transition-colors">
              {profile.email}
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener" className="hover:text-ink transition-colors">
              GitHub
            </a>
            <a href={profile.links.leetcode} target="_blank" rel="noopener" className="hover:text-ink transition-colors">
              LeetCode
            </a>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
