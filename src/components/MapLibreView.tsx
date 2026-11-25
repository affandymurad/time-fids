import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// maplibre-gl v6 ships its worker as a separate module; hand Vite's URL for it to the library
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import { City, ThemeMode, TimeDetails, Language } from '../types';
import { getTimeDetails } from '../utils/timeZones';
import { getTimeZoneAbbr } from '../utils/timeZones';
import { TRANSLATIONS } from '../utils/i18n';
import { CountryFlag, getCountryFlagSvgString } from './CountryFlag';
import { Home, Crosshair, Layers } from 'lucide-react';

interface MapLibreViewProps {
  cities: City[];
  homeCity: City;
  currentDate: Date;
  theme: ThemeMode;
  use24Hour: boolean;
  lang: Language;
  globalLabelMode?: 'city' | 'timezone';
  onSetHome: (city: City) => void;
  onSelectCity?: (city: City) => void;
}

maplibregl.setWorkerUrl(workerUrl);

// Same configuration as the Megacity page (OpenFreeMap Positron style, world view)
const MAP_CONFIG = {
  STYLE_URL: 'https://tiles.openfreemap.org/styles/positron',
  WORLD_VIEW: { lat: 20.0, lng: 15.0, zoom: 2 },
};

export const MapLibreView: React.FC<MapLibreViewProps> = ({
  cities,
  homeCity,
  currentDate,
  theme,
  use24Hour,
  lang,
  globalLabelMode = 'city',
  onSetHome,
  onSelectCity,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>(homeCity.id);
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  // Same map setup as the Megacity page: OpenFreeMap "Positron" vector style,
  // falling back to plain OpenStreetMap raster tiles if the style cannot be fetched.
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    let cancelled = false;
    let resizeObs: ResizeObserver | null = null;

    const FALLBACK_STYLE: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tileSize: 256,
          maxzoom: 18,
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
        },
      },
      layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
    };

    const pickStyle = () =>
      fetch(MAP_CONFIG.STYLE_URL)
        .then((r) => {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return { style: MAP_CONFIG.STYLE_URL as string | maplibregl.StyleSpecification, basic: false };
        })
        .catch(() => ({ style: FALLBACK_STYLE as string | maplibregl.StyleSpecification, basic: true }));

    pickStyle().then(({ style, basic }) => {
      if (cancelled || !mapContainerRef.current) return;
      try {
        const map = new maplibregl.Map({
          container: mapContainerRef.current,
          style,
          center: [MAP_CONFIG.WORLD_VIEW.lng, MAP_CONFIG.WORLD_VIEW.lat],
          zoom: MAP_CONFIG.WORLD_VIEW.zoom - 1,
          maxZoom: basic ? 18 : 19,
          pitch: 0,
          maxPitch: 0,
          attributionControl: false,
        });
        mapRef.current = map;

        map.addControl(
          new maplibregl.AttributionControl({
            compact: true,
            customAttribution: basic
              ? ''
              : '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">&copy; OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
          }),
          'bottom-left'
        );
        map.addControl(new maplibregl.ScaleControl({ maxWidth: 110, unit: 'metric' }), 'bottom-left');
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
        map.addControl(
          new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: false }),
          'bottom-right'
        );

        if (typeof ResizeObserver !== 'undefined') {
          resizeObs = new ResizeObserver(() => mapRef.current?.resize());
          resizeObs.observe(mapContainerRef.current);
        }
        map.on('error', (ev) => {
          const m = ev.error?.message ?? '';
          if (/webgl|context/i.test(m)) setMapError(m);
        });
        setMapReady(true);
      } catch (e) {
        setMapError(e instanceof Error ? e.message : String(e));
      }
    });

    return () => {
      cancelled = true;
      resizeObs?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  // Update Markers whenever cities, currentDate, theme, or globalLabelMode changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    cities.forEach((city) => {
      const isHome = city.id === homeCity.id;
      const isSelected = city.id === selectedCityId;
      const timeDetails = getTimeDetails(currentDate, city.timezone, homeCity.timezone, lang);
      const timeStr = use24Hour ? timeDetails.time24 : timeDetails.time12;
      const flagCode = (city.countryCode || 'un').toLowerCase();
      // Display City Name or Timezone Abbreviation based on toggle

      const labelText =
        globalLabelMode === 'timezone'
          ? (getTimeZoneAbbr(city.timezone, city.tzAbbr, new Date(), city.countryCode) || city.timezone.split('/')[1]?.replace(/_/g, ' ') || city.name)
          : city.tzAbbr === 'AoE'
          ? 'AoE'
          : city.name.length <= 12
          ? city.name
          : city.name.split(' ')[0];

      const el = document.createElement('div');
      // Static bounding box to eliminate pointer-hover jitter/instability
      el.className = 'cursor-pointer select-none group relative';
      el.style.zIndex = isHome || isSelected ? '40' : '10';

      el.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="px-2.5 py-1 rounded-lg text-sm font-mono font-bold shadow-md border flex items-center gap-1.5 whitespace-nowrap transition-colors duration-150 group-hover:border-[color:var(--ink)] group-hover:ring-2 group-hover:ring-[color:var(--ink)]/40 ${
            isHome
              ? 'bg-[color:var(--ink)] text-[color:var(--page-bg)] border-[color:var(--ink)] ring-2 ring-[color:var(--ink)]/35'
              : isSelected
              ? 'bg-[color:var(--ink)] text-[color:var(--page-bg)] border-[color:var(--ink)] ring-2 ring-[color:var(--ink)]/35'
              : isDark
              ? 'bg-[color:var(--surface-2)] text-white border-[color:var(--ink)]/40'
              : 'bg-white text-slate-900 border-slate-300'
          }">
            <span class="w-4.5 h-3 overflow-hidden rounded-xs border border-black/20 inline-flex items-center justify-center shrink-0 shadow-2xs">${getCountryFlagSvgString(flagCode)}</span>
            <span class="font-sans font-bold tracking-tight">${labelText}</span>
            <span class="px-1.5 py-0.5 rounded font-mono ${
              isHome
                ? 'bg-[color:var(--page-bg)]/25 text-[color:var(--page-bg)] font-bold'
                : isDark
                ? 'bg-slate-800 text-amber-400'
                : 'bg-slate-100 text-slate-900 font-bold'
            }">${timeStr}</span>
          </div>
          <div class="w-2.5 h-2.5 rotate-45 -mt-1.5 border-r border-b ${
            isHome
              ? 'bg-[color:var(--ink)] border-[color:var(--ink)]'
              : isSelected
              ? 'bg-[color:var(--ink)] border-[color:var(--ink)]'
              : isDark
              ? 'bg-[color:var(--surface-2)] border-[color:var(--ink)]/40'
              : 'bg-white border-slate-300'
          }"></div>
        </div>
      `;

      // Stabilize zIndex during hover without scaling dimensions
      el.addEventListener('mouseenter', () => {
        el.style.zIndex = '100';
      });
      el.addEventListener('mouseleave', () => {
        el.style.zIndex = isHome || isSelected ? '40' : '10';
      });

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedCityId(city.id);
        if (onSelectCity) onSelectCity(city);
        map.flyTo({
          center: [city.lng, city.lat],
          zoom: Math.max(map.getZoom(), 4),
          duration: 1000,
        });
      });

      // Bottom anchor ensures coordinate matches the arrow point tip
      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([city.lng, city.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [cities, currentDate, homeCity, selectedCityId, theme, use24Hour, lang, globalLabelMode, mapReady]);

  // Reset to Home City view
  const handleCenterHome = () => {
    mapRef.current?.flyTo({
      center: [homeCity.lng, homeCity.lat],
      zoom: 3.5,
      duration: 1000,
    });
    setSelectedCityId(homeCity.id);
  };

  const selectedCity = cities.find((c) => c.id === selectedCityId) || homeCity;
  const selectedDetails: TimeDetails = getTimeDetails(currentDate, selectedCity.timezone, homeCity.timezone, lang);

  return (
    <div
      className={`rounded-2xl border p-3 sm:p-5 transition-all shadow-xl relative overflow-hidden flex flex-col ${
        isDark ? 'bg-[color:var(--surface)] border-[color:var(--line)]' : 'bg-white border-slate-200'
      }`}
    >
      {/* Top Header over Map */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="font-bold text-sm sm:text-base">
              {t.map} &bull; OpenFreeMap
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {lang === 'id'
                ? 'Peta dunia interaktif dengan penanda jam lokal secara real-time.'
                : 'Interactive world map with live local time markers.'}
            </p>
          </div>
        </div>

        {/* Selected City Details Bar */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl border text-sm flex items-center gap-2 ${
              isDark ? 'bg-[var(--surface-3)] border-slate-700 text-white' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <CountryFlag countryCode={selectedCity.countryCode} countryName={selectedCity.country} size="md" />
            <span className="font-bold">{selectedCity.name}</span>
            <span className="font-mono font-bold text-blue-500">
              {use24Hour ? selectedDetails.time24 : selectedDetails.time12}
            </span>
            <span className="text-slate-400 font-mono text-sm">{selectedDetails.offsetStr}</span>
          </div>

          {selectedCity.id !== homeCity.id && (
            <button
              onClick={() => onSetHome(selectedCity)}
              className="px-3 py-1.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.setHome}</span>
            </button>
          )}
        </div>
      </div>

      {/* Map Canvas Container */}
      <div
        className={`relative w-full h-[460px] sm:h-[540px] rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800 ${
          isDark ? 'osm-dark-mode' : ''
        }`}
      >
        <div ref={mapContainerRef} className="w-full h-full" />
        {mapError && (
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm bg-[color:var(--surface)] text-[color:var(--ink)]">
            <div>
              <div className="font-semibold mb-1">{lang === 'id' ? 'Peta tidak dapat ditampilkan' : 'The map could not be shown'}</div>
              <p className="opacity-70 max-w-[44ch]">
                {lang === 'id'
                  ? 'Peta memerlukan WebGL dan akses ke tile. Buka halaman ini langsung di Chrome/Firefox/Edge.'
                  : 'The map needs WebGL and access to the tiles. Open this page directly in Chrome/Firefox/Edge.'}
              </p>
            </div>
          </div>
        )}

        {/* Map Floating Controls (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Re-center Home button */}
          <button
            onClick={handleCenterHome}
            title={lang === 'id' ? 'Pusatkan ke Kota Saya' : 'Center on My City'}
            className={`p-2 rounded-lg border shadow-lg flex items-center justify-center transition-all ${
              isDark
                ? 'bg-[color:var(--surface)]/90 hover:bg-[color:var(--surface-2)] text-amber-400 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-amber-600 border-slate-300'
            }`}
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
