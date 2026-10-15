import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { City, ThemeMode, DotColor, TimeDetails, BoardLabelMode, Language } from '../types';
import { FidsDotCharacter } from './FidsDotCharacter';
import { CountryFlag } from './CountryFlag';
import { getTimeZoneAbbr } from '../utils/timeZones';
import { AddToCalendarMenu } from './AddToCalendarMenu';
import { CalendarEvent } from '../utils/calendar';
import { TRANSLATIONS, getCityName, getCountryName, getTimeZoneName } from '../utils/i18n';
import wikipediaLogo from '../assets/wikipedia-logo.svg';
import { Home, Trash2, Moon, Briefcase, Globe2, Sun, Building2, Clock } from 'lucide-react';

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
  onSetHome,
  onRemoveCity,
}) => {
  const [showDetails, setShowDetails] = useState(true);
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
  const isWide = useMediaQuery('(min-width: 640px)');

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
  const rowTitle = lang === 'id' ? 'Klik untuk melihat detail lengkap' : 'Click to see full details';

  const timeEl = (
    <div className="flex items-center flex-shrink-0">
      <div className="flex items-center gap-0.5 sm:gap-1.5 flex-shrink-0">
        {timeChars.map((char, idx) => (
          <div key={`time-${idx}`}>
            <FidsDotCharacter char={char} theme={theme} dotColor={dotColor} soundEnabled={soundEnabled} />
          </div>
        ))}
      </div>
      {/* AM/PM marker (A / P) separated from the time digits */}
      {periodChar && (
        <>
          <div className="w-2 sm:w-4 flex-shrink-0" />
          <div className="flex items-center flex-shrink-0">
            <FidsDotCharacter char={periodChar} theme={theme} dotColor={dotColor} soundEnabled={soundEnabled} />
          </div>
        </>
      )}
    </div>
  );

  const labelEl = (
    <div className="flex items-center gap-0.5 sm:gap-1.5 flex-shrink-0">
      {labelPadded.split('').map((char, idx) => (
        <div key={`label-${idx}`}>
          <FidsDotCharacter char={char} theme={theme} dotColor={dotColor} soundEnabled={soundEnabled} />
        </div>
      ))}
    </div>
  );

  const dock = (
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 pl-2">

          {/* Home indicator pill or Set Home button */}
          {isHome ? (
            <span
              className={`px-2.5 py-1 text-sm font-bold rounded-full flex items-center gap-1 shadow-xs ${
                isDark
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              <Home className="w-3 h-3" />
              {t.home}
            </span>
          ) : (
            <button
              onClick={() => onSetHome(city)}
              title={t.setHome}
              className={`px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                isDark
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  : 'hover:bg-slate-200 text-slate-800 hover:text-slate-950'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.setHome}</span>
            </button>
          )}

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
            onClick={() => canDelete && onRemoveCity(city.id)}
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
  );

  return (
    <div
      className={`group relative rounded-xl transition-all duration-200 px-3 py-2.5 sm:px-4 sm:py-3 border ${
        isDark
          ? 'bg-[#131c27]/90 hover:bg-[#192432] border-[#2f4157] shadow-md'
          : 'bg-white/85 hover:bg-white border-slate-300/80 shadow-xs'
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


      {/* Expanded details bar (Toggled on click) */}
      {showDetails && (
        <div
          className={`mt-2.5 pt-2.5 border-t text-sm flex flex-wrap items-center justify-between gap-3 ${
            isDark ? "border-slate-700 text-slate-200" : "border-slate-300 text-slate-800"
          }`}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-1.5">
              {timeDetails.isBusinessHours ? (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span className={`font-bold ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>{t.businessHoursActive}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{timeDetails.isWeekend ? t.weekend : t.offHours}</span>
                </>
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Sun className={`w-3.5 h-3.5 ${timeDetails.isDst ? 'text-amber-500' : 'text-slate-500'}`} />
              <span className={timeDetails.isDst ? 'font-bold' : ''}>
                {timeDetails.isDst ? t.dstActive : t.standardTime}
              </span>
            </span>
            <span className="flex items-start gap-1.5 min-w-0">
              <Globe2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500" />
              <span className="min-w-0">
              {t.timezone}:{" "}
              <strong className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                {getTimeZoneName(city.timezone, new Date(), lang)}
              </strong>
              {(() => {
                const abbr = getTimeZoneAbbr(city.timezone, city.tzAbbr, new Date(), city.countryCode);
                return /^[A-Za-z]{2,5}$/.test(abbr) && !getTimeZoneName(city.timezone, new Date(), lang).includes(`(${abbr})`) ? <span className="font-mono font-bold"> · {abbr}</span> : null;
              })()}{" "}
              ({city.timezone}, {timeDetails.offsetStr})
              </span>
            </span>
    {/* Toggle between City Name and Timezone Name for this item */}
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
          </div>
          <div className="flex items-center gap-2">
            <CountryFlag countryCode={city.countryCode} countryName={getCountryName(city.country, lang, city.countryCode)} size="sm" />
            <span>{getCountryName(city.country, lang, city.countryCode)}</span>
            {(
              <a
                href={wikipediaUrl(city, lang)}
                target="_blank"
                rel="noopener noreferrer"
                title={lang === "id" ? `Buka Wikipedia: ${toTitleCase(city.name)}` : `Open Wikipedia: ${toTitleCase(city.name)}`}
                className="ml-3 sm:ml-5 px-1.5 py-0.5 rounded-sm bg-slate-200 hover:bg-slate-300 text-slate-900 border border-slate-300 dark:bg-slate-500/20 font-mono text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <img src={wikipediaLogo} alt="Wikipedia" className="w-4 h-4" draggable={false} />
                {city.code ? (lang === "id" ? `Kota ${city.code}` : `${city.code} City`) : "Wikipedia"}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
