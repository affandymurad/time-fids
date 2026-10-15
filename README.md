# World Time — Airport Dot Matrix Clock

Jam dunia bergaya papan informasi bandara (dot matrix split-flap), lengkap dengan konversi waktu antar kota,
deteksi DST, tampilan peta, dan dukungan Bahasa Indonesia / English.

**Demo:** https://time-fids.web.app

## Fitur

- **Papan dot matrix** — jam dan nama kota/zona waktu tampil sebagai matriks titik dengan animasi flip dan suara mekanik (opsional).
- **311 kota dan zona waktu** — kota utama dunia, ibu kota negara besar, kota-kota penting Indonesia dan Malaysia, serta zona terpencil (stasiun Antarktika, atol Pasifik, dan lainnya). Termasuk *Anywhere on Earth* (AoE) dan UTC.
- **DST otomatis** — status Daylight Saving Time, singkatan zona (EDT, BST, AEDT, WIB, ...), nama zona waktu, dan offset GMT dihitung dari data zona waktu IANA bawaan browser.
- **Konversi waktu manual** — atur jam dan tanggal (dropdown, scroll, atau slider 24 jam) dan semua kota ikut berubah; ada preset cepat dan tombol kembali ke waktu nyata.
- **Pengelompokan per tanggal** — baris diurutkan menurut hari dan jam lokal (Kemarin / Hari ini / Besok), dengan penanda jam kerja (Senin–Jumat, 09:00–18:00) dan akhir pekan.
- **Peta dunia** — peta interaktif (MapLibre + OpenStreetMap) dengan marker jam lokal tiap kota.
- **Tambah ke kalender** — Google Calendar, Apple / iCal (file `.ics`), Outlook.com, Office 365, dan Yahoo Calendar.
- **Dua bahasa** — Indonesia dan English, termasuk nama negara dan nama zona waktu.
- **Tema terang dan gelap** — palet biru pastel, dengan pilihan warna LED dot matrix di mode gelap.
- **Mode 24 jam / 12 jam** — di 12 jam, penanda `A` / `P` tampil terpisah setelah waktu.
- **Responsif** — tata letak khusus untuk layar sempit (hingga sekitar 300 px).
- **Tautan Wikipedia** per kota sesuai bahasa yang dipilih.
- **Data tersimpan di browser** — daftar kota dan pengaturan disimpan di `localStorage`; tidak ada data pengguna yang dikirim ke server.

## Teknologi

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) dan [Tailwind CSS 4](https://tailwindcss.com)
- [MapLibre GL](https://maplibre.org) untuk peta
- [lucide-react](https://lucide.dev) untuk ikon
- [flag-icons](https://github.com/lipis/flag-icons) untuk bendera negara (dibundel lokal, bekerja offline)
- `Intl` API browser untuk zona waktu, DST, dan nama zona

## Menjalankan secara lokal

Prasyarat: [Node.js](https://nodejs.org) 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Pratinjau hasil build |
| `npm run lint` | Pemeriksaan tipe TypeScript (`tsc --noEmit`) |

## Struktur proyek

```
src/
├── App.tsx                     # Tata letak utama, state, header
├── components/
│   ├── FidsBoardRow.tsx        # Satu baris kota (dot matrix + detail)
│   ├── FidsDotCharacter.tsx    # Satu karakter dot matrix beranimasi
│   ├── TimePickerControls.tsx  # Pengatur jam dan tanggal manual
│   ├── CitySearchModal.tsx     # Pencarian dan penambahan kota
│   ├── SettingsModal.tsx       # Pengaturan (bahasa, tema, suara, format)
│   ├── MapLibreView.tsx        # Tampilan peta dunia
│   ├── AddToCalendarMenu.tsx   # Menu tambah ke kalender
│   └── CountryFlag.tsx         # Bendera negara
└── utils/
    ├── timeZones.ts            # Data kota dan perhitungan waktu / DST
    ├── i18n.ts                 # Terjemahan dan nama negara / zona waktu
    ├── calendar.ts             # Tautan kalender dan pembuat file .ics
    ├── intlCache.ts            # Cache Intl.DateTimeFormat
    ├── dotMatrixFont.ts        # Font matriks titik
    └── audio.ts                # Suara flip mekanik
```

## Menambah kota

Data kota ada di [`src/utils/timeZones.ts`](src/utils/timeZones.ts). Tambahkan satu objek di daftar `RAW_CITIES`:

```ts
{
  "id": "contoh-kota",
  "name": "CONTOH KOTA",          // huruf besar; tampil di papan
  "country": "Indonesia",          // nama Inggris negara
  "countryCode": "id",             // kode ISO 3166-1 alpha-2 (untuk bendera)
  "continent": "asia",             // asia | europe | america | oceania | africa | antarctica | other
  "timezone": "Asia/Jakarta",      // nama zona waktu IANA
  "lat": -6.2088,
  "lng": 106.8456,
  "code": "JKT",                   // kode kota (opsional; boleh kosong)
  "tzAbbr": "WIB"                  // singkatan statis (opsional)
}
```

Catatan: `id` dan `name` harus unik. Opsi lain: `nameId` (nama versi Indonesia) dan `wikiTitle` (judul artikel Wikipedia per bahasa).

## Deploy ke Firebase Hosting

Konfigurasi sudah ada di [`firebase.json`](firebase.json) dan [`.firebaserc`](.firebaserc).

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy --only hosting
```

Ganti project dan site di `.firebaserc` dan `firebase.json` (`"site"`) bila memakai akun Firebase sendiri.

## Pembuat

Dibuat oleh [Affandy Murad](https://affandymurad.github.io/).
