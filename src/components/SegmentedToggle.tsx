import React from 'react';

export interface SegmentOption<T extends string> {
  value: T;
  label: React.ReactNode;
  /** Accessible name / tooltip for the segment. */
  title: string;
}

interface SegmentedToggleProps<T extends string> {
  options: [SegmentOption<T>, SegmentOption<T>];
  value: T;
  onChange: (value: T) => void;
  isDark: boolean;
  ariaLabel: string;
}

/**
 * Two-option pill switch with a sliding highlight.
 * Same height / border / width as the other header controls so they line up.
 */
export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  isDark,
  ariaLabel,
}: SegmentedToggleProps<T>) {
  const index = Math.max(0, options.findIndex((o) => o.value === value));

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      style={{ width: 92 }}
      className={`relative h-10 shrink-0 rounded-full grid grid-cols-2 border select-none ${
        isDark ? 'bg-[#131c27] border-[#2f4157]' : 'bg-white border-slate-300'
      }`}
    >
      {/* Sliding highlight: left edge + width match the grid columns exactly */}
      <span
        aria-hidden
        className={`absolute top-1 bottom-1 left-1 rounded-full shadow-sm transition-transform duration-300 ease-out ${
          isDark ? 'bg-amber-500' : 'bg-amber-600'
        }`}
        style={{ width: 'calc(50% - 4px)', transform: `translateX(${index * 100}%)` }}
      />
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.title}
            title={o.title}
            onClick={() => onChange(o.value)}
            className={`relative z-10 flex items-center justify-center rounded-full text-sm font-black transition-colors duration-200 ${
              active
                ? isDark
                  ? 'text-slate-950'
                  : 'text-white'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
