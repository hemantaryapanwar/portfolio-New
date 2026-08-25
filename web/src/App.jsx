import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Games from './pages/Games';
import Sudoku from './pages/Sudoku';

const Resume = lazy(() => import('./pages/Resume'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/sudoku" element={<Sudoku />} />
          <Route
            path="/resume"
            element={
              <Suspense
                fallback={<p className="pt-40 text-center text-sm text-ink-faint">Loading…</p>}
              >
                <Resume />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
}
