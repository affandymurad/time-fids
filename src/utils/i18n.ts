import { cachedDtf } from './intlCache';
export type Language = 'id' | 'en';

export const TRANSLATIONS = {
  id: {
    clock: 'Jam (FIDS)',
    map: 'Peta Dunia',
    city: 'Kota',
    timezone: 'Zona Waktu',
    both: 'Keduanya',
    home: 'UTAMA',
    setHome: 'Jadikan Utama',
    deleteCity: 'Hapus Kota',
    addCity: 'Tambah Kota / Zona Waktu',
    searchPlaceholder: 'Cari kota, negara, atau zona waktu (WIB, Tokyo, London, EST)...',
    today: 'HARI INI',
    tomorrow: 'BESOK (+1 HARI)',
    yesterday: 'KEMARIN (-1 HARI)',
    sameDay: 'HARI YANG SAMA',
    liveSync: 'Sinkronisasi Waktu Nyata (Live)',
    customTime: 'Mode Konversi Waktu (Manual)',
    liveBadge: 'LIVE',
    customBadge: 'WAKTU MANUAL',
    scrollHint: '🖱️ Klik untuk dropdown / gulir dengan mouse',
    homeAnchor: 'Patokan Utama',
    syncNow: 'Sinkron ke Sekarang',
    closePicker: 'Tutup Pengatur',
    setTimeDate: 'Atur Jam & Tanggal',
    hours: 'Jam',
    minutes: 'Menit',
    day: 'Tanggal',
    month: 'Bulan',
    year: 'Tahun',
    timelineScrubber: 'Timeline Geser 24 Jam (00:00 - 23:59)',
    quickPresets: 'Preset Cepat',
    presetNow: 'Real-time Sekarang',
    presetPlus1: '+1 Jam',
    presetPlus3: '+3 Jam',
    presetWork: 'Jam Kerja (09:00)',
    presetTomorrow: 'Besok Pagi',
    businessHoursActive: 'Jam Kerja Aktif (09:00 - 18:00)',
    offHours: 'Di Luar Jam Kerja',
    weekend: 'Akhir Pekan',
    continentAll: 'Semua',
    continentAsia: 'Asia',
    continentEurope: 'Eropa',
    continentAmerica: 'Amerika',
    continentOceania: 'Oseania',
    continentAfrica: 'Afrika',
    continentAntarctica: 'Antarktika',
    continentOther: 'Lainnya',
    settings: 'Pengaturan',
    theme: 'Mode Tema',
    lightTheme: 'Terang',
    darkTheme: 'Gelap',
    sound: 'Suara Mekanikal Split-Flap',
    soundDesc: 'Efek audio ketukan fisik saat digit berganti',
    soundActive: 'AKTIF',
    soundMute: 'SENYAP',
    timeFormat: 'Format Waktu',
    hours24: '24 JAM',
    hours12: '12 JAM',
    textFormat: 'Format Teks di Papan',
    dotColorLed: 'Warna LED Dot Matrix (Mode Gelap)',
    addToCalendar: 'Tambah ke Kalender',
    calGoogle: 'Google Kalender',
    calApple: 'Kalender Apple / iCal',
    calOutlook: 'Outlook.com',
    calOffice365: 'Office 365',
    calYahoo: 'Yahoo Kalender',
    calEventNote: 'World Time • Dibuat oleh Affandy Murad',
    calEventTime: 'Waktu setempat',
    calEventZone: 'Zona waktu',
    createdBy: 'Dibuat oleh Affandy Murad',
    dotPastelBlue: 'Biru Pastel',
    dotClassicWhite: 'Putih Klasik',
    dotAeroCyan: 'Sian Aero',
    dotRadarGreen: 'Hijau Radar',
    settingsLabel: 'Pengaturan',
    themeToDark: 'Mode Terang (Geser untuk Mode Gelap)',
    themeToLight: 'Mode Gelap (Geser untuk Mode Terang)',
    modalFooter: 'Waktu Musim Panas (DST) IANA • OpenStreetMap',
    homeCitySelect: 'Kota Patokan Utama',
    resetDefault: 'Reset ke Default',
    done: 'Selesai',
    inBoard: 'Ada di Papan',
    add: 'Tambah',
    noCitiesFound: 'Tidak ada kota yang sesuai dengan pencarian.',
    dstActive: 'DST Aktif',
    standardTime: 'Waktu Standar',
    months: [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ],
    monthsShort: [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ],
    days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    daysShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  },
  en: {
    clock: 'Clock (FIDS)',
    map: 'World Map',
    city: 'City',
    timezone: 'Timezone',
    both: 'Both',
    home: 'HOME',
    setHome: 'Set as Home',
    deleteCity: 'Delete City',
    addCity: 'Add City / Timezone',
    searchPlaceholder: 'Search city, country, or timezone (UTC, Tokyo, London, EST)...',
    today: 'TODAY',
    tomorrow: 'TOMORROW (+1 DAY)',
    yesterday: 'YESTERDAY (-1 DAY)',
    sameDay: 'SAME DAY',
    liveSync: 'Real-time Live Sync',
    customTime: 'Time Conversion Mode (Manual)',
    liveBadge: 'LIVE',
    customBadge: 'CUSTOM TIME',
    scrollHint: '🖱️ Click to Dropdown / Scroll Mouse',
    homeAnchor: 'Home Anchor',
    syncNow: 'Sync to Real-time',
    closePicker: 'Close Picker',
    setTimeDate: 'Set Time & Date',
    hours: 'Hours',
    minutes: 'Minutes',
    day: 'Date',
    month: 'Month',
    year: 'Year',
    timelineScrubber: '24-Hour Slider (00:00 - 23:59)',
    quickPresets: 'Quick Presets',
    presetNow: 'Real-time Now',
    presetPlus1: '+1 Hour',
    presetPlus3: '+3 Hours',
    presetWork: 'Work Hours (09:00)',
    presetTomorrow: 'Tomorrow Morning',
    businessHoursActive: 'Business Hours (09:00 - 18:00)',
    offHours: 'Off Business Hours',
    weekend: 'Weekend',
    continentAll: 'All',
    continentAsia: 'Asia',
    continentEurope: 'Europe',
    continentAmerica: 'Americas',
    continentOceania: 'Oceania',
    continentAfrica: 'Africa',
    continentAntarctica: 'Antarctica',
    continentOther: 'Other',
    settings: 'Settings',
    theme: 'Theme Mode',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    sound: 'Split-Flap Mechanical Sound',
    soundDesc: 'Physical flap audio click when digits flip',
    soundActive: 'ACTIVE',
    soundMute: 'MUTE',
    timeFormat: 'Time Format',
    hours24: '24-HOUR',
    hours12: '12-HOUR',
    textFormat: 'Display Text on Board',
    dotColorLed: 'Dot Matrix LED Color (Dark Mode)',
    addToCalendar: 'Add to Calendar',
    calGoogle: 'Google Calendar',
    calApple: 'Apple / iCal',
    calOutlook: 'Outlook.com',
    calOffice365: 'Office 365',
    calYahoo: 'Yahoo Calendar',
    calEventNote: 'World Time • Created by Affandy Murad',
    calEventTime: 'Local time',
    calEventZone: 'Time zone',
    createdBy: 'Created by Affandy Murad',
    dotPastelBlue: 'Pastel Blue',
    dotClassicWhite: 'Classic White',
    dotAeroCyan: 'Aero Cyan',
    dotRadarGreen: 'Radar Green',
    settingsLabel: 'Settings',
    themeToDark: 'Light Mode (Slide for Dark Mode)',
    themeToLight: 'Dark Mode (Slide for Light Mode)',
    modalFooter: 'IANA Daylight Saving Time (DST) • OpenStreetMap',
    homeCitySelect: 'Home Anchor City',
    resetDefault: 'Reset to Default',
    done: 'Done',
    inBoard: 'On Board',
    add: 'Add',
    noCitiesFound: 'No cities matched your search.',
    dstActive: 'DST Active',
    standardTime: 'Standard Time',
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    monthsShort: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
};

/** City display name in the active language (Indonesian name when available). */
export function getCityName(city: { name: string; nameId?: string }, lang: 'id' | 'en'): string {
  return lang === 'id' && city.nameId ? city.nameId : city.name;
}

/** Reverse lookup "United States" -> "US" built once from the browser's English region names. */
let englishRegionToCode: Map<string, string> | null = null;
function regionCodeFromEnglishName(name: string): string | undefined {
  if (!englishRegionToCode) {
    englishRegionToCode = new Map();
    try {
      const en = new Intl.DisplayNames(['en'], { type: 'region' });
      for (let a = 65; a <= 90; a++) {
        for (let b = 65; b <= 90; b++) {
          const code = String.fromCharCode(a, b);
          const label = en.of(code);
          if (label && label !== code) englishRegionToCode.set(label.toLowerCase(), code);
        }
      }
    } catch {
      // Intl.DisplayNames unavailable: names stay in English
    }
  }
  return englishRegionToCode.get(name.toLowerCase());
}

/** Country display name in the active language (Indonesian via Intl.DisplayNames; English data otherwise). */
export function getCountryName(country: string, lang: 'id' | 'en', countryCode?: string): string {
  if (lang === 'en') return country;
  if (country === 'International') return 'Internasional';
  try {
    const id = new Intl.DisplayNames(['id'], { type: 'region' });
    const code = regionCodeFromEnglishName(country) ?? (countryCode ? countryCode.toUpperCase() : undefined);
    const label = code ? id.of(code) : undefined;
    if (label && label !== code) return label;
  } catch {
    // fall through
  }
  return country;
}

const longZoneName = (locale: string, timezone: string, date: Date): string | undefined => {
  try {
    return cachedDtf(locale, { timeZone: timezone, timeZoneName: 'long' })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')?.value;
  } catch {
    return undefined;
  }
};
// Zones for which Intl only knows a plain "GMT+x" (no CLDR name)
const FALLBACK_ZONE_NAMES: Record<string, { en: string; id: string }> = {
  'Africa/Casablanca': { en: 'Morocco Time', id: 'Waktu Maroko' },
  'Asia/Amman': { en: 'Jordan Time', id: 'Waktu Yordania' },
  'Asia/Damascus': { en: 'Syria Time', id: 'Waktu Suriah' },
  'Asia/Colombo': { en: 'Sri Lanka Time', id: 'Waktu Sri Lanka' },
  'Africa/El_Aaiun': { en: 'Western Sahara Time', id: 'Waktu Sahara Barat' },
  'Etc/GMT+8': { en: 'UTC-08:00', id: 'UTC-08:00' },
};


/**
 * Long timezone name. In Indonesian it is translated when a real Indonesian name exists
 * (e.g. "Waktu Indonesia Barat"); otherwise the international English name is kept.
 */
export function getTimeZoneName(timezone: string, date: Date, lang: 'id' | 'en' = 'en'): string {
  if (timezone === 'Etc/GMT+12') return lang === 'id' ? 'Di Mana Saja di Bumi (AoE)' : 'Anywhere on Earth (AoE)';
  const fallback = FALLBACK_ZONE_NAMES[timezone];
  if (fallback) return fallback[lang];
  const english = longZoneName('en-US', timezone, date) || timezone;
  if (lang !== 'id') return english;
  const indonesian = longZoneName('id-ID', timezone, date);
  return indonesian && !/^(GMT|UTC)[+\-−\d:.]*$/.test(indonesian) ? indonesian : english;
}
