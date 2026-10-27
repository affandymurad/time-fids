import React from 'react';
import { PALETTES, PaletteId } from '../utils/palettes';
import { Language } from '../types';

interface PaletteSwitcherProps {
  value: PaletteId;
  onChange: (id: PaletteId) => void;
  lang: Language;
  ariaLabel: string;
}

/**
 * Row of round board swatches (same idea as the theme picker on flapdot.com).
 * Each swatch previews the palette: board color + lit/unlit dots.
 */
export const PaletteSwitcher: React.FC<PaletteSwitcherProps> = ({ value, onChange, lang, ariaLabel }) => (
  <div
    role="radiogroup"
    aria-label={ariaLabel}
    className="inline-flex items-center gap-1 h-10 px-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] shrink-0"
  >
    {PALETTES.map((p) => {
      const active = p.id === value;
      const name = p.name[lang];
      return (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={active}
          aria-label={name}
          title={name}
          onClick={() => onChange(p.id)}
          className="relative w-[30px] h-[30px] rounded-full flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {active && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: '0 0 0 2px var(--ink)' }}
            />
          )}
          <span
            aria-hidden
            className="grid grid-cols-[5px_5px] gap-[2px] place-content-center w-6 h-6 rounded-full"
            style={{ background: p.bg, boxShadow: 'inset 0 0 0 1px rgba(128,128,128,.35)' }}
          >
            <i className="block w-[5px] h-[5px] rounded-full" style={{ background: p.ink }} />
            <i className="block w-[5px] h-[5px] rounded-full" style={{ background: p.off }} />
            <i className="block w-[5px] h-[5px] rounded-full" style={{ background: p.off }} />
            <i className="block w-[5px] h-[5px] rounded-full" style={{ background: p.ink }} />
          </span>
        </button>
      );
    })}
  </div>
);
