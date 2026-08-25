import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/resume';

const homeLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sectionHref = (href) => (isHome ? href : `/${href}`);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-serif text-lg tracking-tight text-ink">
          Hemant Arya Panwar
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
          {homeLinks.map((l) => (
            <a key={l.href} href={sectionHref(l.href)} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
          <Link to="/games" className="hover:text-ink transition-colors">
            Games
          </Link>
          <a href={sectionHref('#contact')} className="hover:text-ink transition-colors">
            Contact
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={profile.links.resume}
            download
            className="text-sm border border-ink/70 rounded-full px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block w-5 h-px bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-paper px-6 py-4 flex flex-col gap-4 text-sm text-ink-soft">
          {homeLinks.map((l) => (
            <a key={l.href} href={sectionHref(l.href)} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link to="/games" onClick={() => setOpen(false)}>
            Games
          </Link>
          <a href={sectionHref('#contact')} onClick={() => setOpen(false)}>
            Contact
          </a>
          <a href={profile.links.resume} download>
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}
