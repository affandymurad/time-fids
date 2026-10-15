import React from 'react';
import { ThemeMode, DotColor, BoardLabelMode, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { X, Volume2, VolumeX, Moon, Sun, Clock, RotateCcw, Palette } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  dotColor: DotColor;
  onChangeDotColor: (color: DotColor) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  use24Hour: boolean;
  onToggle24Hour: () => void;
  globalLabelMode: BoardLabelMode;
  onChangeGlobalLabelMode: (mode: BoardLabelMode) => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onResetCities: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  dotColor,
  onChangeDotColor,
  soundEnabled,
  onToggleSound,
  use24Hour,
  onToggle24Hour,
  globalLabelMode,
  onChangeGlobalLabelMode,
  lang,
  onChangeLang,
  onResetCities,
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl border p-5 space-y-4 max-h-[90vh] overflow-y-auto ${
          isDark
            ? 'bg-[#131c27] border-[#2f4157] text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-500" />
            {t.settings}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Language: ID / EN */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Bahasa / Language
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChangeLang('id')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                lang === 'id'
                  ? 'border-amber-500 bg-amber-500/15 text-amber-400 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <span>🇮🇩 Bahasa Indonesia</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                lang === 'en'
                  ? 'border-amber-500 bg-amber-500/15 text-amber-400 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <span>🇬🇧 English</span>
            </button>
          </div>
        </div>

        {/* 2. Theme: Light / Dark */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {t.theme}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                if (theme !== 'light') onToggleTheme();
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                theme === 'light'
                  ? 'border-amber-500 bg-amber-500/10 text-slate-900 shadow-xs font-black'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>{t.lightTheme}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (theme !== 'dark') onToggleTheme();
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                theme === 'dark'
                  ? 'border-amber-500 bg-amber-500/15 text-amber-400 shadow-xs font-black'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Moon className="w-4 h-4 text-amber-400" />
              <span>{t.darkTheme}</span>
            </button>
          </div>
        </div>

        {/* 3. Label Mode: Nama Kota vs Nama Zona Waktu */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {t.textFormat}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChangeGlobalLabelMode('city')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                globalLabelMode === 'city'
                  ? 'border-amber-500 bg-amber-500/15 text-amber-400 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <span>{t.city} (JAKARTA, TOKYO)</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeGlobalLabelMode('timezone')}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                globalLabelMode === 'timezone'
                  ? 'border-amber-500 bg-amber-500/15 text-amber-400 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <span>{t.timezone} (WIB, JST)</span>
            </button>
          </div>
        </div>

        {/* 4. Dot Color LED (Dark mode) */}
        {isDark && (
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              {t.dotColorLed}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'amber', label: t.dotPastelBlue, color: '#9fc8f2' },
                { id: 'monochrome', label: t.dotClassicWhite, color: '#eaf1fa' },
                { id: 'cyan', label: t.dotAeroCyan, color: '#74c4cc' },
                { id: 'green', label: t.dotRadarGreen, color: '#72bf94' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onChangeDotColor(c.id as DotColor)}
                  className={`p-2 rounded-xl border flex items-center gap-2.5 text-sm font-bold transition-all ${
                    dotColor === c.id
                      ? 'border-amber-500 bg-amber-500/15 text-white shadow-xs'
                      : 'border-slate-800 hover:bg-slate-800/60 text-slate-400'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 5. Sound Effects */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#192432]">
          <div className="flex items-center gap-2.5">
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-amber-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
            <div>
              <div className="text-sm font-bold">{t.sound}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {t.soundDesc}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleSound}
            className={`px-3 py-1 text-sm font-bold rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-amber-500 text-slate-950 font-black border-amber-400'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-transparent'
            }`}
          >
            {soundEnabled ? t.soundActive : t.soundMute}
          </button>
        </div>

        {/* 6. Time Format (24H vs 12H) */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#192432]">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-sm font-bold">{t.timeFormat}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                24H (14:30) / 12H (02:30 PM)
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggle24Hour}
            className="px-3 py-1 text-sm font-bold font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            {use24Hour ? t.hours24 : t.hours12}
          </button>
        </div>

        {/* Reset & Done Actions */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset daftar kota ke default (Jakarta, Tokyo, London, New York, Dubai, Los Angeles)?')) {
                onResetCities();
                onClose();
              }
            }}
            className="text-sm text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.resetDefault}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-bold rounded-xl text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xs"
          >
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
};
