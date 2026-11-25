import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  City,
  ThemeMode,
  DotColor,
  ViewTab,
  TimeDetails,
  BoardLabelMode,
  Language,
} from './types';
import {
  INITIAL_CITIES,
  ALL_AVAILABLE_CITIES,
  getTimeDetails,
} from './utils/timeZones';
import { TRANSLATIONS, getCityName } from './utils/i18n';
import { playAddSound } from './utils/audio';
import { SegmentedToggle } from './components/SegmentedToggle';
import { CountryFlag } from './components/CountryFlag';
import { PaletteSwitcher } from './components/PaletteSwitcher';
import { PaletteId, getPalette, DEFAULT_PALETTE_LIGHT, DEFAULT_PALETTE_DARK } from './utils/palettes';
import { HelpModal } from './components/HelpModal';
import { FidsBoardRow } from './components/FidsBoardRow';
import { TimePickerControls } from './components/TimePickerControls';
import { CitySearchModal } from './components/CitySearchModal';
import { SettingsModal } from './components/SettingsModal';
import { MapLibreView } from './components/MapLibreView';
import {
  Settings,
  UserRound,
  CircleHelp,
  Maximize2,
  Minimize2,
  Plus,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Clock,
  Map as MapIcon,
  Calendar,
  Compass,
  } from 'lucide-react';

const STORAGE_KEYS = {
  CITIES: 'fids_world_time_cities_v4',
  HOME_CITY_ID: 'fids_world_time_home_id_v4',
  THEME: 'fids_world_time_theme_v4',
  PALETTE: 'fids_world_time_palette_v4',
  DOT_COLOR: 'fids_world_time_dot_color_v4',
  SOUND: 'fids_world_time_sound_v4',
  USE_24H: 'fids_world_time_use_24h_v4',
  LABEL_MODE: 'fids_world_time_label_mode_v4',
  LANG: 'fids_world_time_lang_v4',
};

interface DateGroup {
  dateKey: string;
  dateTitle: string;
  dayBadge: string;
  badgeType: 'same' | 'next' | 'prev' | 'other';
  citiesWithDetails: {
    city: City;
    details: TimeDetails;
    isHome: boolean;
  }[];
}

