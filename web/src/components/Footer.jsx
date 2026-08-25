import { Link } from 'react-router-dom';
import { profile } from '../data/resume';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-faint">
        <p>© {new Date().getFullYear()} {profile.name}. Built from scratch — no template.</p>
        <div className="flex items-center gap-5">
          <Link to="/games" className="hover:text-ink-soft transition-colors">
            Games
          </Link>
          <a href={profile.links.github} target="_blank" rel="noopener" className="hover:text-ink-soft transition-colors">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener" className="hover:text-ink-soft transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
