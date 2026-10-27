import React, { useEffect, useRef, useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import { CalendarEvent, CalendarProvider, buildCalendarUrl, downloadIcs } from '../utils/calendar';

interface AddToCalendarMenuProps {
  event: CalendarEvent;
  isDark: boolean;
  buttonLabel: string;
  labels: Record<CalendarProvider, string>;
  fileName: string;
}

const PROVIDERS: CalendarProvider[] = ['google', 'apple', 'outlook', 'office365', 'yahoo'];

export const AddToCalendarMenu: React.FC<AddToCalendarMenuProps> = ({
  event,
  isDark,
  buttonLabel,
  labels,
  fileName,
}) => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const itemClass = `w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
    isDark ? 'text-slate-100 hover:bg-slate-700' : 'text-slate-900 hover:bg-slate-200'
  }`;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => {
          // Open upwards when there is not enough room below the button
          const r = rootRef.current?.getBoundingClientRect();
          setDropUp(!!r && window.innerHeight - r.bottom < 280 && r.top > 280);
          setOpen((v) => !v);
        }}
        title={buttonLabel}
        aria-label={buttonLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`p-1.5 sm:p-2 rounded-lg font-medium transition-all border ${
          isDark
            ? 'text-slate-200 bg-slate-700/50 hover:bg-slate-600 border-slate-600'
            : 'text-slate-800 bg-slate-200 hover:bg-slate-300 border-slate-400/70'
        }`}
      >
        <CalendarPlus className="w-4 h-4" />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute right-0 ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'} z-50 w-56 p-1.5 rounded-xl border shadow-xl ${
            isDark ? 'bg-[color:var(--surface-2)] border-[color:var(--line)]' : 'bg-white border-slate-400/70'
          }`}
        >
          <div
            className={`px-3 pt-1.5 pb-1 text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {buttonLabel}
          </div>
          {PROVIDERS.map((p) =>
            p === 'apple' ? (
              <button
                key={p}
                type="button"
                role="menuitem"
                className={itemClass}
                onClick={() => {
                  downloadIcs(event, fileName);
                  setOpen(false);
                }}
              >
                {labels[p]}
              </button>
            ) : (
              <a
                key={p}
                role="menuitem"
                href={buildCalendarUrl(p, event)}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClass}
                onClick={() => setOpen(false)}
              >
                {labels[p]}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
};
