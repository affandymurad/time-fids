import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { City, ThemeMode, DotColor, TimeDetails, BoardLabelMode, Language } from '../types';
import { FidsDotCharacter } from './FidsDotCharacter';
import { CountryFlag } from './CountryFlag';
import { getTimeZoneAbbr } from '../utils/timeZones';
import { AddToCalendarMenu } from './AddToCalendarMenu';
import { CalendarEvent } from '../utils/calendar';
import { playRemoveSound } from '../utils/audio';
import { TRANSLATIONS, getCityName, getCountryName, getTimeZoneName } from '../utils/i18n';
import wikipediaLogo from '../assets/wikipedia-logo.svg';
import { createPortal } from 'react-dom';
import { Home, X, Trash2, Moon, Briefcase, Globe2, Sun, Building2, Clock } from 'lucide-react';

// "NEW YORK" -> "New York", "ST. JOHN'S" -> "St. John's", drops "(DT)"/"(ST)" suffixes
const toTitleCase = (name: string) =>
  name.length <= 3 ? name : // short acronyms (UTC) stay as written
  name
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(^|[\s.\-'])([a-zà-ÿ])/g, (_m, sep: string, ch: string) => sep + ch.toUpperCase())
    .replace(/'S\b/g, "'s");

// Wikipedia in the active UI language, searching by the full city name (jumps straight to the page if it exists)
const wikipediaUrl = (city: City, lang: Language) => {
  const host = `https://${lang === 'id' ? 'id' : 'en'}.wikipedia.org`;
  const exact = city.wikiTitle?.[lang];
  if (exact) return `${host}/wiki/${encodeURIComponent(exact)}`;
  return `${host}/wiki/Special:Search?go=Go&search=${encodeURIComponent(toTitleCase(city.name))}`;
};


// Subscribes to a media query (used to switch between wide and narrow row layouts)
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// Shrinks its content to fit the available width (never scrolls, never wraps)
const FitLine: React.FC<{
  watch: string;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ watch, onClick, title, children }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, height: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const scale = Math.min(1, outer.clientWidth / inner.scrollWidth);
      const height = Math.ceil(inner.offsetHeight * scale);
      setFit((p) => (Math.abs(p.scale - scale) < 0.001 && p.height === height ? p : { scale, height }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [watch]);
  return (
    <div
      ref={outerRef}
      className="flex-1 min-w-0 w-full flex items-center overflow-hidden cursor-pointer py-0.5"
      style={fit.height ? { height: fit.height } : undefined}
      onClick={onClick}
      title={title}
    >
      <div ref={innerRef} className="w-max" style={{ transform: `scale(${fit.scale})`, transformOrigin: 'left center' }}>
        {children}
      </div>
    </div>
  );
};

interface FidsBoardRowProps {
  city: City;
  timeDetails: TimeDetails;
  isHome: boolean;
  canDelete?: boolean;
  totalCityColumns?: number;
  theme: ThemeMode;
  dotColor: DotColor;
  soundEnabled: boolean;
  use24Hour: boolean;
  globalLabelMode: BoardLabelMode;
  lang: Language;
  eventDate: Date;
  /** Render without its own card (used inside the Current Time section). */
  embedded?: boolean;
  /** True for a row that was just added (plays the enter animation). */
  entering?: boolean;
  /** Compact card layout for the grid: time + actions on top, name below (regardless of screen width). */
  stacked?: boolean;
  /** Small date caption shown at the top of a stacked card. */
  caption?: React.ReactNode;
  onSetHome: (city: City) => void;
  onRemoveCity: (cityId: string) => void;
}

export const FidsBoardRow: React.FC<FidsBoardRowProps> = ({
  city,
  timeDetails,
  isHome,
  canDelete = true,
  totalCityColumns = 16,
  theme,
  dotColor,
  soundEnabled,
  use24Hour,
  globalLabelMode,
  lang,
  eventDate,
  embedded = false,
  entering = false,
  stacked = false,
  caption,
  onSetHome,
  onRemoveCity,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [localLabelMode, setLocalLabelMode] = useState<'city' | 'timezone' | null>(null);
  const t = TRANSLATIONS[lang];

  const effectiveMode = localLabelMode || (globalLabelMode === 'timezone' ? 'timezone' : 'city');

  // Determine what text to show in the FIDS dot matrix row
  let textToDisplay = getCityName(city, lang);
  if (effectiveMode === 'timezone') {
    const abbr = getTimeZoneAbbr(city.timezone, city.tzAbbr, new Date(), city.countryCode);
    if (abbr && abbr !== timeDetails.offsetStr && !abbr.startsWith("GMT")) {
      textToDisplay = `${abbr} ${timeDetails.offsetStr}`.toUpperCase();
    } else {
      textToDisplay = `${city.timezone.split('/')[1] || city.timezone} ${timeDetails.offsetStr}`.toUpperCase();
    }
  }

  // Time string (e.g. "23:11" or "11:11")
  const timeStr = use24Hour ? timeDetails.time24 : timeDetails.time12.slice(0, 5);
  // 12-hour mode: append "A" (AM) or "P" (PM) marker right after the time
  const periodChar = use24Hour
    ? ''
    : (timeDetails.period || (timeDetails.time12.endsWith('PM') ? 'PM' : 'AM')).charAt(0);
  const timeChars = timeStr.split('');


  // Text display padded with spaces up to totalCityColumns
  const labelPadded = textToDisplay.padEnd(Math.max(totalCityColumns, textToDisplay.length), ' ');

  const isDark = theme === 'dark';

  // Delete: play a soft sound and collapse the row before it is removed
  const rootRef = useRef<HTMLDivElement>(null);
  const handleDelete = () => {
    if (!canDelete) return;
    if (soundEnabled) playRemoveSound();
    const el = rootRef.current;
    if (!el || embedded || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onRemoveCity(city.id);
      return;
    }
    el.style.height = `${el.offsetHeight}px`;
    el.style.overflow = 'hidden';
    void el.offsetHeight; // force reflow so the transition starts from the current height
    el.style.transition = 'height 0.3s ease, opacity 0.25s ease, transform 0.3s ease, margin 0.3s ease, padding 0.3s ease, border-width 0.3s ease';
    el.style.height = '0px';
    el.style.opacity = '0';
    el.style.transform = 'translateX(28px)';
    el.style.marginTop = '0px';
    el.style.marginBottom = '0px';
    el.style.paddingTop = '0px';
    el.style.paddingBottom = '0px';
    el.style.borderWidth = '0px';
    window.setTimeout(() => onRemoveCity(city.id), 300);
  };
  const isWideScreen = useMediaQuery('(min-width: 640px)');
  const isWide = isWideScreen && !stacked;

  // Calendar event for the moment currently shown on the board (1 hour long)
  const cityLabel = getCityName(city, lang);
  const shownTime = use24Hour ? timeDetails.time24 : timeDetails.time12;
  const calendarEvent: CalendarEvent = {
    title: `${cityLabel} — ${shownTime}`,
    description: [
      `${cityLabel}, ${getCountryName(city.country, lang, city.countryCode)}`,
      `${t.calEventTime}: ${timeDetails.fullDateStr}, ${shownTime}`,
      `${t.calEventZone}: ${getTimeZoneName(city.timezone, eventDate, lang)} (${city.timezone}, ${timeDetails.offsetStr})`,
      '',
      t.calEventNote,
    ].join('\n'),
    start: new Date(Math.floor(eventDate.getTime() / 60000) * 60000), // whole minute
    durationMinutes: 60,
    timezone: city.timezone,
  };
  const toggleDetails = () => setShowDetails((v) => !v);
  useEffect(() => {
    if (!showDetails) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowDetails(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showDetails]);
  const rowTitle = lang === 'id' ? 'Klik untuk melihat detail lengkap' : 'Click to see full details';

  const timeEl = (
    <div className="flex items-center flex-shrink-0">
      <div className="flex items-center gap-0.5 sm:gap-1.5 flex-shrink-0">
        {timeChars.map((char, idx) => (
          <div key={`time-${idx}`}>
            <FidsDotCharacter char={char} theme={theme} dotColor={dotColor} soundEnabled={soundEnabled} maxWidth={stacked ? 34 : undefined} />
          </div>
        ))}
      </div>
      {/* AM/PM marker (A / P) separated from the time digits */}
      {periodChar && (
        <>
          <div className="w-2 sm:w-4 flex-shrink-0" />
          <div className="flex items-center flex-shrink-0">
            <FidsDotCharacter char={periodChar} theme={theme} dotColor={dotColor} soundEnabled={soundEnabled} maxWidth={stacked ? 34 : undefined} />
          </div>
        </>
      )}
    </div>
  );

  const labelEl = (
    <div className="flex items-center gap-0.5 sm:gap-1.5 flex-shrink-0">
      {labelPadded.split('').map((char, idx) => (
        <div key={`label-${idx}`}>
          <FidsDotCharacter char={char} theme={theme} dotColor={dotColor} soundEnabled={soundEnabled} maxWidth={stacked ? 19 : undefined} />
        </div>
      ))}
    </div>
  );

  const modeToggle = (
  <button
    onClick={() =>
      setLocalLabelMode((prev) =>
        (prev || (globalLabelMode === 'timezone' ? 'timezone' : 'city')) === 'city'
          ? 'timezone'
          : 'city'
      )
    }
    title={
      effectiveMode === 'city'
        ? lang === 'id' ? 'Tampilkan Zona Waktu' : 'Show Timezone'
        : lang === 'id' ? 'Tampilkan Nama Kota' : 'Show City'
    }
    className={`px-2.5 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5 border transition-all ${
      effectiveMode === 'city'
        ? isDark
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
          : 'bg-amber-600 text-white border-amber-600 hover:bg-amber-900'
        : isDark
        ? 'bg-slate-600 text-white border-slate-500 hover:bg-slate-500'
        : 'bg-slate-800 text-white border-slate-800 hover:bg-slate-950'
    }`}
  >
    {effectiveMode === 'city' ? <Building2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
    <span>{effectiveMode === 'city' ? t.city : t.timezone}</span>
  </button>
  );

  const dock = (
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 pl-2">

          {/* Badge marking the reference city ("My City") */}
          {isHome && (
            <span
              title={t.myCityHelp}
              className={`px-2.5 py-1 text-xs sm:text-sm font-mono font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap ${
                isDark
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/25" />
              {t.home}
            </span>
          )}

          {/* Secondary actions: quiet until the card is hovered/focused on desktop, always visible on touch */}
          <div className={`flex items-center gap-1.5 sm:gap-2 ${embedded ? '' : 'row-actions'}`}>
          {/* Add this moment to a calendar (Google / Apple iCal / Outlook.com / Office 365 / Yahoo) */}
          <AddToCalendarMenu
            event={calendarEvent}
            isDark={isDark}
            buttonLabel={t.addToCalendar}
            fileName={getCityName(city, lang)}
            labels={{
              google: t.calGoogle,
              apple: t.calApple,
              outlook: t.calOutlook,
              office365: t.calOffice365,
              yahoo: t.calYahoo,
            }}
          />

          {/* ALWAYS VISIBLE SEPARATED DELETE BUTTON */}
          <button
            onClick={handleDelete}
            disabled={!canDelete}
            title={
              !canDelete
                ? (lang === 'id' ? 'Minimal harus tersisa 1 kota' : 'At least one city required')
                : `${t.deleteCity}: ${getCityName(city, lang)}`
            }
            className={`p-1.5 sm:p-2 rounded-lg font-medium transition-all ${
              !canDelete
                ? 'opacity-25 cursor-not-allowed text-slate-500 bg-slate-500/10 border border-slate-500/20 shadow-none'
                : isDark
                ? 'text-rose-400 bg-rose-500/10 hover:bg-rose-500/25 hover:text-rose-300 border border-rose-500/20'
                : 'text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-300'
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          </div>
        </div>
  );

  const tzName = getTimeZoneName(city.timezone, new Date(), lang);
  const tzAbbrNow = getTimeZoneAbbr(city.timezone, city.tzAbbr, new Date(), city.countryCode);
  const showAbbr = /^[A-Za-z]{2,5}$/.test(tzAbbrNow) && !tzName.includes(`(${tzAbbrNow})`);
  const countryLabel = getCountryName(city.country, lang, city.countryCode);
  const closeLabel = lang === 'id' ? 'Tutup' : 'Close';
  const detailRow = 'flex items-start gap-3 rounded-xl border border-[color:var(--line)] px-3.5 py-3';

  const detailsModal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
      onMouseDown={(e) => e.target === e.currentTarget && setShowDetails(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={cityLabel}
        className="w-full max-w-md rounded-2xl shadow-2xl border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink)] max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <CountryFlag countryCode={city.countryCode} countryName={countryLabel} size="md" />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold leading-tight truncate">{toTitleCase(cityLabel)}</h2>
              <p className="text-sm opacity-70 truncate">{countryLabel}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowDetails(false)}
            aria-label={closeLabel}
            className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-[color:var(--surface-2)] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Time summary */}
        <div className="mx-5 mb-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-2)] px-4 py-3 flex items-baseline justify-between gap-3 flex-wrap">
          <span className="font-mono text-3xl tracking-tight">{shownTime}</span>
          <span className="text-sm opacity-75">{timeDetails.fullDateStr} · {timeDetails.offsetStr}</span>
        </div>

        {/* Facts */}
        <div className="px-5 pb-4 overflow-y-auto space-y-2 text-[15px]">
          <div className={detailRow}>
            {timeDetails.isBusinessHours ? (
              <Briefcase className="w-4 h-4 mt-1 text-emerald-500 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 mt-1 text-indigo-500 shrink-0" />
            )}
            <span>{timeDetails.isBusinessHours ? t.businessHoursActive : timeDetails.isWeekend ? t.weekend : t.offHours}</span>
          </div>
          <div className={detailRow}>
            <Sun className={`w-4 h-4 mt-1 shrink-0 ${timeDetails.isDst ? 'text-amber-500' : 'opacity-50'}`} />
            <span>{timeDetails.isDst ? t.dstActive : t.standardTime}</span>
          </div>
          <div className={detailRow}>
            <Globe2 className="w-4 h-4 mt-1 shrink-0 opacity-60" />
            <div className="min-w-0">
              <div>
                {tzName}
                {showAbbr ? <span className="font-mono"> · {tzAbbrNow}</span> : null}
              </div>
              <div className="text-sm opacity-70 break-all">{city.timezone} ({timeDetails.offsetStr})</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-sm opacity-70">{lang === 'id' ? 'Tampilan papan' : 'Board shows'}</span>
            {modeToggle}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-3.5 border-t border-[color:var(--line)] flex flex-wrap items-center justify-between gap-2">
          <a
            href={wikipediaUrl(city, lang)}
            target="_blank"
            rel="noopener noreferrer"
            title={lang === 'id' ? `Buka Wikipedia: ${toTitleCase(city.name)}` : `Open Wikipedia: ${toTitleCase(city.name)}`}
            className="px-3 py-1.5 rounded-lg border border-[color:var(--line)] text-sm font-medium flex items-center gap-1.5 hover:border-[color:var(--ink)] transition-colors"
          >
            <img src={wikipediaLogo} alt="" className="w-4 h-4" draggable={false} />
            {city.code ? (lang === 'id' ? `Kota ${city.code}` : `${city.code} City`) : 'Wikipedia'}
          </a>
          {isHome ? (
            <span className="text-sm opacity-70">{t.myCityHelp}</span>
          ) : (
            <button
              type="button"
              onClick={() => {
                onSetHome(city);
                setShowDetails(false);
              }}
              className="tb-btn primary !h-9"
            >
              <Home className="w-4 h-4" />
              {t.setHome}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={embedded ? 'group relative pt-1' : `row-card group relative rounded-2xl transition-colors duration-200 px-3.5 py-3 sm:px-4 sm:py-3.5 border ${entering ? 'animate-row-in ' : ''}${
        isHome
          ? isDark
            ? 'bg-[color:var(--surface)]/90 hover:bg-[color:var(--surface-2)] border-emerald-700/70 ring-1 ring-emerald-600/30 shadow-md'
            : 'bg-white hover:bg-white border-emerald-400/70 ring-1 ring-emerald-500/20'
          : isDark
          ? 'bg-[color:var(--surface)]/90 hover:bg-[color:var(--surface-2)] border-[color:var(--line)] shadow-md'
          : 'bg-white hover:bg-white border-slate-300/80'
      }`}
    >
      {isWide ? (
        /* Wide: time + name on one line (scaled to fit), action dock on the right */
        <div className="flex items-center justify-between gap-6">
          <FitLine watch={`${labelPadded}|${timeChars.length}|${periodChar}`} onClick={toggleDetails} title={rowTitle}>
            <div className="flex items-center gap-3">
              {timeEl}
              <div className="w-4 md:w-6 flex-shrink-0" />
              {labelEl}
            </div>
          </FitLine>
          {dock}
        </div>
      ) : (
        /* Narrow: time + action dock on top, full-width name line below */
        <div className="flex flex-col gap-2">
          {caption && <div className="date-caption">{caption}</div>}
          <div className="flex items-center justify-between gap-3">
            <div className="cursor-pointer py-0.5" onClick={toggleDetails} title={rowTitle}>
              {timeEl}
            </div>
            {dock}
          </div>
          <FitLine watch={labelPadded} onClick={toggleDetails} title={rowTitle}>
            {labelEl}
          </FitLine>
        </div>
      )}


      {/* Details popup (opened by clicking the row) */}
      {showDetails && createPortal(detailsModal, document.body)}
    </div>
  );
};
