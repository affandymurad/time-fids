import React, { useState, useMemo, useEffect } from 'react';
import { City, ThemeMode, Language } from '../types';
import { WORLD_CITIES_DATABASE, getTimeZoneAbbr, getGmtOffsetLabel } from '../utils/timeZones';
import { CountryFlag } from './CountryFlag';
import { TRANSLATIONS, getCityName, getCountryName, getTimeZoneName } from '../utils/i18n';
import { Search, X, Plus, Check, Globe } from 'lucide-react';

interface CitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCity: (city: City) => void;
  selectedCityIds: string[];
  theme: ThemeMode;
  lang: Language;
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  isOpen,
  onClose,
  onAddCity,
  selectedCityIds,
  theme,
  lang,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const PAGE_SIZE = 60;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const isDark = theme === 'dark';
  const now = useMemo(() => new Date(), []);
  const t = TRANSLATIONS[lang];

  // Every city belongs to exactly one continent bucket (so the pill counts add up to "All")
  const matchesSearch = (city: City) => {
    const term = searchTerm.toLowerCase().trim();
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
  };

  const searchMatched = useMemo(
    () => WORLD_CITIES_DATABASE.filter(matchesSearch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, lang]
  );

  // Continent counts follow the current search text
  const counts = useMemo(() => {
    const byContinent = (id: string) => searchMatched.filter((c) => (c.continent ?? 'other') === id).length;
    return {
      all: searchMatched.length,
      asia: byContinent('asia'),
      europe: byContinent('europe'),
      america: byContinent('america'),
      oceania: byContinent('oceania'),
      africa: byContinent('africa'),
      antarctica: byContinent('antarctica'),
      other: byContinent('other'),
    };
  }, [searchMatched]);

  const filteredCities = useMemo(
    () =>
      selectedContinent === 'all'
        ? searchMatched
        : searchMatched.filter((c) => (c.continent ?? 'other') === selectedContinent),
    [searchMatched, selectedContinent]
  );

  // Reset paging whenever the result set changes (new search text or continent)
  useEffect(() => setVisibleCount(PAGE_SIZE), [searchTerm, selectedContinent]);
  const visibleCities = useMemo(() => filteredCities.slice(0, visibleCount), [filteredCities, visibleCount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-xl rounded-2xl shadow-2xl border flex flex-col max-h-[85vh] overflow-hidden ${
          isDark
            ? 'bg-[#131c27] border-[#2f4157] text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            <h2 className="text-base font-bold">{t.addCity}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input & Continent Filters */}
        <div className="p-4 pb-2 border-b border-slate-100 dark:border-slate-800/60">
          <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
              isDark
                ? 'bg-[#192432] border-slate-700 focus-within:border-blue-500 text-white'
                : 'bg-slate-100 border-slate-200 focus-within:border-blue-500'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-hidden text-sm placeholder:text-slate-400"
              autoFocus
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Continent Filter Pills with Counts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 text-sm">
            {[
              { id: 'all', label: t.continentAll, count: counts.all },
              { id: 'asia', label: t.continentAsia, count: counts.asia },
              { id: 'europe', label: t.continentEurope, count: counts.europe },
              { id: 'america', label: t.continentAmerica, count: counts.america },
              { id: 'oceania', label: t.continentOceania, count: counts.oceania },
              { id: 'africa', label: t.continentAfrica, count: counts.africa },
              { id: 'antarctica', label: t.continentAntarctica, count: counts.antarctica },
              { id: 'other', label: t.continentOther, count: counts.other },
            ].map((tab) => {
              const isActive = selectedContinent === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedContinent(tab.id)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-bold flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : isDark
                      ? 'bg-[#192432] text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-sm px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-amber-600 text-slate-950 font-black'
                        : isDark
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cities List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 min-h-[300px]">
          {filteredCities.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-400 flex flex-col items-center justify-center gap-2">
              <Globe className="w-8 h-8 text-slate-500 opacity-50" />
              <p>{t.noCitiesFound}</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedContinent('all');
                }}
                className="text-sm text-blue-400 hover:underline mt-1"
              >
                {lang === 'id' ? 'Reset pencarian & filter' : 'Reset search & filters'}
              </button>
            </div>
          ) : (
            <>{visibleCities.map((city) => {
              const isAlreadyAdded = selectedCityIds.includes(city.id);

              return (
                <div
                  key={city.id}
                  className={`p-3 rounded-xl flex items-center justify-between transition-all ${
                    isDark
                      ? 'bg-[#192432]/60 hover:bg-[#192432] border border-slate-800'
                      : 'hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CountryFlag
                      countryCode={city.countryCode}
                      countryName={city.country}
                      size="lg"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm tracking-wide text-slate-900 dark:text-white">
                          {getCityName(city, lang)}
                        </span>
                        {(() => {
                          // Always show a blue badge: letters (EDT) when available, otherwise the GMT offset
                          const abbr = getTimeZoneAbbr(city.timezone, city.tzAbbr, now, city.countryCode);
                          return abbr ? (
                            <span className="text-sm px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold">{abbr}</span>
                          ) : null;
                        })()}
                        {(() => {
                          // City code replaced by the UTC offset (hidden when the blue badge already shows it)
                          const offset = getGmtOffsetLabel(city.timezone, now);
                          const abbr = getTimeZoneAbbr(city.timezone, city.tzAbbr, now, city.countryCode);
                          return abbr === offset ? null : (
                            <span className="text-sm px-1.5 py-0.5 rounded bg-slate-500/20 font-mono font-medium text-slate-400">
                              {offset}
                            </span>
                          );
                        })()}
                      </div>
                      <div className="text-sm text-slate-400">
                        {getCountryName(city.country, lang, city.countryCode)} &bull; {getTimeZoneName(city.timezone, now, lang)}
                        <div className="font-mono text-xs opacity-80">{city.timezone}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {isAlreadyAdded ? (
                      <span className="text-sm font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center gap-1 border border-emerald-500/20">
                        <Check className="w-3.5 h-3.5" />
                        {t.inBoard}
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          onAddCity(city);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-all shadow-xs ${
                          isDark
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {t.add}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredCities.length > visibleCount && (
              <button
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                  isDark ? "border-slate-600 text-slate-200 hover:bg-slate-800" : "border-slate-400 text-slate-800 hover:bg-slate-100"
                }`}
              >
                {lang === "id" ? `Tampilkan lebih banyak (${filteredCities.length - visibleCount})` : `Show more (${filteredCities.length - visibleCount})`}
              </button>
            )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-400 text-center font-medium">
          {t.modalFooter}
        </div>
      </div>
    </div>
  );
};
