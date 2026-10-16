import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { City, ThemeMode, TimeDetails, Language } from '../types';
import { getTimeDetails } from '../utils/timeZones';
import { getTimeZoneAbbr } from '../utils/timeZones';
import { TRANSLATIONS } from '../utils/i18n';
import { CountryFlag, getCountryFlagSvgString } from './CountryFlag';
import { Home, Crosshair, ZoomIn, ZoomOut, Layers } from 'lucide-react';

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

  // 100% Free Public OpenStreetMap tile URL (NO API KEY REQUIRED)
  const osmTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

  // Initialize MapLibre in clean 2D
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [osmTileUrl],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [homeCity.lng, homeCity.lat],
      zoom: 2.2,
      pitch: 0,
      bearing: 0,
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
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
          <div class="px-2.5 py-1 rounded-lg text-sm font-mono font-bold shadow-md border flex items-center gap-1.5 whitespace-nowrap transition-colors duration-150 group-hover:border-amber-400 group-hover:ring-2 group-hover:ring-amber-400/60 ${
            isHome
              ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
              : isSelected
              ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
              : isDark
              ? 'bg-[#131c27] text-white border-[#2f4157]'
              : 'bg-white text-slate-900 border-slate-300'
          }">
            <span class="w-4.5 h-3 overflow-hidden rounded-xs border border-black/20 inline-flex items-center justify-center shrink-0 shadow-2xs">${getCountryFlagSvgString(flagCode)}</span>
            <span class="font-sans font-bold tracking-tight">${labelText}</span>
            <span class="px-1.5 py-0.5 rounded font-mono ${
              isHome
                ? 'bg-amber-600/30 text-slate-950 font-bold'
                : isDark
                ? 'bg-slate-800 text-amber-400'
                : 'bg-slate-100 text-slate-900 font-bold'
            }">${timeStr}</span>
          </div>
          <div class="w-2.5 h-2.5 rotate-45 -mt-1.5 border-r border-b ${
            isHome
              ? 'bg-amber-500 border-amber-300'
              : isSelected
              ? 'bg-amber-500 border-amber-300'
              : isDark
              ? 'bg-[#131c27] border-[#2f4157]'
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
  }, [cities, currentDate, homeCity, selectedCityId, theme, use24Hour, lang, globalLabelMode]);

  // Zoom controls
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();

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
        isDark ? 'bg-[#131c27] border-[#2f4157]' : 'bg-white border-slate-200'
      }`}
    >
      {/* Top Header over Map */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="font-bold text-sm sm:text-base">
              {t.map} &bull; OpenStreetMap
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
              isDark ? 'bg-[#1e2b3b] border-slate-700 text-white' : 'bg-slate-100 border-slate-200'
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

        {/* Map Floating Controls (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Re-center Home button */}
          <button
            onClick={handleCenterHome}
            title={lang === 'id' ? 'Pusatkan ke Kota Saya' : 'Center on My City'}
            className={`p-2 rounded-lg border shadow-lg flex items-center justify-center transition-all ${
              isDark
                ? 'bg-[#131c27]/90 hover:bg-[#192432] text-amber-400 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-amber-600 border-slate-300'
            }`}
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls (Bottom Right) */}
        <div className="absolute bottom-4 right-3 flex flex-col gap-1 z-10 shadow-lg">
          <button
            onClick={handleZoomIn}
            title={lang === 'id' ? 'Perbesar' : 'Zoom in'}
            className={`p-2 rounded-t-lg border border-b-0 ${
              isDark
                ? 'bg-[#131c27] hover:bg-slate-800 text-white border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title={lang === 'id' ? 'Perkecil' : 'Zoom out'}
            className={`p-2 rounded-b-lg border ${
              isDark
                ? 'bg-[#131c27] hover:bg-slate-800 text-white border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Information pill (Bottom Left) */}
        <div
          className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-sm font-mono border backdrop-blur-md shadow-md z-10 hidden sm:flex items-center gap-2 ${
            isDark
              ? 'bg-[#131c27]/90 border-slate-800 text-slate-300'
              : 'bg-white/90 border-slate-300 text-slate-700'
          }`}
        >
          <span>OpenStreetMap &bull; MapLibre</span>
          <span className="hidden sm:inline">&bull; {lang === 'id' ? 'Klik penanda untuk info' : 'Click marker for info'}</span>
        </div>
      </div>
    </div>
  );
};