export default function App() {
  // 1. Language State
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      if (saved === 'id' || saved === 'en') return saved;
    } catch {
      // Fallback
    }
    return 'en'; // English by default
  });

  const t = TRANSLATIONS[lang];

  // 2. Core State with LocalStorage Persistence
  const [cities, setCities] = useState<City[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CITIES);
      if (saved) {
        // Refresh static fields (code, name, etc.) from the master list so data fixes reach saved cities
        const master = new Map(ALL_AVAILABLE_CITIES.map((c) => [c.id, c]));
        return (JSON.parse(saved) as City[]).map((c) => ({ ...c, ...(master.get(c.id) ?? {}) }));
      }
    } catch {
      // Fallback
    }
    return INITIAL_CITIES;
  });

  // Default Home city is now JAKARTA as requested!
  const [homeCityId, setHomeCityId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HOME_CITY_ID);
      if (saved) return saved;
    } catch {
      // Fallback
    }
    return INITIAL_CITIES[0].id;
  });

  // Board palette (same eight as flapdot.com). Light/dark mode is derived from it.
  const [palette, setPalette] = useState<PaletteId>(() => {
    try {
      const saved = getPalette(localStorage.getItem(STORAGE_KEYS.PALETTE));
      if (saved) return saved.id;
      // migrate the old light/dark preference
      if (localStorage.getItem(STORAGE_KEYS.THEME) === 'dark') return DEFAULT_PALETTE_DARK;
    } catch {
      // Fallback
    }
    return DEFAULT_PALETTE_LIGHT;
  });
  const theme: ThemeMode = getPalette(palette)?.mode ?? 'light';
  const dotColor: DotColor = 'amber'; // legacy prop; dot colours now come from the palette


  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return true;
  });

  const [use24Hour, setUse24Hour] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USE_24H);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return true;
  });

  const [globalLabelMode, setGlobalLabelMode] = useState<BoardLabelMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LABEL_MODE);
      if (saved === 'city' || saved === 'timezone') return saved;
    } catch {
      // Fallback
    }
    return 'city';
  });

  // 3. View Mode: Clock vs Map
  const [viewTab, setViewTab] = useState<ViewTab>('clock');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCitySearchOpen, setIsCitySearchOpen] = useState<boolean>(false);
  const [isHomePickerOpen, setIsHomePickerOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // 4. Time State & Auto-sync
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isAutoSync, setIsAutoSync] = useState<boolean>(true);

  // Sync to real-time timer
  useEffect(() => {
    if (!isAutoSync) return;

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoSync]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(cities));
    } catch (e) {
      console.warn('Failed saving cities to localStorage', e);
    }
  }, [cities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HOME_CITY_ID, homeCityId);
    } catch (e) {
      console.warn('Failed saving home city', e);
    }
  }, [homeCityId]);

  // Save the palette and apply it to <html> (data-palette / data-mode drive the CSS variables)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PALETTE, palette);
    } catch (e) {
      console.warn('Failed saving palette', e);
    }
    const root = document.documentElement;
    root.dataset.palette = palette;
    root.dataset.mode = theme;
  }, [palette, theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(soundEnabled));
    } catch (e) {
      console.warn('Failed saving sound preference', e);
    }
  }, [soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USE_24H, JSON.stringify(use24Hour));
    } catch (e) {
      console.warn('Failed saving time format', e);
    }
  }, [use24Hour]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LABEL_MODE, globalLabelMode);
    } catch (e) {
      console.warn('Failed saving label mode', e);
    }
  }, [globalLabelMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch (e) {
      console.warn('Failed saving language', e);
    }
  }, [lang]);

  // Derived Home City
  const homeCity = useMemo(() => {
    const found = cities.find((c) => c.id === homeCityId);
    return found || cities[0] || INITIAL_CITIES[0];
  }, [cities, homeCityId]);

  // Handle user manual date changes
  const handleDateChange = useCallback((newDate: Date) => {
    setIsAutoSync(false);
    setCurrentDate(newDate);
  }, []);

  // Return to live auto-sync
  const handleSyncToLive = useCallback(() => {
    setCurrentDate(new Date());
    setIsAutoSync(true);
  }, []);

  // Calculate grouped cities by local date
  const groupedCitiesByDate = useMemo(() => {
    const homeDetails = getTimeDetails(currentDate, homeCity.timezone, homeCity.timezone, lang);
    const groupsMap = new Map<string, DateGroup>();

    cities.forEach((city) => {
      const isHome = city.id === homeCity.id;
      if (isHome) return; // My City lives inside the Current Time section
      const details = getTimeDetails(currentDate, city.timezone, homeCity.timezone, lang);

      const dateKey = `${details.yearNumber}-${String(details.monthNumber).padStart(2, '0')}-${String(details.dayNumber).padStart(2, '0')}`;

      if (!groupsMap.has(dateKey)) {
        let dayBadge = t.sameDay;
        let badgeType: 'same' | 'next' | 'prev' | 'other' = 'same';

        if (details.diffDayDesc === 'next') {
          dayBadge = t.tomorrow;
          badgeType = 'next';
        } else if (details.diffDayDesc === 'prev') {
          dayBadge = t.yesterday;
          badgeType = 'prev';
        } else if (dateKey === `${homeDetails.yearNumber}-${String(homeDetails.monthNumber).padStart(2, '0')}-${String(homeDetails.dayNumber).padStart(2, '0')}`) {
          dayBadge = t.today;
          badgeType = 'same';
        }

        groupsMap.set(dateKey, {
          dateKey,
          dateTitle: details.fullDateStr.toUpperCase(),
          dayBadge,
          badgeType,
          citiesWithDetails: [],
        });
      }

      groupsMap.get(dateKey)!.citiesWithDetails.push({
        city,
        details,
        isHome,
      });
    });

    // Within each date group, order rows by local time of day (earliest first)
    groupsMap.forEach((g) =>
      g.citiesWithDetails.sort(
        (a, b) => a.details.time24.localeCompare(b.details.time24) || a.city.name.localeCompare(b.city.name)
      )
    );

    const sortedGroups = Array.from(groupsMap.values()).sort((a, b) =>
      a.dateKey.localeCompare(b.dateKey)
    );

    return sortedGroups;
  }, [cities, currentDate, homeCity, lang, t]);

  // City management handlers
  // Id of the row that was just added (drives its enter animation)
  const [enteringId, setEnteringId] = useState<string | null>(null);
  const flagEntering = useCallback((id: string) => {
    setEnteringId(id);
    window.setTimeout(() => setEnteringId((cur) => (cur === id ? null : cur)), 700);
  }, []);

  const handleAddCity = useCallback(
    (city: City) => {
      if (cities.some((c) => c.id === city.id)) return;
      setCities((prev) => (prev.some((c) => c.id === city.id) ? prev : [...prev, city]));
      flagEntering(city.id);
      if (soundEnabled) playAddSound();
    },
    [cities, flagEntering, soundEnabled]
  );

  const handleRemoveCity = useCallback(
    (cityId: string) => {
      if (cities.length <= 1) {
        alert(lang === 'id' ? 'Minimal harus ada satu kota di papan.' : 'At least one city must remain on board.');
        return;
      }
      const remaining = cities.filter((c) => c.id !== cityId);
      setCities(remaining);
      // If the Home city was removed, hand Home over to the first remaining city
      if (cityId === homeCityId) setHomeCityId(remaining[0].id);
    },
    [cities, homeCityId, lang]
  );

  // Pick My City directly: add it to the board if needed, then make it the reference city
  const handlePickHome = useCallback(
    (city: City) => {
      if (!cities.some((c) => c.id === city.id)) {
        setCities((prev) => (prev.some((c) => c.id === city.id) ? prev : [...prev, city]));
        flagEntering(city.id);
      }
      setHomeCityId(city.id);
      setIsHomePickerOpen(false);
      if (soundEnabled) playAddSound();
    },
    [cities, flagEntering, soundEnabled]
  );

  const handleResetCities = useCallback(() => {
    setCities(INITIAL_CITIES);
    setHomeCityId(INITIAL_CITIES[0].id);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-amber-500/30 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[color:var(--surface)] text-slate-100' : 'theme-light bg-[color:var(--page-bg)] text-slate-900'
      }`}
    >
      {/* ================= STICKY TOOLBAR ================= */}
      <header className="app-toolbar">
        <div className="w-full max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[2100px] mx-auto px-3 sm:px-8 2xl:px-14 py-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          {/* Left: view switch */}
          <div className="tb-seg" role="group" aria-label="View">
            <button type="button" aria-pressed={viewTab === 'clock'} onClick={() => setViewTab('clock')}>
              <Clock className="w-3.5 h-3.5 max-[380px]:hidden" />
              <span>{t.clock}</span>
            </button>
            <button type="button" aria-pressed={viewTab === 'map'} onClick={() => setViewTab('map')}>
              <MapIcon className="w-3.5 h-3.5 max-[380px]:hidden" />
              <span>{t.map}</span>
            </button>
          </div>

          {/* Right: one primary action, everything else is a quiet icon */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button type="button" className="tb-btn primary" onClick={() => setIsCitySearchOpen(true)} title={t.addCity} aria-label={t.addCity}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t.addCity}</span>
            </button>

            <SegmentedToggle<Language>
              ariaLabel="Language"
              isDark={isDark}
              value={lang}
              onChange={setLang}
              options={[
                { value: 'en', label: <CountryFlag countryCode="gb" countryName="English" size="md" />, title: 'English' },
                { value: 'id', label: <CountryFlag countryCode="id" countryName="Indonesia" size="md" />, title: 'Bahasa Indonesia' },
              ]}
            />

            <PaletteSwitcher value={palette} onChange={setPalette} lang={lang} ariaLabel={t.theme} />

            <a
              href="https://affandymurad.github.io/2026/?country=ID"
              target="_blank"
              rel="noopener noreferrer"
              className="tb-btn icon lg:!w-auto lg:!px-3"
              title={lang === 'id' ? 'Kalender hari libur' : 'Holiday calendar'}
              aria-label={lang === 'id' ? 'Kalender hari libur' : 'Holiday calendar'}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden lg:inline">{lang === 'id' ? 'Kalender' : 'Calendar'}</span>
            </a>
            <a
              href="https://affandymurad.github.io/megacity/"
              target="_blank"
              rel="noopener noreferrer"
              className="tb-btn icon lg:!w-auto lg:!px-3"
              title={lang === 'id' ? 'Panduan perjalanan' : 'Travel guide'}
              aria-label={lang === 'id' ? 'Panduan perjalanan' : 'Travel guide'}
            >
              <Compass className="w-4 h-4" />
              <span className="hidden lg:inline">{lang === 'id' ? 'Wisata' : 'Travel'}</span>
            </a>

            <button type="button" className="tb-btn icon" onClick={() => setIsHelpOpen(true)} title={t.help} aria-label={t.help}>
              <CircleHelp className="w-4 h-4" />
            </button>
            <button type="button" className="tb-btn icon" onClick={() => setIsSettingsOpen(true)} title={t.settings} aria-label={t.settingsLabel}>
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 w-full max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[2100px] mx-auto px-3 sm:px-8 2xl:px-14 py-4 sm:py-5 flex flex-col justify-start">
        {/* Time Picker Controls / Converter Drawer */}
        <div className="mb-4">
          <TimePickerControls
            currentDate={currentDate}
            isAutoSync={isAutoSync}
            homeCity={homeCity}
            theme={theme}
            lang={lang}
            onDateChange={handleDateChange}
            onToggleAutoSync={() => setIsAutoSync(!isAutoSync)}
            onSyncNow={handleSyncToLive}
            onChangeCity={() => setIsHomePickerOpen(true)}
            homeRow={
              <FidsBoardRow
                city={homeCity}
                timeDetails={getTimeDetails(currentDate, homeCity.timezone, homeCity.timezone, lang)}
                isHome
                embedded
                canDelete={cities.length > 1}
                totalCityColumns={Math.max(16, ...cities.map((c) => getCityName(c, lang).length))}
                theme={theme}
                dotColor={dotColor}
                soundEnabled={soundEnabled}
                use24Hour={use24Hour}
                globalLabelMode={globalLabelMode}
                lang={lang}
                eventDate={currentDate}
                onSetHome={(c) => setHomeCityId(c.id)}
                onRemoveCity={handleRemoveCity}
              />
            }
          />
        </div>

        {/* View Routing: Map or Classic FIDS Board */}
        {viewTab === 'map' ? (
          <MapLibreView
            cities={cities}
            homeCity={homeCity}
            currentDate={currentDate}
            theme={theme}
            use24Hour={use24Hour}
            lang={lang}
            globalLabelMode={globalLabelMode}
            onSetHome={(city) => setHomeCityId(city.id)}
          />
        ) : (
          /* ================= DATE-GROUPED FIDS BOARD VIEW (card grid) ================= */
          <div className="w-full pt-2 pb-6 space-y-7">
            <p className="text-sm opacity-70 px-1">{t.tapHint}</p>
            <div className="grid gap-3 sm:gap-4 items-start grid-cols-[repeat(auto-fill,minmax(min(100%,400px),1fr))]">
              {groupedCitiesByDate.flatMap((group) =>
                group.citiesWithDetails.map(({ city, details, isHome }) => (
                  <FidsBoardRow
                    key={city.id}
                    stacked
                    caption={
                      <>
                        <span>{group.dateTitle}</span>
                        <span className="chip">{group.dayBadge}</span>
                      </>
                    }
                    city={city}
                    timeDetails={details}
                    isHome={isHome}
                    canDelete={cities.length > 1}
                    entering={city.id === enteringId}
                    totalCityColumns={Math.max(16, ...cities.map((c) => getCityName(c, lang).length))}
                    theme={theme}
                    dotColor={dotColor}
                    soundEnabled={soundEnabled}
                    use24Hour={use24Hour}
                    globalLabelMode={globalLabelMode}
                    lang={lang}
                    eventDate={currentDate}
                    onSetHome={(c) => setHomeCityId(c.id)}
                    onRemoveCity={handleRemoveCity}
                  />
                ))
              )}
            </div>

            <button type="button" className="add-tile" onClick={() => setIsCitySearchOpen(true)}>
              <Plus className="w-4 h-4" />
              <span>{t.addCity}</span>
            </button>
          </div>
        )}
      </main>

      <footer className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 2xl:px-14 pb-8 text-sm opacity-70 flex flex-wrap items-center justify-between gap-2">
        <span>World Time · FIDS</span>
        <a
          href="https://affandymurad.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          title={t.createdBy}
          className="inline-flex items-center gap-1.5 hover:underline"
        >
          <UserRound className="w-3.5 h-3.5" />
          Affandy Murad
        </a>
      </footer>

      {/* ================= MODALS ================= */}
      {/* 1. City Search & Add Modal */}
      <CitySearchModal
        isOpen={isCitySearchOpen}
        onClose={() => setIsCitySearchOpen(false)}
        onAddCity={handleAddCity}
        selectedCityIds={cities.map((c) => c.id)}
        theme={theme}
        lang={lang}
        homeTimezone={homeCity.timezone}
        use24Hour={use24Hour}
      />

      {/* 1b. Pick "My City" (changes the reference timezone in one step) */}
      <CitySearchModal
        isOpen={isHomePickerOpen}
        onClose={() => setIsHomePickerOpen(false)}
        onAddCity={handlePickHome}
        selectedCityIds={cities.map((c) => c.id)}
        theme={theme}
        lang={lang}
        homeTimezone={homeCity.timezone}
        use24Hour={use24Hour}
        mode="pickHome"
        homeCityId={homeCity.id}
      />

      {/* 1c. Help / how to use */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} theme={theme} lang={lang} />

      {/* 2. Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        use24Hour={use24Hour}
        onToggle24Hour={() => setUse24Hour(!use24Hour)}
        globalLabelMode={globalLabelMode}
        onChangeGlobalLabelMode={setGlobalLabelMode}
        lang={lang}
        onChangeLang={setLang}
        onResetCities={handleResetCities}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
