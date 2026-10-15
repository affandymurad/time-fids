export type Language = 'id' | 'en';

export interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2, e.g. "us", "id", "gb", "jp"
  continent?: 'asia' | 'europe' | 'america' | 'oceania' | 'africa' | 'antarctica' | 'other';
  timezone: string;    // IANA timezone name (e.g. 'America/New_York')
  tzAbbr?: string;     // e.g. 'EDT', 'WIB', 'JST', 'UTC', 'GMT'
  flag?: string;       // Fallback emoji
  lat: number;
  lng: number;
  code?: string;       // Airport / city code (e.g. LAX, NYC, LON)
  nameId?: string;     // Optional Indonesian display name (falls back to `name`)
  wikiTitle?: { id?: string; en?: string }; // Exact Wikipedia article titles per language (overrides name search)
}

export type ThemeMode = 'light' | 'dark';
export type DotColor = 'monochrome' | 'amber' | 'cyan' | 'green';
export type ViewTab = 'clock' | 'map';
export type BoardLabelMode = 'city' | 'timezone';

export interface TimeDetails {
  hoursStr: string;     // '14'
  minutesStr: string;   // '30'
  secondsStr: string;   // '45'
  time24: string;       // '14:30'
  time12: string;       // '02:30 PM'
  period?: 'AM' | 'PM';
  dayName: string;      // 'Kamis' / 'Thu'
  dayNumber: string;    // '15'
  monthName: string;    // 'Okt' / 'Oct'
  monthNumber: number;  // 1-12
  yearNumber: number;   // 2026
  fullDateStr: string;  // 'Kamis, 15 Okt 2026'
  shortDateStr: string; // 'Thu, 15 Oct'
  offsetStr: string;    // 'GMT+7', 'GMT-4'
  offsetMinutes: number;
  tzAbbr: string;       // 'WIB', 'EDT', 'JST'
  isDst: boolean;
  dstName?: string;
  diffFromHomeHours: number; // e.g. +7 or -3
  diffDayDesc: 'same' | 'next' | 'prev'; // Same day, Tomorrow, Yesterday
  isBusinessHours: boolean; // 09:00 - 18:00, Mon-Fri only
  isWeekend: boolean;       // Saturday / Sunday in the city's timezone
}
