import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { profile } from '../data/resume';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(720);

  useEffect(() => {
    const el = document.getElementById('resume-viewer');
    if (!el) return;
    const update = () => setPageWidth(Math.min(el.clientWidth, 820));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pages = useMemo(
    () => (numPages ? Array.from({ length: numPages }, (_, i) => i + 1) : []),
    [numPages]
  );

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/" className="text-sm text-ink-faint hover:text-ink transition-colors">
          ← Back home
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink">Resume</h1>
            <p className="text-ink-soft text-sm mt-2">
              View it here, or grab a copy for yourself.
            </p>
          </div>
          <a
            href={profile.links.resume}
            download
            className="inline-flex items-center rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Download PDF
          </a>
        </div>

        <div
          id="resume-viewer"
          className="border border-line rounded-lg overflow-hidden bg-paper-alt flex flex-col items-center gap-4 p-4 sm:p-6"
        >
          <Document
            file={profile.links.resume}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<p className="py-24 text-sm text-ink-faint">Loading resume…</p>}
            error={
              <p className="py-24 text-sm text-ink-faint">
                Couldn't load the preview —{' '}
                <a href={profile.links.resume} className="underline" download>
                  download it instead
                </a>
                .
              </p>
            }
          >
            {pages.map((n) => (
              <Page
                key={n}
                pageNumber={n}
                width={pageWidth}
                className="shadow-sm mb-4 last:mb-0"
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
