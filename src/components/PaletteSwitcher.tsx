import React, { useEffect, useRef, useState } from 'react';
import { Palette as PaletteIcon } from 'lucide-react';
import { PALETTES, PaletteId, Palette } from '../utils/palettes';
import { Language } from '../types';

interface PaletteSwitcherProps {
  value: PaletteId;
  onChange: (id: PaletteId) => void;
  lang: Language;
  ariaLabel: string;
}

/** Mosaic preview: big board tile on the left, lit / unlit / blended tiles on the right. */
const Swatch: React.FC<{ p: Palette }> = ({ p }) => (
  <span
    aria-hidden
    className="grid grid-cols-[2fr_1fr_1fr] grid-rows-2 h-11 rounded-[9px] overflow-hidden"
    style={{ boxShadow: 'inset 0 0 0 1px rgba(128,128,128,.3)' }}
  >
    <i className="block row-span-2" style={{ background: p.bg }} />
    <i className="block" style={{ background: p.ink }} />
    <i className="block" style={{ background: `color-mix(in srgb, ${p.ink} 55%, ${p.bg})` }} />
    <i className="block col-span-2" style={{ background: `color-mix(in srgb, ${p.ink} 22%, ${p.bg})` }} />
  </span>
);

/**
 * "Theme" button that opens a grid of palette cards (swatch + name),
 * same picker pattern as the colour palette on the Wikimedia poster page.
 */
export const PaletteSwitcher: React.FC<PaletteSwitcherProps> = ({ value, onChange, lang, ariaLabel }) => {
  const [open, setOpen] = useState(false);
  const [popTop, setPopTop] = useState(0); // phones: popover is fixed, full width, below the button
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = PALETTES.find((p) => p.id === value) ?? PALETTES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onCardKey = (e: React.KeyboardEvent, idx: number) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = PALETTES[(idx + dir + PALETTES.length) % PALETTES.length];
    onChange(next.id);
    wrapRef.current?.querySelector<HTMLButtonElement>(`[data-pal="${next.id}"]`)?.focus();
  };

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        title={ariaLabel}
        onClick={(e) => {
          setPopTop(e.currentTarget.getBoundingClientRect().bottom + 8);
          setOpen((o) => !o);
        }}
        className="h-10 gap-2 px-3 rounded-full flex items-center border border-[color:var(--line)] bg-[color:var(--surface)] text-sm font-bold text-[color:var(--ink)] hover:border-[color:var(--ink)] transition-colors"
      >
        <PaletteIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{current.name[lang]}</span>
        <span
          aria-hidden
          className="w-4 h-4 rounded-full"
          style={{ background: `linear-gradient(135deg, ${current.bg} 50%, ${current.ink} 50%)`, boxShadow: '0 0 0 1px rgba(128,128,128,.45)' }}
        />
      </button>

      {open && (
        <div
          style={{ '--pop-top': `${popTop}px` } as React.CSSProperties}
          className="fixed left-3 right-3 top-[var(--pop-top)] sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[420px] z-50 p-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] shadow-2xl"
        >
          <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2 text-[color:var(--ink)]">{ariaLabel}</div>
          <div role="radiogroup" aria-label={ariaLabel} className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-2.5">
            {PALETTES.map((p, idx) => {
              const active = p.id === value;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  data-pal={p.id}
                  tabIndex={active ? 0 : -1}
                  onClick={() => onChange(p.id)}
                  onKeyDown={(e) => onCardKey(e, idx)}
                  className="flex flex-col gap-2 p-2 rounded-[14px] border bg-[color:var(--surface)] text-[color:var(--ink)] text-[13px] font-semibold text-left cursor-pointer transition-[border-color,box-shadow] hover:border-[color:var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: active ? 'var(--ink)' : 'var(--line)',
                    boxShadow: active ? '0 0 0 2px color-mix(in srgb, var(--ink) 35%, transparent)' : undefined,
                  }}
                >
                  <Swatch p={p} />
                  <span>{p.name[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
