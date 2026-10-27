import React, { useEffect } from 'react';
import { X, MapPin, Pencil, Plus, CalendarPlus, Map as MapIcon, Settings, Trash2, Info } from 'lucide-react';
import { ThemeMode, Language } from '../types';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  lang: Language;
}

interface Step {
  icon: React.ReactNode;
  title: string;
  text: string;
}

interface Content {
  title: string;
  intro: string;
  stepsTitle: string;
  steps: Step[];
  termsTitle: string;
  terms: { term: string; text: string }[];
  privacy: string;
  close: string;
}

const iconCls = 'w-5 h-5';

const CONTENT: Record<Language, Content> = {
  en: {
    title: 'About & How to Use',
    intro:
      'World Time shows the current time in cities around the world on an airport-style dot-matrix board, so you can quickly compare time zones, plan calls and check what day it is somewhere else.',
    stepsTitle: 'Quick start',
    steps: [
      {
        icon: <MapPin className={iconCls} />,
        title: 'Your city comes first',
        text: 'The big card at the top is "My City" (your reference city). Use "Change City" to pick another one, or choose your device\'s time zone with one tap.',
      },
      {
        icon: <Plus className={iconCls} />,
        title: 'Add more cities',
        text: 'Tap "Add City" at the bottom of the list, search for a city or country, and press "Add". Each city shows its local time and GMT offset.',
      },
      {
        icon: <Info className={iconCls} />,
        title: 'Tap a city for details',
        text: 'Tap any row to see business-hours status, daylight saving time, the time zone name and a link to Wikipedia. You can also make that city "My City" from there.',
      },
      {
        icon: <Pencil className={iconCls} />,
        title: 'Check another date or time',
        text: 'Press "Change Time & Date", pick a date and time (or use the quick buttons: Now, +1 Hour, Tomorrow 09:00…). All cities update together. Press "Back to Now" to return to live time.',
      },
      {
        icon: <CalendarPlus className={iconCls} />,
        title: 'Add to your calendar',
        text: 'The calendar button on a row creates an event for the time shown in Google Calendar, Apple / iCal, Outlook.com, Office 365 or Yahoo Calendar.',
      },
      {
        icon: <MapIcon className={iconCls} />,
        title: 'See it on the map',
        text: 'Switch to "World Map" to see every city\'s local time on an interactive map.',
      },
      {
        icon: <Settings className={iconCls} />,
        title: 'Make it yours',
        text: 'In Settings you can change language, light/dark theme, board text (city or time zone), sound, 12/24-hour format and fullscreen.',
      },
      {
        icon: <Trash2 className={iconCls} />,
        title: 'Remove a city',
        text: 'Press the trash button on a row. The list always keeps at least one city.',
      },
    ],
    termsTitle: 'Good to know',
    terms: [
      { term: 'My City', text: 'The reference city. Days like "Yesterday" or "Tomorrow" on other rows are compared with it.' },
      { term: 'GMT+7', text: 'How many hours a city is ahead of (+) or behind (−) Greenwich time.' },
      { term: 'DST', text: 'Daylight saving time. It is detected automatically and the offset changes on its own.' },
      { term: 'Business hours', text: 'Monday–Friday, 09:00–18:00 local time. Weekends are never counted.' },
      { term: 'Anywhere on Earth', text: 'The UTC−12 zone, often used for deadlines that end "anywhere on Earth".' },
    ],
    privacy: 'Your city list and settings are saved only in this browser. Nothing is sent to a server.',
    close: 'Got it',
  },
  id: {
    title: 'Tentang & Cara Penggunaan',
    intro:
      'World Time menampilkan jam di berbagai kota dunia pada papan dot matrix bergaya bandara, sehingga Anda bisa membandingkan zona waktu, merencanakan rapat, dan mengecek hari di tempat lain dengan cepat.',
    stepsTitle: 'Mulai cepat',
    steps: [
      {
        icon: <MapPin className={iconCls} />,
        title: 'Kota Anda tampil paling atas',
        text: 'Kartu besar di atas adalah "Kota Saya" (kota acuan Anda). Pakai "Ganti Kota" untuk memilih kota lain, atau pilih zona waktu perangkat dengan satu ketukan.',
      },
      {
        icon: <Plus className={iconCls} />,
        title: 'Tambah kota lain',
        text: 'Ketuk "Tambah Kota" di bawah daftar, cari kota atau negara, lalu tekan "Tambah". Setiap kota menampilkan jam lokal dan selisih GMT-nya.',
      },
      {
        icon: <Info className={iconCls} />,
        title: 'Ketuk kota untuk melihat detail',
        text: 'Ketuk sebuah baris untuk melihat status jam kerja, waktu musim panas, nama zona waktu, dan tautan Wikipedia. Dari sana Anda juga bisa menjadikannya "Kota Saya".',
      },
      {
        icon: <Pencil className={iconCls} />,
        title: 'Cek tanggal atau jam lain',
        text: 'Tekan "Ubah Jam & Tanggal", pilih tanggal dan jam (atau pakai tombol cepat: Sekarang, +1 Jam, Besok 09:00…). Semua kota ikut berubah. Tekan "Kembali ke Sekarang" untuk kembali ke waktu nyata.',
      },
      {
        icon: <CalendarPlus className={iconCls} />,
        title: 'Tambahkan ke kalender',
        text: 'Tombol kalender pada baris membuat acara untuk jam yang sedang tampil di Google Kalender, Apple / iCal, Outlook.com, Office 365, atau Yahoo Kalender.',
      },
      {
        icon: <MapIcon className={iconCls} />,
        title: 'Lihat di peta',
        text: 'Pindah ke tab "Peta Dunia" untuk melihat jam lokal setiap kota pada peta interaktif.',
      },
      {
        icon: <Settings className={iconCls} />,
        title: 'Sesuaikan tampilan',
        text: 'Di Pengaturan Anda bisa mengubah bahasa, tema terang/gelap, teks papan (kota atau zona waktu), suara, format 12/24 jam, dan layar penuh.',
      },
      {
        icon: <Trash2 className={iconCls} />,
        title: 'Hapus kota',
        text: 'Tekan tombol tempat sampah pada baris. Daftar selalu menyisakan minimal satu kota.',
      },
    ],
    termsTitle: 'Istilah singkat',
    terms: [
      { term: 'Kota Saya', text: 'Kota acuan. Penanda seperti "Kemarin" atau "Besok" pada baris lain dibandingkan dengan kota ini.' },
      { term: 'GMT+7', text: 'Berapa jam sebuah kota lebih cepat (+) atau lebih lambat (−) dari waktu Greenwich.' },
      { term: 'DST', text: 'Waktu musim panas. Terdeteksi otomatis dan selisih jamnya berubah sendiri.' },
      { term: 'Jam kerja', text: 'Senin–Jumat, pukul 09.00–18.00 waktu setempat. Akhir pekan tidak pernah dihitung.' },
      { term: 'Di Mana Saja di Bumi', text: 'Zona UTC−12, sering dipakai untuk tenggat yang berakhir "di mana saja di bumi" (Anywhere on Earth).' },
    ],
    privacy: 'Daftar kota dan pengaturan Anda hanya tersimpan di browser ini. Tidak ada data yang dikirim ke server.',
    close: 'Mengerti',
  },
};

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, theme, lang }) => {
  const isDark = theme === 'dark';
  const c = CONTENT[lang];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const muted = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        className={`w-full max-w-xl rounded-2xl shadow-2xl border flex flex-col max-h-[90vh] overflow-hidden ${
          isDark ? 'bg-[color:var(--surface)] border-[color:var(--line)] text-white' : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        {/* Title */}
        <div className={`px-5 py-4 border-b flex items-center justify-between ${isDark ? 'border-[color:var(--line)]' : 'border-slate-300'}`}>
          <h2 className="text-lg font-bold">{c.title}</h2>
          <button
            onClick={onClose}
            aria-label={c.close}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto space-y-5 text-[15px] leading-relaxed">
          <p className={muted}>{c.intro}</p>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2.5">{c.stepsTitle}</h3>
            <ol className="space-y-3">
              {c.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-[color:var(--surface-2)] text-amber-300 border border-[color:var(--line)]' : 'bg-slate-100 text-amber-700 border border-slate-300'
                    }`}
                  >
                    {s.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold">
                      {i + 1}. {s.title}
                    </div>
                    <p className={muted}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2.5">{c.termsTitle}</h3>
            <dl className="space-y-2">
              {c.terms.map((t) => (
                <div key={t.term} className={`rounded-xl px-3.5 py-2.5 border ${isDark ? 'bg-[color:var(--surface-2)] border-[color:var(--line)]' : 'bg-slate-50 border-slate-300'}`}>
                  <dt className="font-bold">{t.term}</dt>
                  <dd className={muted}>{t.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{c.privacy}</p>
        </div>

        <div className={`px-5 py-3.5 border-t flex justify-end ${isDark ? 'border-[color:var(--line)]' : 'border-slate-300'}`}>
          <button
            onClick={onClose}
            className={`px-5 py-2 text-sm font-bold rounded-xl ${
              isDark ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {c.close}
          </button>
        </div>
      </div>
    </div>
  );
};
