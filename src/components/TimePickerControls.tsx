import React, { useMemo, useState } from 'react';
import { ThemeMode, City, Language } from '../types';
import { TRANSLATIONS, getCityName, titleCaseCity } from '../utils/i18n';
import { getTimeDetails, setTimeForTimezone, getTimeZoneAbbr } from '../utils/timeZones';
import { RefreshCw, Pencil, X, Calendar, MapPin } from 'lucide-react';

interface TimePickerControlsProps {
  currentDate: Date;
  isAutoSync: boolean;
  homeCity: City;
  theme: ThemeMode;
  lang: Language;
  onDateChange: (newDate: Date) => void;
  onToggleAutoSync: () => void;
  onSyncNow: () => void;
  /** The "My City" board row, shown inside this card. */
  homeRow?: React.ReactNode;
  /** Opens the "choose My City" picker. */
  onChangeCity?: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * "Current time" card. Kept deliberately simple:
 * one status line, one button to change the time, and (when open) a single native
 * date-and-time field plus a few quick presets.
 */
export const TimePickerControls: React.FC<TimePickerControlsProps> = ({
  currentDate,
  isAutoSync,
  homeCity,
  theme,
  lang,
  onDateChange,
  onSyncNow,
  homeRow,
  onChangeCity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  // Date/time as seen in the user's own ("My City") timezone
  const details = useMemo(
    () => getTimeDetails(currentDate, homeCity.timezone, homeCity.timezone, lang),
    [currentDate, homeCity.timezone, lang]
  );
  const fieldValue = `${details.yearNumber}-${pad(details.monthNumber)}-${pad(parseInt(details.dayNumber, 10))}T${details.hoursStr}:${details.minutesStr}`;

  const handleFieldChange = (value: string) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
    if (!m) return;
    onDateChange(
      setTimeForTimezone(currentDate, homeCity.timezone, {
        year: parseInt(m[1], 10),
        month: parseInt(m[2], 10) - 1,
        day: parseInt(m[3], 10),
        hour: parseInt(m[4], 10),
        minute: parseInt(m[5], 10),
      })
    );
  };

  const handlePreset = (type: 'now' | 'plus1' | 'plus3' | 'tomorrow9' | 'dayAfter9' | 'nextWeek9') => {
    if (type === 'now') return onSyncNow();
    if (type === 'plus1') return onDateChange(new Date(currentDate.getTime() + 3600 * 1000));
    if (type === 'plus3') return onDateChange(new Date(currentDate.getTime() + 3 * 3600 * 1000));
    // Day presets are counted from the real "today" (not from a time already picked), at 09:00 in My City
    const days = type === 'tomorrow9' ? 1 : type === 'dayAfter9' ? 2 : 7;
    const target = new Date(Date.now() + days * 86400 * 1000);
    onDateChange(setTimeForTimezone(target, homeCity.timezone, { hour: 9, minute: 0 }));
  };

  const realToday = getTimeDetails(new Date(), homeCity.timezone, homeCity.timezone, lang);
  const isToday =
    realToday.yearNumber === details.yearNumber &&
    realToday.monthNumber === details.monthNumber &&
    realToday.dayNumber === details.dayNumber;

  const abbr = getTimeZoneAbbr(homeCity.timezone, homeCity.tzAbbr, currentDate, homeCity.countryCode);
  const cityName = titleCaseCity(getCityName(homeCity, lang));

  const outlineBtn = `px-3.5 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5 border transition-all ${
    isDark
      ? 'bg-[#192432] hover:bg-[#233246] text-slate-200 border-[#2f4157]'
      : 'bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-400/70'
  }`;
  const solidBtn = `px-3.5 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs ${
    isDark ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-slate-900 hover:bg-slate-800 text-white'
  }`;
  const presetBtn = `px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors ${
    isDark
      ? 'bg-[#192432] border-[#2f4157] text-slate-200 hover:bg-[#233246]'
      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
  }`;

  return (
    <div
      className={`rounded-2xl border p-3.5 sm:p-4 ${
        isDark ? 'bg-[#131c27] border-[#1e2b3b] text-white shadow-xl' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status */}
        <div className="flex items-center gap-3">
          <span
            className={`w-3 h-3 rounded-full shrink-0 ${
              isAutoSync ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20' : 'bg-amber-500 ring-4 ring-amber-500/30'
            }`}
          />
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-base font-bold">{isAutoSync ? t.liveSync : t.customTime}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold whitespace-nowrap ${
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
            {!homeRow && (
              <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.homeAnchor}: <strong className={isDark ? 'text-slate-100' : 'text-slate-900'}>{cityName}</strong>
                {abbr ? <span className="font-mono"> ({abbr})</span> : null}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {!isAutoSync && (
            <button type="button" onClick={onSyncNow} className={solidBtn}>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.backToNow}</span>
            </button>
          )}
          {onChangeCity && (
            <button type="button" onClick={onChangeCity} className={outlineBtn}>
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.changeCity}</span>
            </button>
          )}
          <button type="button" onClick={() => setIsOpen((v) => !v)} className={outlineBtn} aria-expanded={isOpen}>
            {isOpen ? <X className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5 text-amber-600" />}
            <span>{isOpen ? t.closePicker : t.setTimeDate}</span>
          </button>
        </div>
      </div>

      {homeRow && (
        <div className={`mt-3 pt-3 border-t ${isDark ? 'border-[#2f4157]' : 'border-slate-300'}`}>
          {/* Date header for the time shown below (same look as the date headers in the list) */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-1.5">
            <span
              className={`flex items-center gap-2 font-mono font-bold text-sm max-[420px]:text-xs tracking-wider uppercase ${
                isDark ? 'text-amber-300' : 'text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-600 max-[420px]:hidden" />
              {details.fullDateStr}
            </span>
            {isToday && (
              <span
                className={`px-3 py-0.5 rounded-full text-sm max-[420px]:text-xs font-black tracking-wide uppercase whitespace-nowrap ${
                  isDark
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-300 text-slate-900'
                }`}
              >
                {t.today}
              </span>
            )}
          </div>
          {homeRow}
        </div>
      )}

      {isOpen && (
        <div className={`mt-3.5 pt-3.5 border-t space-y-3 ${isDark ? 'border-[#2f4157]' : 'border-slate-300'}`}>
          <label className="block">
            <span className={`block text-sm font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {t.pickLabel}
            </span>
            <input
              type="datetime-local"
              value={fieldValue}
              onChange={(e) => handleFieldChange(e.target.value)}
              style={{ colorScheme: isDark ? 'dark' : 'light' }}
              className={`w-full sm:w-auto min-w-[16rem] rounded-xl border px-3 py-2.5 text-base font-semibold ${
                isDark
                  ? 'bg-[#192432] border-[#2f4157] text-white'
                  : 'bg-slate-50 border-slate-400/70 text-slate-900'
              }`}
            />
            <span className={`block text-sm mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.pickHint.replace('{city}', cityName)}
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => handlePreset('now')} className={presetBtn}>
              {t.presetNow}
            </button>
            <button type="button" onClick={() => handlePreset('plus1')} className={presetBtn}>
              {t.presetPlus1}
            </button>
            <button type="button" onClick={() => handlePreset('plus3')} className={presetBtn}>
              {t.presetPlus3}
            </button>
            <button type="button" onClick={() => handlePreset('tomorrow9')} className={presetBtn}>
              {t.presetTomorrow}
            </button>
            <button type="button" onClick={() => handlePreset('dayAfter9')} className={presetBtn}>
              {t.presetDayAfter}
            </button>
            <button type="button" onClick={() => handlePreset('nextWeek9')} className={presetBtn}>
              {t.presetNextWeek}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
