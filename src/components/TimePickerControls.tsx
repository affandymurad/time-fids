import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ThemeMode, City, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { getTimeDetails, setTimeForTimezone } from '../utils/timeZones';
import { RefreshCw, Clock, Sparkles, Sliders, Check } from 'lucide-react';

interface TimePickerControlsProps {
  currentDate: Date;
  isAutoSync: boolean;
  homeCity: City;
  theme: ThemeMode;
  lang: Language;
  onDateChange: (newDate: Date) => void;
  onToggleAutoSync: () => void;
  onSyncNow: () => void;
}

type DropdownSection = 'hour' | 'minute' | 'day' | 'month' | 'year' | null;

export const TimePickerControls: React.FC<TimePickerControlsProps> = ({
  currentDate,
  isAutoSync,
  homeCity,
  theme,
  lang,
  onDateChange,
  onSyncNow,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownSection>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  // 1. EXTRACT DATE SEGMENTS DIRECTLY FROM HOME CITY'S TIMEZONE
  // This guarantees 100% synchronization with the row that is marked as Home!
  const homeDetails = useMemo(() => {
    return getTimeDetails(currentDate, homeCity.timezone, homeCity.timezone, lang);
  }, [currentDate, homeCity.timezone, lang]);

  const hours = parseInt(homeDetails.hoursStr, 10);
  const minutes = parseInt(homeDetails.minutesStr, 10);
  const day = parseInt(homeDetails.dayNumber, 10);
  const month = homeDetails.monthNumber - 1; // 0-11
  const year = homeDetails.yearNumber;

  // Days in month for the current home city's year and month
  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const daysList = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [daysInMonth]);

  const yearsList = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => 2024 + i);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-scroll dropdown active item into view
  useEffect(() => {
    if (openDropdown && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [openDropdown]);

  // Adjust section by relative delta
  const updateSectionDelta = useCallback(
    (part: 'hour' | 'minute' | 'day' | 'month' | 'year', delta: number) => {
      if (part === 'hour') {
        const nextDate = new Date(currentDate.getTime() + delta * 3600 * 1000);
        onDateChange(nextDate);
      } else if (part === 'minute') {
        const nextDate = new Date(currentDate.getTime() + delta * 60 * 1000);
        onDateChange(nextDate);
      } else if (part === 'day') {
        const nextDate = new Date(currentDate.getTime() + delta * 86400 * 1000);
        onDateChange(nextDate);
      } else if (part === 'month') {
        const targetMonth = (month + delta + 12) % 12;
        const nextDate = setTimeForTimezone(currentDate, homeCity.timezone, { month: targetMonth });
        onDateChange(nextDate);
      } else if (part === 'year') {
        const nextDate = setTimeForTimezone(currentDate, homeCity.timezone, { year: year + delta });
        onDateChange(nextDate);
      }
    },
    [currentDate, homeCity.timezone, month, year, onDateChange]
  );

  // Set section to an exact value
  const setExactSectionValue = useCallback(
    (part: 'hour' | 'minute' | 'day' | 'month' | 'year', value: number) => {
      const nextDate = setTimeForTimezone(currentDate, homeCity.timezone, { [part]: value });
      onDateChange(nextDate);
    },
    [currentDate, homeCity.timezone, onDateChange]
  );

  // Direct mouse wheel scroll on card
  const handleCardWheel = (
    e: React.WheelEvent,
    part: 'hour' | 'minute' | 'day' | 'month' | 'year'
  ) => {
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 1 : -1;
    updateSectionDelta(part, delta);
  };

  // Quick preset handlers
  const handlePreset = (type: string) => {
    if (type === 'now') {
      onSyncNow();
      return;
    }
    if (type === 'plus1') {
      onDateChange(new Date(currentDate.getTime() + 3600 * 1000));
    } else if (type === 'plus3') {
      onDateChange(new Date(currentDate.getTime() + 3 * 3600 * 1000));
    } else if (type === 'workHour') {
      const nextDate = setTimeForTimezone(currentDate, homeCity.timezone, { hour: 9, minute: 0 });
      onDateChange(nextDate);
    } else if (type === 'tomorrow9') {
      const tomorrow = new Date(currentDate.getTime() + 86400 * 1000);
      const nextDate = setTimeForTimezone(tomorrow, homeCity.timezone, { hour: 9, minute: 0 });
      onDateChange(nextDate);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl transition-all duration-300 border relative z-20 ${
        isDark
          ? 'bg-[#131c27] border-[#1e2b3b] text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      } p-3.5 sm:p-5`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status indicator & Home city anchor */}
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isAutoSync
                ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20'
                : 'bg-amber-500 ring-4 ring-amber-500/30'
            }`}
          />
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                className={`text-sm font-bold tracking-wider uppercase ${
                  isDark ? 'text-amber-400' : 'text-slate-800'
                }`}
              >
                {isAutoSync ? t.liveSync : t.customTime}
              </span>
              <span
                className={`text-sm px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wide whitespace-nowrap shrink-0 ${
                  isAutoSync
                    ? isDark
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : isDark
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {isAutoSync ? t.liveBadge : t.customBadge}
              </span>
            </div>
            <p
              className={`text-sm font-medium mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {t.homeAnchor}:{' '}
              <strong
                className={`font-bold ${
                  isDark ? 'text-amber-300' : 'text-slate-900'
                }`}
              >
                {homeCity.name}
              </strong>{' '}
              <span className={`font-mono ${isDark ? 'text-slate-600 dark:text-slate-400' : 'text-slate-600 dark:text-slate-400'}`}>
                ({homeCity.tzAbbr || homeCity.timezone})
              </span>
            </p>
          </div>
        </div>

        {/* Action buttons: Sync now & Drawer toggle */}
        <div className="flex items-center gap-2">
          {!isAutoSync && (
            <button
              onClick={onSyncNow}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                isDark
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 ring-2 ring-amber-400/30 font-black'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.syncNow}</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (isExpanded) setOpenDropdown(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5 border transition-all ${
              isDark
                ? 'bg-[#192432] hover:bg-[#233246] text-slate-200 border-[#2f4157]'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-400/70'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            <span>{isExpanded ? t.closePicker : t.setTimeDate}</span>
          </button>
        </div>
      </div>

      {/* Expanded Segmented Time & Date Pickers with Real Scrollable Dropdowns */}
      {isExpanded && (
        <div
          className={`mt-4 pt-4 border-t space-y-4 ${
            isDark ? 'border-slate-800/80 text-slate-200' : 'border-slate-200 text-slate-700'
          }`}
        >
          <div
            className={`text-sm flex items-center justify-between font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              {lang === 'id'
                ? 'Klik tiap item untuk membuka menu dropdown scroll, atau scroll mouse langsung di atas kotak:'
                : 'Click any item to open scrollable dropdown, or scroll mouse directly over cards:'}
            </span>
            <span className="text-sm font-mono text-amber-500 dark:text-amber-400 hidden sm:inline">
              {t.scrollHint}
            </span>
          </div>

          {/* 5 Segmented Cards Grid (Overflow visible so dropdowns never cut off) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3.5 relative overflow-visible">
            {/* 1. JAM (HOURS: 00 - 23) */}
            <div
              className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all select-none relative ${
                openDropdown === 'hour'
                  ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-500/10 z-40'
                  : isDark
                  ? 'bg-[#131c27] border-[#2f4157] hover:bg-[#192432] z-10'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 z-10'
              }`}
            >
              <div className="w-full text-center text-sm font-bold tracking-wider uppercase text-slate-400">
                <span>{t.hours}</span>
              </div>

              {/* Trigger clickable dropdown */}
              <div
                onWheel={(e) => handleCardWheel(e, 'hour')}
                onClick={() => setOpenDropdown(openDropdown === 'hour' ? null : 'hour')}
                className={`my-1 font-mono text-3xl font-extrabold tracking-tight cursor-pointer transition-colors flex items-center justify-center ${
                  openDropdown === 'hour'
                    ? 'text-amber-400'
                    : isDark
                    ? 'text-white hover:text-amber-400'
                    : 'text-slate-900 hover:text-amber-600'
                }`}
                title={lang === 'id' ? 'Klik untuk memilih jam' : 'Click to select hours'}
              >
                <span>{String(hours).padStart(2, '0')}</span>
              </div>

              <div className="w-full text-center text-sm text-slate-400 font-medium">
                <span
                  onClick={() => setOpenDropdown(openDropdown === 'hour' ? null : 'hour')}
                  className="cursor-pointer hover:underline text-amber-500 hover:text-amber-400 transition-colors"
                >
                  00-23
                </span>
              </div>

              {/* Dropdown Menu for Hour (00 - 23) */}
              {openDropdown === 'hour' && (
                <div
                  className={`absolute top-[calc(100%+6px)] left-0 w-36 sm:w-44 max-h-56 overflow-y-auto rounded-xl border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-[#192432] border-[#2f4157] text-white shadow-black/80'
                      : 'bg-white border-slate-300 text-slate-800 shadow-slate-400/50'
                  }`}
                >
                  <div className="text-sm font-bold uppercase tracking-wider px-2 py-1 text-slate-400 border-b border-slate-700/30 mb-1">
                    {lang === 'id' ? 'Pilih Jam (00 - 23)' : 'Select Hour'}
                  </div>
                  <div className="space-y-0.5">
                    {Array.from({ length: 24 }, (_, i) => (
                      <button
                        key={i}
                        ref={hours === i ? activeItemRef : null}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExactSectionValue('hour', i);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-mono font-bold flex items-center justify-between transition-colors ${
                          hours === i
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : isDark
                            ? 'hover:bg-[#233246] text-slate-200'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{String(i).padStart(2, '0')}:00</span>
                        {hours === i && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. MENIT (MINUTES: 00 - 59) */}
            <div
              className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all select-none relative ${
                openDropdown === 'minute'
                  ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-500/10 z-40'
                  : isDark
                  ? 'bg-[#131c27] border-[#2f4157] hover:bg-[#192432] z-10'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 z-10'
              }`}
            >
              <div className="w-full text-center text-sm font-bold tracking-wider uppercase text-slate-400">
                <span>{t.minutes}</span>
              </div>

              {/* Trigger clickable dropdown */}
              <div
                onWheel={(e) => handleCardWheel(e, 'minute')}
                onClick={() => setOpenDropdown(openDropdown === 'minute' ? null : 'minute')}
                className={`my-1 font-mono text-3xl font-extrabold tracking-tight cursor-pointer transition-colors flex items-center justify-center ${
                  openDropdown === 'minute'
                    ? 'text-amber-400'
                    : isDark
                    ? 'text-white hover:text-amber-400'
                    : 'text-slate-900 hover:text-amber-600'
                }`}
                title={lang === 'id' ? 'Klik untuk memilih menit' : 'Click to select minutes'}
              >
                <span>{String(minutes).padStart(2, '0')}</span>
              </div>

              <div className="w-full text-center text-sm text-slate-400 font-medium">
                <span
                  onClick={() => setOpenDropdown(openDropdown === 'minute' ? null : 'minute')}
                  className="cursor-pointer hover:underline text-amber-500 hover:text-amber-400 transition-colors"
                >
                  00-59
                </span>
              </div>

              {/* Dropdown Menu for Minute (00 - 59) */}
              {openDropdown === 'minute' && (
                <div
                  className={`absolute top-[calc(100%+6px)] right-0 sm:left-1/2 sm:-translate-x-1/2 w-36 sm:w-44 max-h-56 overflow-y-auto rounded-xl border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-[#192432] border-[#2f4157] text-white shadow-black/80'
                      : 'bg-white border-slate-300 text-slate-800 shadow-slate-400/50'
                  }`}
                >
                  <div className="text-sm font-bold uppercase tracking-wider px-2 py-1 text-slate-400 border-b border-slate-700/30 mb-1">
                    {lang === 'id' ? 'Pilih Menit (00 - 59)' : 'Select Minute'}
                  </div>
                  <div className="space-y-0.5">
                    {Array.from({ length: 60 }, (_, i) => (
                      <button
                        key={i}
                        ref={minutes === i ? activeItemRef : null}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExactSectionValue('minute', i);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-mono font-bold flex items-center justify-between transition-colors ${
                          minutes === i
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : isDark
                            ? 'hover:bg-[#233246] text-slate-200'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>:{String(i).padStart(2, '0')}</span>
                        {minutes === i && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. TANGGAL (DAY: 1 - 31) */}
            <div
              className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all select-none relative ${
                openDropdown === 'day'
                  ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-500/10 z-40'
                  : isDark
                  ? 'bg-[#131c27] border-[#2f4157] hover:bg-[#192432] z-10'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 z-10'
              }`}
            >
              <div className="w-full text-center text-sm font-bold tracking-wider uppercase text-slate-400">
                <span>{t.day}</span>
              </div>

              {/* Trigger clickable dropdown */}
              <div
                onWheel={(e) => handleCardWheel(e, 'day')}
                onClick={() => setOpenDropdown(openDropdown === 'day' ? null : 'day')}
                className={`my-1 font-mono text-3xl font-extrabold tracking-tight cursor-pointer transition-colors flex items-center justify-center ${
                  openDropdown === 'day'
                    ? 'text-amber-400'
                    : isDark
                    ? 'text-white hover:text-amber-400'
                    : 'text-slate-900 hover:text-amber-600'
                }`}
                title={lang === 'id' ? 'Klik untuk memilih tanggal' : 'Click to select date'}
              >
                <span>{String(day).padStart(2, '0')}</span>
              </div>

              <div className="w-full text-center text-sm text-slate-400 font-medium">
                <span
                  onClick={() => setOpenDropdown(openDropdown === 'day' ? null : 'day')}
                  className="cursor-pointer hover:underline text-amber-500 hover:text-amber-400 transition-colors"
                >
                  1-{daysInMonth}
                </span>
              </div>

              {/* Dropdown Menu for Day (1 - 31) */}
              {openDropdown === 'day' && (
                <div
                  className={`absolute top-[calc(100%+6px)] left-0 sm:left-1/2 sm:-translate-x-1/2 w-36 sm:w-44 max-h-56 overflow-y-auto rounded-xl border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-[#192432] border-[#2f4157] text-white shadow-black/80'
                      : 'bg-white border-slate-300 text-slate-800 shadow-slate-400/50'
                  }`}
                >
                  <div className="text-sm font-bold uppercase tracking-wider px-2 py-1 text-slate-400 border-b border-slate-700/30 mb-1">
                    {lang === 'id' ? `Tanggal (1 - ${daysInMonth})` : 'Select Date'}
                  </div>
                  <div className="space-y-0.5">
                    {daysList.map((d) => (
                      <button
                        key={d}
                        ref={day === d ? activeItemRef : null}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExactSectionValue('day', d);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-mono font-bold flex items-center justify-between transition-colors ${
                          day === d
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : isDark
                            ? 'hover:bg-[#233246] text-slate-200'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{String(d).padStart(2, '0')}</span>
                        {day === d && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. BULAN (MONTH: 12 BULAN) */}
            <div
              className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all select-none relative ${
                openDropdown === 'month'
                  ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-500/10 z-40'
                  : isDark
                  ? 'bg-[#131c27] border-[#2f4157] hover:bg-[#192432] z-10'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 z-10'
              }`}
            >
              <div className="w-full text-center text-sm font-bold tracking-wider uppercase text-slate-400">
                <span>{t.month}</span>
              </div>

              {/* Trigger clickable dropdown */}
              <div
                onWheel={(e) => handleCardWheel(e, 'month')}
                onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')}
                className={`my-1 text-center font-bold text-base sm:text-lg cursor-pointer transition-colors flex items-center justify-center truncate max-w-full ${
                  openDropdown === 'month'
                    ? 'text-amber-400'
                    : isDark
                    ? 'text-white hover:text-amber-400'
                    : 'text-slate-900 hover:text-amber-600'
                }`}
                title={lang === 'id' ? 'Klik untuk memilih bulan' : 'Click to select month'}
              >
                <span className="truncate">{t.months[month]}</span>
              </div>

              <div className="w-full text-center text-sm text-slate-400 font-medium">
                <span
                  onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')}
                  className="cursor-pointer hover:underline text-amber-500 hover:text-amber-400 transition-colors"
                >
                  {lang === 'id' ? '12 Bulan' : '12 Months'}
                </span>
              </div>

              {/* Dropdown Menu for Month (12 Months) */}
              {openDropdown === 'month' && (
                <div
                  className={`absolute top-[calc(100%+6px)] right-0 sm:left-1/2 sm:-translate-x-1/2 w-44 sm:w-52 max-h-56 overflow-y-auto rounded-xl border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-[#192432] border-[#2f4157] text-white shadow-black/80'
                      : 'bg-white border-slate-300 text-slate-800 shadow-slate-400/50'
                  }`}
                >
                  <div className="text-sm font-bold uppercase tracking-wider px-2 py-1 text-slate-400 border-b border-slate-700/30 mb-1">
                    {lang === 'id' ? 'Pilih Bulan' : 'Select Month'}
                  </div>
                  <div className="space-y-0.5">
                    {t.months.map((mName, mIdx) => (
                      <button
                        key={mIdx}
                        ref={month === mIdx ? activeItemRef : null}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExactSectionValue('month', mIdx);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-bold flex items-center justify-between transition-colors ${
                          month === mIdx
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : isDark
                            ? 'hover:bg-[#233246] text-slate-200'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{mName}</span>
                        {month === mIdx && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. TAHUN (YEAR: 2024 - 2038) */}
            <div
              className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all select-none col-span-2 sm:col-span-1 relative ${
                openDropdown === 'year'
                  ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-500/10 z-40'
                  : isDark
                  ? 'bg-[#131c27] border-[#2f4157] hover:bg-[#192432] z-10'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 z-10'
              }`}
            >
              <div className="w-full text-center text-sm font-bold tracking-wider uppercase text-slate-400">
                <span>{t.year}</span>
              </div>

              {/* Trigger clickable dropdown */}
              <div
                onWheel={(e) => handleCardWheel(e, 'year')}
                onClick={() => setOpenDropdown(openDropdown === 'year' ? null : 'year')}
                className={`my-1 font-mono text-2xl font-extrabold cursor-pointer transition-colors flex items-center justify-center ${
                  openDropdown === 'year'
                    ? 'text-amber-400'
                    : isDark
                    ? 'text-white hover:text-amber-400'
                    : 'text-slate-900 hover:text-amber-600'
                }`}
                title={lang === 'id' ? 'Klik untuk memilih tahun' : 'Click to select year'}
              >
                <span>{year}</span>
              </div>

              <div className="w-full text-center text-sm text-slate-400 font-medium">
                <span
                  onClick={() => setOpenDropdown(openDropdown === 'year' ? null : 'year')}
                  className="cursor-pointer hover:underline text-amber-500 hover:text-amber-400 transition-colors"
                >
                  2024-2038
                </span>
              </div>

              {/* Dropdown Menu for Year (2024 - 2038) */}
              {openDropdown === 'year' && (
                <div
                  className={`absolute top-[calc(100%+6px)] right-0 w-36 sm:w-44 max-h-56 overflow-y-auto rounded-xl border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-[#192432] border-[#2f4157] text-white shadow-black/80'
                      : 'bg-white border-slate-300 text-slate-800 shadow-slate-400/50'
                  }`}
                >
                  <div className="text-sm font-bold uppercase tracking-wider px-2 py-1 text-slate-400 border-b border-slate-700/30 mb-1">
                    {lang === 'id' ? 'Pilih Tahun' : 'Select Year'}
                  </div>
                  <div className="space-y-0.5">
                    {yearsList.map((y) => (
                      <button
                        key={y}
                        ref={year === y ? activeItemRef : null}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExactSectionValue('year', y);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-mono font-bold flex items-center justify-between transition-colors ${
                          year === y
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : isDark
                            ? 'hover:bg-[#233246] text-slate-200'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{y}</span>
                        {year === y && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive 24-Hour Timeline Scrubber (Directly in sync with Home City) */}
          <div className="pt-2">
            <div
              className={`flex items-center justify-between text-sm mb-1.5 font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <span>{t.timelineScrubber} ({homeCity.name})</span>
              <span
                className={`font-mono text-sm font-bold ${
                  isDark ? 'text-amber-400' : 'text-slate-900'
                }`}
              >
                {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={23}
              value={hours}
              onChange={(e) => setExactSectionValue('hour', parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-slate-300 dark:bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div
              className={`flex justify-between text-sm font-mono font-medium mt-1.5 ${
                isDark ? 'text-slate-600 dark:text-slate-400' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span
              className={`text-sm font-bold mr-1 flex items-center gap-1 ${
                isDark ? 'text-amber-400' : 'text-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t.quickPresets}:
            </span>
            <button
              onClick={() => handlePreset('now')}
              className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all shadow-xs ${
                isDark
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {t.presetNow}
            </button>
            <button
              onClick={() => handlePreset('plus1')}
              className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all ${
                isDark
                  ? 'bg-[#192432] hover:bg-[#233246] text-slate-200 border border-slate-700/60'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              {t.presetPlus1}
            </button>
            <button
              onClick={() => handlePreset('plus3')}
              className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all ${
                isDark
                  ? 'bg-[#192432] hover:bg-[#233246] text-slate-200 border border-slate-700/60'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              {t.presetPlus3}
            </button>
            <button
              onClick={() => handlePreset('workHour')}
              className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all ${
                isDark
                  ? 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {t.presetWork}
            </button>
            <button
              onClick={() => handlePreset('tomorrow9')}
              className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all ${
                isDark
                  ? 'bg-[#192432] hover:bg-[#233246] text-slate-200 border border-slate-700/60'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              {t.presetTomorrow}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
