import React, { useState, useMemo, useEffect } from 'react';
import { City, ThemeMode, Language } from '../types';
import { WORLD_CITIES_DATABASE, getTimeDetails, getGmtOffsetLabel, getDeviceCity, getDeviceTimeZone } from '../utils/timeZones';
import { CountryFlag } from './CountryFlag';
import { TRANSLATIONS, getCityName, getCountryName, titleCaseCity } from '../utils/i18n';
import { Search, X, Plus, Check, Globe, MapPin } from 'lucide-react';

interface CitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCity: (city: City) => void;
  selectedCityIds: string[];
  theme: ThemeMode;
  lang: Language;
  /** Timezone of "My City" — used to show how far each city is from the user. */
  homeTimezone: string;
  use24Hour: boolean;
  /** 'add' = add a city to the board (default); 'pickHome' = choose My City directly. */
  mode?: 'add' | 'pickHome';
  homeCityId?: string;
}

const PAGE_SIZE = 40;

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  isOpen,
  onClose,
  onAddCity,
  selectedCityIds,
  theme,
  lang,
  homeTimezone,
  use24Hour,
  mode = 'add',
  homeCityId,
}) => {
  const pickHome = mode === 'pickHome';
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];
  const now = useMemo(() => new Date(), [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // The city that matches this device's time zone (offered as a one-tap choice when picking My City)
  const deviceCity = useMemo(() => getDeviceCity(), []);
  const deviceTz = useMemo(() => getDeviceTimeZone(), []);

  const regions = [
    { id: 'all', label: t.continentAll },
    { id: 'asia', label: t.continentAsia },
    { id: 'europe', label: t.continentEurope },
    { id: 'america', label: t.continentAmerica },
    { id: 'oceania', label: t.continentOceania },
    { id: 'africa', label: t.continentAfrica },
    { id: 'antarctica', label: t.continentAntarctica },
    { id: 'other', label: t.continentOther },
  ];

  const results = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return WORLD_CITIES_DATABASE.filter((city) => {
      if (region !== 'all' && (city.continent ?? 'other') !== region) return false;
      if (!term) return true;
      return (
        city.name.toLowerCase().includes(term) ||
        (city.nameId && city.nameId.toLowerCase().includes(term)) ||
        city.country.toLowerCase().includes(term) ||
        getCountryName(city.country, lang, city.countryCode).toLowerCase().includes(term) ||
        city.timezone.toLowerCase().includes(term) ||
        (city.tzAbbr && city.tzAbbr.toLowerCase().includes(term)) ||
        (city.code && city.code.toLowerCase().includes(term))
      );
    });
  }, [searchTerm, region, lang]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [searchTerm, region]);
  const visible = useMemo(() => results.slice(0, visibleCount), [results, visibleCount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div
        className={`w-full max-w-lg rounded-2xl shadow-2xl border flex flex-col max-h-[88vh] overflow-hidden ${
          isDark ? 'bg-[#131c27] border-[#2f4157] text-white' : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        {/* Title */}
        <div className={`px-4 py-3.5 border-b flex items-center justify-between ${isDark ? 'border-[#2f4157]' : 'border-slate-300'}`}>
          <h2 className="text-lg font-bold">{pickHome ? t.pickHomeTitle : t.addCity}</h2>
          <button
            onClick={onClose}
            aria-label={t.done}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search + region */}
        <div className="p-4 space-y-2.5">
          <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
              isDark
                ? 'bg-[#192432] border-slate-700 focus-within:border-blue-400'
                : 'bg-slate-50 border-slate-400/70 focus-within:border-blue-600'
            }`}
          >
            <Search className={`w-4 h-4 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-hidden text-base placeholder:text-slate-500"
              autoFocus
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} aria-label="Clear" className="shrink-0">
                <X className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
              </button>
            )}
          </div>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            aria-label={t.regionLabel}
            style={{ colorScheme: isDark ? 'dark' : 'light' }}
            className={`w-full rounded-xl border px-3 py-2.5 text-base font-semibold ${
              isDark ? 'bg-[#192432] border-slate-700 text-white' : 'bg-slate-50 border-slate-400/70 text-slate-900'
            }`}
          >
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id === 'all' ? t.regionAll : r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="px-4 pb-4 overflow-y-auto space-y-2 flex-1 min-h-[260px]">
          {pickHome && deviceCity && !searchTerm && region === 'all' && deviceCity.id !== homeCityId && (
            <button
              type="button"
              onClick={() => onAddCity(deviceCity)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                isDark
                  ? 'bg-emerald-950/60 border-emerald-800 hover:bg-emerald-950'
                  : 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <MapPin className={`w-5 h-5 shrink-0 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`} />
              <span className="min-w-0">
                <span className="block font-bold text-base">{t.useDeviceZone}</span>
                <span className={`block text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {deviceTz ?? deviceCity.timezone} ({getGmtOffsetLabel(deviceCity.timezone, now)})
                </span>
              </span>
            </button>
          )}
          {results.length === 0 ? (
            <div className={`py-14 text-center text-base flex flex-col items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <Globe className="w-8 h-8 opacity-60" />
              <p>{t.noCitiesFound}</p>
            </div>
          ) : (
            <>
              {visible.map((city) => {
                const added = pickHome ? city.id === homeCityId : selectedCityIds.includes(city.id);
                const d = getTimeDetails(now, city.timezone, homeTimezone, lang);
                const clock = use24Hour ? d.time24 : d.time12;
                return (
                  <div
                    key={city.id}
                    className={`flex items-center justify-between gap-3 p-3 rounded-xl border ${
                      isDark ? 'bg-[#192432] border-[#2f4157]' : 'bg-white border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CountryFlag
                        countryCode={city.countryCode}
                        countryName={getCountryName(city.country, lang, city.countryCode)}
                        size="lg"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-base leading-tight truncate">
                          {lang === 'id' && city.nameId ? titleCaseCity(city.nameId) : titleCaseCity(getCityName(city, lang))}
                        </div>
                        <div className={`text-sm leading-snug ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {getCountryName(city.country, lang, city.countryCode)}
                        </div>
                        <div className={`text-sm leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <span className="font-mono font-bold">{clock}</span>
                          {' · '}
                          {getGmtOffsetLabel(city.timezone, now)}
                        </div>
                      </div>
                    </div>

                    {added ? (
                      <span
                        className={`shrink-0 text-sm font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 border ${
                          isDark
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {pickHome ? t.home : t.inBoard}
                      </span>
                    ) : (
                      <button
                        onClick={() => onAddCity(city)}
                        className={`shrink-0 text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${
                          isDark ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {pickHome ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {pickHome ? t.select : t.add}
                      </button>
                    )}
                  </div>
                );
              })}

              {results.length > visibleCount && (
                <button
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                    isDark
                      ? 'border-slate-600 text-slate-200 hover:bg-slate-800'
                      : 'border-slate-400 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'id' ? `Tampilkan lebih banyak (${results.length - visibleCount})` : `Show more (${results.length - visibleCount})`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
