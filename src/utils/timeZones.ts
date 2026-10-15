import { cachedDtf } from './intlCache';
import { City, TimeDetails } from '../types';

/**
 * 173 Standard Wikipedia Time Zone Abbreviations
 * EXACTLY ONE representative city per time zone abbreviation
 * All duplicate cities sharing the same timezone have been removed
 */
export const DEFAULT_CITIES: City[] = [
  {
    "id": "sydney",
    "name": "SYDNEY",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Sydney",
    "lat": -33.8688,
    "lng": 151.2093,
    "code": "SYD",
    "tzAbbr": "AEDT"
  },
  {
    "id": "cairo",
    "name": "CAIRO",
    "country": "Egypt",
    "countryCode": "eg",
    "continent": "africa",
    "timezone": "Africa/Cairo",
    "lat": 30.0444,
    "lng": 31.2357,
    "code": "CAI",
    "tzAbbr": "EET"
  },
  {
    "id": "new-york",
    "name": "NEW YORK",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/New_York",
    "lat": 40.7128,
    "lng": -74.006,
    "code": "NYC",
    "tzAbbr": "EST"
  },
  {
    "id": "london",
    "name": "LONDON",
    "country": "United Kingdom",
    "countryCode": "gb",
    "continent": "europe",
    "timezone": "Europe/London",
    "lat": 51.5074,
    "lng": -0.1278,
    "code": "LON",
    "tzAbbr": "GMT"
  },
  {
    "id": "tokyo",
    "name": "TOKYO",
    "country": "Japan",
    "countryCode": "jp",
    "continent": "asia",
    "timezone": "Asia/Tokyo",
    "lat": 35.6762,
    "lng": 139.6503,
    "code": "TYO",
    "tzAbbr": "JST"
  },
  {
    "id": "jakarta",
    "name": "JAKARTA",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jakarta",
    "lat": -6.2088,
    "lng": 106.8456,
    "code": "JKT",
    "tzAbbr": "WIB"
  }
];

export const RAW_CITIES: City[] = [
  {
    "id": "adelaide",
    "name": "ADELAIDE",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Adelaide",
    "lat": -34.9285,
    "lng": 138.6007,
    "code": "ADL",
    "tzAbbr": "ACDT"
  },
  {
    "id": "darwin",
    "name": "DARWIN",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Darwin",
    "lat": -12.4634,
    "lng": 130.8456,
    "code": "DRW",
    "tzAbbr": "ACST"
  },
  {
    "id": "rio-branco",
    "name": "RIO BRANCO",
    "country": "Brazil",
    "countryCode": "br",
    "continent": "america",
    "timezone": "America/Rio_Branco",
    "lat": -9.9753,
    "lng": -67.8249,
    "code": "RBR",
    "tzAbbr": "ACT"
  },
  {
    "id": "eucla",
    "name": "EUCLA",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Eucla",
    "lat": -31.6778,
    "lng": 128.8833,
    "code": "EUC",
    "tzAbbr": "ACWST"
  },
  {
    "id": "halifax",
    "name": "HALIFAX",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/Halifax",
    "lat": 44.6488,
    "lng": -63.5752,
    "code": "YHZ",
    "tzAbbr": "ADT"
  },
  {
    "id": "brisbane",
    "name": "BRISBANE",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Brisbane",
    "lat": -27.4698,
    "lng": 153.0251,
    "code": "BNE",
    "tzAbbr": "AEST"
  },
  {
    "id": "kabul",
    "name": "KABUL",
    "country": "Afghanistan",
    "countryCode": "af",
    "continent": "asia",
    "timezone": "Asia/Kabul",
    "lat": 34.5553,
    "lng": 69.2075,
    "code": "KBL",
    "tzAbbr": "AFT"
  },
  {
    "id": "fairbanks",
    "name": "FAIRBANKS",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Anchorage",
    "lat": 64.8378,
    "lng": -147.7164,
    "code": "FAI",
    "tzAbbr": "AKDT"
  },
  {
    "id": "anchorage",
    "name": "ANCHORAGE",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Anchorage",
    "lat": 61.2181,
    "lng": -149.9003,
    "code": "ANC",
    "tzAbbr": "AKST"
  },
  {
    "id": "almaty",
    "name": "ALMATY",
    "country": "Kazakhstan",
    "countryCode": "kz",
    "continent": "asia",
    "timezone": "Asia/Almaty",
    "lat": 43.222,
    "lng": 76.8512,
    "code": "ALA",
    "tzAbbr": "ALMT"
  },
  {
    "id": "manaus",
    "name": "MANAUS",
    "country": "Brazil",
    "countryCode": "br",
    "continent": "america",
    "timezone": "America/Manaus",
    "lat": -3.119,
    "lng": -60.0217,
    "code": "MAO",
    "tzAbbr": "AMT"
  },
  {
    "id": "anadyr",
    "name": "ANADYR",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Anadyr",
    "lat": 64.7342,
    "lng": 177.5084,
    "code": "DYR",
    "tzAbbr": "ANAT"
  },
  {
    "id": "aqtobe",
    "name": "AQTOBE",
    "country": "Kazakhstan",
    "countryCode": "kz",
    "continent": "asia",
    "timezone": "Asia/Aqtobe",
    "lat": 50.2839,
    "lng": 57.167,
    "code": "AKX",
    "tzAbbr": "AQTT"
  },
  {
    "id": "buenos-aires",
    "name": "BUENOS AIRES",
    "country": "Argentina",
    "countryCode": "ar",
    "continent": "america",
    "timezone": "America/Argentina/Buenos_Aires",
    "lat": -34.6037,
    "lng": -58.3816,
    "code": "BUE",
    "tzAbbr": "ART"
  },
  {
    "id": "riyadh",
    "name": "RIYADH",
    "country": "Saudi Arabia",
    "countryCode": "sa",
    "continent": "asia",
    "timezone": "Asia/Riyadh",
    "lat": 24.7136,
    "lng": 46.6753,
    "code": "RUH",
    "tzAbbr": "AST"
  },
  {
    "id": "perth",
    "name": "PERTH",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Perth",
    "lat": -31.9505,
    "lng": 115.8605,
    "code": "PER",
    "tzAbbr": "AWST"
  },
  {
    "id": "angra",
    "name": "ANGRA DO HEROISMO",
    "country": "Portugal",
    "countryCode": "pt",
    "continent": "europe",
    "timezone": "Atlantic/Azores",
    "lat": 38.6554,
    "lng": -27.2186,
    "code": "TER",
    "tzAbbr": "AZOST"
  },
  {
    "id": "ponta-delgada",
    "name": "PONTA DELGADA",
    "country": "Portugal",
    "countryCode": "pt",
    "continent": "europe",
    "timezone": "Atlantic/Azores",
    "lat": 37.7412,
    "lng": -25.6756,
    "code": "PDL",
    "tzAbbr": "AZOT"
  },
  {
    "id": "baku",
    "name": "BAKU",
    "country": "Azerbaijan",
    "countryCode": "az",
    "continent": "asia",
    "timezone": "Asia/Baku",
    "lat": 40.4093,
    "lng": 49.8671,
    "code": "BAK",
    "tzAbbr": "AZT"
  },
  {
    "id": "bandar-seri-begawan",
    "name": "BANDAR SERI BEGAWAN",
    "country": "Brunei",
    "countryCode": "bn",
    "continent": "asia",
    "timezone": "Asia/Brunei",
    "lat": 4.9031,
    "lng": 114.9398,
    "code": "BWN",
    "tzAbbr": "BNT"
  },
  {
    "id": "diego-garcia",
    "name": "DIEGO GARCIA",
    "country": "British Indian Ocean Territory",
    "countryCode": "io",
    "continent": "asia",
    "timezone": "Indian/Chagos",
    "lat": -7.3195,
    "lng": 72.4229,
    "code": "NKW",
    "tzAbbr": "BIOT"
  },
  {
    "id": "baker-island",
    "name": "BAKER ISLAND",
    "country": "United States",
    "countryCode": "us",
    "continent": "oceania",
    "timezone": "Etc/GMT+12",
    "lat": 0.1936,
    "lng": -176.4794,
    "code": "BAR",
    "tzAbbr": "BIT"
  },
  {
    "id": "aoe",
    "name": "ANYWHERE ON EARTH",
    "nameId": "DI MANA SAJA DI BUMI",
    "wikiTitle": { "id": "Di_mana_saja_di_Bumi", "en": "Anywhere_on_Earth" },
    "country": "International",
    "countryCode": "un",
    "continent": "other",
    "timezone": "Etc/GMT+12",
    "lat": 0,
    "lng": -179.9,
    "tzAbbr": "AoE"
  },
  {
    "id": "utc",
    "name": "UTC",
    "country": "International",
    "countryCode": "un",
    "continent": "other",
    "timezone": "UTC",
    "lat": 0,
    "lng": 0,
    "tzAbbr": "UTC"
  },
  {
    "id": "la-paz",
    "name": "LA PAZ",
    "country": "Bolivia",
    "countryCode": "bo",
    "continent": "america",
    "timezone": "America/La_Paz",
    "lat": -16.4897,
    "lng": -68.1193,
    "code": "LPB",
    "tzAbbr": "BOT"
  },
  {
    "id": "sao-paulo",
    "name": "SAO PAULO",
    "country": "Brazil",
    "countryCode": "br",
    "continent": "america",
    "timezone": "America/Sao_Paulo",
    "lat": -23.5505,
    "lng": -46.6333,
    "code": "SAO",
    "tzAbbr": "BRT"
  },
  {
    "id": "dhaka",
    "name": "DHAKA",
    "country": "Bangladesh",
    "countryCode": "bd",
    "continent": "asia",
    "timezone": "Asia/Dhaka",
    "lat": 23.8103,
    "lng": 90.4125,
    "code": "DAC",
    "tzAbbr": "BST"
  },
  {
    "id": "thimphu",
    "name": "THIMPHU",
    "country": "Bhutan",
    "countryCode": "bt",
    "continent": "asia",
    "timezone": "Asia/Thimphu",
    "lat": 27.4728,
    "lng": 89.6393,
    "code": "PBH",
    "tzAbbr": "BTT"
  },
  {
    "id": "johannesburg",
    "name": "JOHANNESBURG",
    "country": "South Africa",
    "countryCode": "za",
    "continent": "africa",
    "timezone": "Africa/Johannesburg",
    "lat": -26.2041,
    "lng": 28.0473,
    "code": "JNB",
    "tzAbbr": "CAT"
  },
  {
    "id": "cocos-islands",
    "name": "COCOS ISLANDS",
    "country": "Australia",
    "countryCode": "cc",
    "continent": "oceania",
    "timezone": "Indian/Cocos",
    "lat": -12.1642,
    "lng": 96.871,
    "code": "CCK",
    "tzAbbr": "CCT"
  },
  {
    "id": "dallas",
    "name": "DALLAS",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Chicago",
    "lat": 32.7767,
    "lng": -96.797,
    "code": "DFW",
    "tzAbbr": "CDT"
  },
  {
    "id": "berlin",
    "name": "BERLIN",
    "country": "Germany",
    "countryCode": "de",
    "continent": "europe",
    "timezone": "Europe/Berlin",
    "lat": 52.52,
    "lng": 13.405,
    "code": "BER",
    "tzAbbr": "CEST"
  },
  {
    "id": "paris",
    "name": "PARIS",
    "country": "France",
    "countryCode": "fr",
    "continent": "europe",
    "timezone": "Europe/Paris",
    "lat": 48.8566,
    "lng": 2.3522,
    "code": "PAR",
    "tzAbbr": "CET"
  },
  {
    "id": "chatham-island",
    "name": "CHATHAM ISLAND",
    "country": "New Zealand",
    "countryCode": "nz",
    "continent": "oceania",
    "timezone": "Pacific/Chatham",
    "lat": -43.9536,
    "lng": -176.5597,
    "code": "CIX",
    "tzAbbr": "CHAST"
  },
  {
    "id": "choibalsan",
    "name": "CHOIBALSAN",
    "country": "Mongolia",
    "countryCode": "mn",
    "continent": "asia",
    "timezone": "Asia/Choibalsan",
    "lat": 48.0689,
    "lng": 114.5367,
    "code": "COQ",
    "tzAbbr": "CHOT"
  },
  {
    "id": "guam",
    "name": "GUAM",
    "country": "Guam",
    "countryCode": "gu",
    "continent": "oceania",
    "timezone": "Pacific/Guam",
    "lat": 13.4443,
    "lng": 144.7937,
    "code": "GUM",
    "tzAbbr": "CHST"
  },
  {
    "id": "chuuk",
    "name": "CHUUK",
    "country": "Micronesia",
    "countryCode": "fm",
    "continent": "oceania",
    "timezone": "Pacific/Chuuk",
    "lat": 7.4256,
    "lng": 151.7828,
    "code": "TKK",
    "tzAbbr": "CHUT"
  },
  {
    "id": "clipperton",
    "name": "CLIPPERTON ISLAND",
    "country": "France",
    "countryCode": "fr",
    "continent": "america",
    "timezone": "Etc/GMT+8",
    "lat": 10.3015,
    "lng": -109.2178,
    "code": "CPT",
    "tzAbbr": "CIST"
  },
  {
    "id": "rarotonga",
    "name": "RAROTONGA",
    "country": "Cook Islands",
    "countryCode": "ck",
    "continent": "oceania",
    "timezone": "Pacific/Rarotonga",
    "lat": -21.2292,
    "lng": -159.7764,
    "code": "RAR",
    "tzAbbr": "CKT"
  },
  {
    "id": "valparaiso",
    "name": "VALPARAISO",
    "country": "Chile",
    "countryCode": "cl",
    "continent": "america",
    "timezone": "America/Santiago",
    "lat": -33.0472,
    "lng": -71.6127,
    "code": "VAP",
    "tzAbbr": "CLST"
  },
  {
    "id": "santiago",
    "name": "SANTIAGO",
    "country": "Chile",
    "countryCode": "cl",
    "continent": "america",
    "timezone": "America/Santiago",
    "lat": -33.4489,
    "lng": -70.6693,
    "code": "SCL",
    "tzAbbr": "CLT"
  },
  {
    "id": "bogota",
    "name": "BOGOTA",
    "country": "Colombia",
    "countryCode": "co",
    "continent": "america",
    "timezone": "America/Bogota",
    "lat": 4.711,
    "lng": -74.0721,
    "code": "BOG",
    "tzAbbr": "COT"
  },
  {
    "id": "chicago",
    "name": "CHICAGO",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Chicago",
    "lat": 41.8781,
    "lng": -87.6298,
    "code": "CHI",
    "tzAbbr": "CST"
  },
  {
    "id": "praia",
    "name": "PRAIA",
    "country": "Cape Verde",
    "countryCode": "cv",
    "continent": "africa",
    "timezone": "Atlantic/Cape_Verde",
    "lat": 14.933,
    "lng": -23.5133,
    "code": "RAI",
    "tzAbbr": "CVT"
  },
  {
    "id": "caiguna",
    "name": "CAIGUNA",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Eucla",
    "lat": -32.281,
    "lng": 125.479,
    "code": "CGN",
    "tzAbbr": "CWST"
  },
  {
    "id": "christmas-island",
    "name": "CHRISTMAS ISLAND",
    "country": "Australia",
    "countryCode": "cx",
    "continent": "oceania",
    "timezone": "Indian/Christmas",
    "lat": -10.4475,
    "lng": 105.6904,
    "code": "XCH",
    "tzAbbr": "CXT"
  },
  {
    "id": "davis-station",
    "name": "DAVIS STATION",
    "country": "Antarctica",
    "countryCode": "aq",
    "continent": "antarctica",
    "timezone": "Antarctica/Davis",
    "lat": -68.5766,
    "lng": 77.9674,
    "code": "DAV",
    "tzAbbr": "DAVT"
  },
  {
    "id": "dumont-durville",
    "name": "DUMONT D'URVILLE",
    "country": "Antarctica",
    "countryCode": "aq",
    "continent": "antarctica",
    "timezone": "Antarctica/DumontDUrville",
    "lat": -66.6628,
    "lng": 140.0014,
    "code": "DDU",
    "tzAbbr": "DDUT"
  },
  {
    "id": "easter-island",
    "name": "EASTER ISLAND",
    "country": "Chile",
    "countryCode": "cl",
    "continent": "oceania",
    "timezone": "Pacific/Easter",
    "lat": -27.1127,
    "lng": -109.3497,
    "code": "EAS",
    "tzAbbr": "EAST"
  },
  {
    "id": "nairobi",
    "name": "NAIROBI",
    "country": "Kenya",
    "countryCode": "ke",
    "continent": "africa",
    "timezone": "Africa/Nairobi",
    "lat": -1.2921,
    "lng": 36.8219,
    "code": "NBO",
    "tzAbbr": "EAT"
  },
  {
    "id": "quito",
    "name": "QUITO",
    "country": "Ecuador",
    "countryCode": "ec",
    "continent": "america",
    "timezone": "America/Guayaquil",
    "lat": -0.1807,
    "lng": -78.4678,
    "code": "UIO",
    "tzAbbr": "ECT"
  },
  {
    "id": "boston",
    "name": "BOSTON",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/New_York",
    "lat": 42.3601,
    "lng": -71.0589,
    "code": "BOS",
    "tzAbbr": "EDT"
  },
  {
    "id": "kyiv",
    "name": "KYIV",
    "country": "Ukraine",
    "countryCode": "ua",
    "continent": "europe",
    "timezone": "Europe/Kyiv",
    "lat": 50.4501,
    "lng": 30.5234,
    "code": "IEV",
    "tzAbbr": "EEST"
  },
  {
    "id": "ittoqqortoormiit",
    "name": "ITTOQQORTOORMIIT",
    "country": "Greenland",
    "countryCode": "gl",
    "continent": "america",
    "timezone": "America/Scoresbysund",
    "lat": 70.4856,
    "lng": -21.9622,
    "code": "SCO",
    "tzAbbr": "EGT"
  },
  {
    "id": "minsk",
    "name": "MINSK",
    "country": "Belarus",
    "countryCode": "by",
    "continent": "europe",
    "timezone": "Europe/Minsk",
    "lat": 53.9045,
    "lng": 27.5615,
    "code": "MSQ",
    "tzAbbr": "FET"
  },
  {
    "id": "suva",
    "name": "SUVA",
    "country": "Fiji",
    "countryCode": "fj",
    "continent": "oceania",
    "timezone": "Pacific/Fiji",
    "lat": -18.1416,
    "lng": 178.4419,
    "code": "SUV",
    "tzAbbr": "FJT"
  },
  {
    "id": "stanley",
    "name": "STANLEY",
    "country": "Falkland Islands",
    "countryCode": "fk",
    "continent": "america",
    "timezone": "Atlantic/Stanley",
    "lat": -51.6977,
    "lng": -57.8517,
    "code": "PSY",
    "tzAbbr": "FKT"
  },
  {
    "id": "fernando-de-noronha",
    "name": "FERNANDO DE NORONHA",
    "country": "Brazil",
    "countryCode": "br",
    "continent": "america",
    "timezone": "America/Noronha",
    "lat": -3.8573,
    "lng": -32.4297,
    "code": "FEN",
    "tzAbbr": "FNT"
  },
  {
    "id": "galapagos",
    "name": "GALAPAGOS",
    "country": "Ecuador",
    "countryCode": "ec",
    "continent": "america",
    "timezone": "Pacific/Galapagos",
    "lat": -0.7432,
    "lng": -90.3138,
    "code": "GPS",
    "tzAbbr": "GALT"
  },
  {
    "id": "rikitea",
    "name": "RIKITEA",
    "country": "French Polynesia",
    "countryCode": "pf",
    "continent": "oceania",
    "timezone": "Pacific/Gambier",
    "lat": -23.1203,
    "lng": -134.9692,
    "code": "GMR",
    "tzAbbr": "GAMT"
  },
  {
    "id": "tbilisi",
    "name": "TBILISI",
    "country": "Georgia",
    "countryCode": "ge",
    "continent": "asia",
    "timezone": "Asia/Tbilisi",
    "lat": 41.7151,
    "lng": 44.8271,
    "code": "TBS",
    "tzAbbr": "GET"
  },
  {
    "id": "cayenne",
    "name": "CAYENNE",
    "country": "French Guiana",
    "countryCode": "gf",
    "continent": "america",
    "timezone": "America/Cayenne",
    "lat": 4.9372,
    "lng": -52.326,
    "code": "CAY",
    "tzAbbr": "GFT"
  },
  {
    "id": "tarawa",
    "name": "TARAWA",
    "country": "Kiribati",
    "countryCode": "ki",
    "continent": "oceania",
    "timezone": "Pacific/Tarawa",
    "lat": 1.3278,
    "lng": 172.977,
    "code": "TRW",
    "tzAbbr": "GILT"
  },
  {
    "id": "dubai",
    "name": "DUBAI",
    "country": "United Arab Emirates",
    "countryCode": "ae",
    "continent": "asia",
    "timezone": "Asia/Dubai",
    "lat": 25.2048,
    "lng": 55.2708,
    "code": "DXB",
    "tzAbbr": "GST"
  },
  {
    "id": "georgetown",
    "name": "GEORGETOWN",
    "country": "Guyana",
    "countryCode": "gy",
    "continent": "america",
    "timezone": "America/Guyana",
    "lat": 6.8013,
    "lng": -58.1551,
    "code": "GEO",
    "tzAbbr": "GYT"
  },
  {
    "id": "honolulu",
    "name": "HONOLULU",
    "country": "United States",
    "countryCode": "us",
    "continent": "oceania",
    "timezone": "Pacific/Honolulu",
    "lat": 21.3069,
    "lng": -157.8583,
    "code": "HNL",
    "tzAbbr": "HST"
  },
  {
    "id": "hong-kong",
    "name": "HONG KONG",
    "country": "Hong Kong",
    "countryCode": "hk",
    "continent": "asia",
    "timezone": "Asia/Hong_Kong",
    "lat": 22.3193,
    "lng": 114.1694,
    "code": "HKG",
    "tzAbbr": "HKT"
  },
  {
    "id": "heard-island",
    "name": "HEARD ISLAND",
    "country": "Australia",
    "countryCode": "hm",
    "continent": "antarctica",
    "timezone": "Indian/Kerguelen",
    "lat": -53.0818,
    "lng": 73.5042,
    "code": "HMD",
    "tzAbbr": "HMT"
  },
  {
    "id": "khovd",
    "name": "KHOVD",
    "country": "Mongolia",
    "countryCode": "mn",
    "continent": "asia",
    "timezone": "Asia/Hovd",
    "lat": 48.0056,
    "lng": 91.6419,
    "code": "HVD",
    "tzAbbr": "HOVT"
  },
  {
    "id": "bangkok",
    "name": "BANGKOK",
    "country": "Thailand",
    "countryCode": "th",
    "continent": "asia",
    "timezone": "Asia/Bangkok",
    "lat": 13.7563,
    "lng": 100.5018,
    "code": "BKK",
    "tzAbbr": "ICT"
  },
  {
    "id": "midway-atoll",
    "name": "MIDWAY ATOLL",
    "country": "United States",
    "countryCode": "um",
    "continent": "oceania",
    "timezone": "Pacific/Midway",
    "lat": 28.2072,
    "lng": -177.3735,
    "code": "MDY",
    "tzAbbr": "IDLW"
  },
  {
    "id": "tel-aviv",
    "name": "TEL AVIV",
    "country": "Israel",
    "countryCode": "il",
    "continent": "asia",
    "timezone": "Asia/Jerusalem",
    "lat": 32.0853,
    "lng": 34.7818,
    "code": "TLV",
    "tzAbbr": "IDT"
  },
  {
    "id": "port-mathurin",
    "name": "PORT MATHURIN",
    "country": "Mauritius",
    "countryCode": "mu",
    "continent": "africa",
    "timezone": "Indian/Mauritius",
    "lat": -19.6833,
    "lng": 63.4167,
    "code": "RRG",
    "tzAbbr": "IOT"
  },
  {
    "id": "tabriz",
    "name": "TABRIZ",
    "country": "Iran",
    "countryCode": "ir",
    "continent": "asia",
    "timezone": "Asia/Tehran",
    "lat": 38.08,
    "lng": 46.2919,
    "code": "TBZ",
    "tzAbbr": "IRDT"
  },
  {
    "id": "irkutsk",
    "name": "IRKUTSK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Irkutsk",
    "lat": 52.287,
    "lng": 104.305,
    "code": "IKT",
    "tzAbbr": "IRKT"
  },
  {
    "id": "tehran",
    "name": "TEHRAN",
    "country": "Iran",
    "countryCode": "ir",
    "continent": "asia",
    "timezone": "Asia/Tehran",
    "lat": 35.6892,
    "lng": 51.389,
    "code": "THR",
    "tzAbbr": "IRST"
  },
  {
    "id": "new-delhi",
    "name": "NEW DELHI",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 28.6139,
    "lng": 77.209,
    "code": "DEL",
    "tzAbbr": "IST"
  },
  {
    "id": "kaliningrad",
    "name": "KALININGRAD",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "europe",
    "timezone": "Europe/Kaliningrad",
    "lat": 54.7104,
    "lng": 20.4522,
    "code": "KGD",
    "tzAbbr": "KALT"
  },
  {
    "id": "bishkek",
    "name": "BISHKEK",
    "country": "Kyrgyzstan",
    "countryCode": "kg",
    "continent": "asia",
    "timezone": "Asia/Bishkek",
    "lat": 42.8746,
    "lng": 74.5698,
    "code": "FRU",
    "tzAbbr": "KGT"
  },
  {
    "id": "kosrae",
    "name": "KOSRAE",
    "country": "Micronesia",
    "countryCode": "fm",
    "continent": "oceania",
    "timezone": "Pacific/Kosrae",
    "lat": 5.3248,
    "lng": 162.9818,
    "code": "KSA",
    "tzAbbr": "KOST"
  },
  {
    "id": "krasnoyarsk",
    "name": "KRASNOYARSK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Krasnoyarsk",
    "lat": 56.0153,
    "lng": 92.8932,
    "code": "KJA",
    "tzAbbr": "KRAT"
  },
  {
    "id": "seoul",
    "name": "SEOUL",
    "country": "South Korea",
    "countryCode": "kr",
    "continent": "asia",
    "timezone": "Asia/Seoul",
    "lat": 37.5665,
    "lng": 126.978,
    "code": "SEL",
    "tzAbbr": "KST"
  },
  {
    "id": "lord-howe-island",
    "name": "LORD HOWE ISLAND",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Lord_Howe",
    "lat": -31.5544,
    "lng": 159.0821,
    "code": "LDH",
    "tzAbbr": "LHST"
  },
  {
    "id": "kiritimati",
    "name": "KIRITIMATI",
    "country": "Kiribati",
    "countryCode": "ki",
    "continent": "oceania",
    "timezone": "Pacific/Kiritimati",
    "lat": 1.8709,
    "lng": -157.363,
    "code": "CXI",
    "tzAbbr": "LINT"
  },
  {
    "id": "magadan",
    "name": "MAGADAN",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Magadan",
    "lat": 59.5667,
    "lng": 150.8,
    "code": "GDX",
    "tzAbbr": "MAGT"
  },
  {
    "id": "marquesas",
    "name": "MARQUESAS ISLANDS",
    "country": "French Polynesia",
    "countryCode": "pf",
    "continent": "oceania",
    "timezone": "Pacific/Marquesas",
    "lat": -8.9136,
    "lng": -140.1147,
    "code": "NHV",
    "tzAbbr": "MART"
  },
  {
    "id": "mawson-station",
    "name": "MAWSON STATION",
    "country": "Antarctica",
    "countryCode": "aq",
    "continent": "antarctica",
    "timezone": "Antarctica/Mawson",
    "lat": -67.6047,
    "lng": 62.8739,
    "code": "MAW",
    "tzAbbr": "MAWT"
  },
  {
    "id": "salt-lake-city",
    "name": "SALT LAKE CITY",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Denver",
    "lat": 40.7608,
    "lng": -111.891,
    "code": "SLC",
    "tzAbbr": "MDT"
  },
  {
    "id": "majuro",
    "name": "MAJURO",
    "country": "Marshall Islands",
    "countryCode": "mh",
    "continent": "oceania",
    "timezone": "Pacific/Majuro",
    "lat": 7.1164,
    "lng": 171.1858,
    "code": "MAJ",
    "tzAbbr": "MHT"
  },
  {
    "id": "macquarie-island",
    "name": "MACQUARIE ISLAND",
    "country": "Australia",
    "countryCode": "au",
    "continent": "antarctica",
    "timezone": "Antarctica/Macquarie",
    "lat": -54.4994,
    "lng": 158.9567,
    "code": "MQI",
    "tzAbbr": "MIST"
  },
  {
    "id": "yangon",
    "name": "YANGON",
    "country": "Myanmar",
    "countryCode": "mm",
    "continent": "asia",
    "timezone": "Asia/Yangon",
    "lat": 16.8661,
    "lng": 96.1951,
    "code": "RGN",
    "tzAbbr": "MMT"
  },
  {
    "id": "moscow",
    "name": "MOSCOW",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "europe",
    "timezone": "Europe/Moscow",
    "lat": 55.7558,
    "lng": 37.6173,
    "code": "MOW",
    "tzAbbr": "MSK"
  },
  {
    "id": "denver",
    "name": "DENVER",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Denver",
    "lat": 39.7392,
    "lng": -104.9903,
    "code": "DEN",
    "tzAbbr": "MST"
  },
  {
    "id": "port-louis",
    "name": "PORT LOUIS",
    "country": "Mauritius",
    "countryCode": "mu",
    "continent": "africa",
    "timezone": "Indian/Mauritius",
    "lat": -20.1609,
    "lng": 57.5012,
    "code": "MRU",
    "tzAbbr": "MUT"
  },
  {
    "id": "male",
    "name": "MALE",
    "country": "Maldives",
    "countryCode": "mv",
    "continent": "asia",
    "timezone": "Indian/Maldives",
    "lat": 4.1755,
    "lng": 73.5093,
    "code": "MLE",
    "tzAbbr": "MVT"
  },
  {
    "id": "kuala-lumpur",
    "name": "KUALA LUMPUR",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuala_Lumpur",
    "lat": 3.139,
    "lng": 101.6869,
    "code": "KUL",
    "tzAbbr": "MYT"
  },
  {
    "id": "noumea",
    "name": "NOUMEA",
    "country": "New Caledonia",
    "countryCode": "nc",
    "continent": "oceania",
    "timezone": "Pacific/Noumea",
    "lat": -22.2758,
    "lng": 166.458,
    "code": "NOU",
    "tzAbbr": "NCT"
  },
  {
    "id": "gander",
    "name": "GANDER",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/St_Johns",
    "lat": 48.9566,
    "lng": -54.6089,
    "code": "YQX",
    "tzAbbr": "NDT"
  },
  {
    "id": "norfolk-island",
    "name": "NORFOLK ISLAND",
    "country": "Australia",
    "countryCode": "nf",
    "continent": "oceania",
    "timezone": "Pacific/Norfolk",
    "lat": -29.0408,
    "lng": 167.9547,
    "code": "NLK",
    "tzAbbr": "NFT"
  },
  {
    "id": "novosibirsk",
    "name": "NOVOSIBIRSK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Novosibirsk",
    "lat": 55.0084,
    "lng": 82.9357,
    "code": "OVB",
    "tzAbbr": "NOVT"
  },
  {
    "id": "kathmandu",
    "name": "KATHMANDU",
    "country": "Nepal",
    "countryCode": "np",
    "continent": "asia",
    "timezone": "Asia/Kathmandu",
    "lat": 27.7172,
    "lng": 85.324,
    "code": "KTM",
    "tzAbbr": "NPT"
  },
  {
    "id": "st-johns",
    "name": "ST. JOHN'S",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/St_Johns",
    "lat": 47.5615,
    "lng": -52.7126,
    "code": "YYT",
    "tzAbbr": "NST"
  },
  {
    "id": "alofi",
    "name": "ALOFI",
    "country": "Niue",
    "countryCode": "nu",
    "continent": "oceania",
    "timezone": "Pacific/Niue",
    "lat": -19.0553,
    "lng": -169.9179,
    "code": "IUE",
    "tzAbbr": "NUT"
  },
  {
    "id": "auckland",
    "name": "AUCKLAND",
    "country": "New Zealand",
    "countryCode": "nz",
    "continent": "oceania",
    "timezone": "Pacific/Auckland",
    "lat": -36.8485,
    "lng": 174.7633,
    "code": "AKL",
    "tzAbbr": "NZDT"
  },
  {
    "id": "wellington",
    "name": "WELLINGTON",
    "country": "New Zealand",
    "countryCode": "nz",
    "continent": "oceania",
    "timezone": "Pacific/Auckland",
    "lat": -41.2865,
    "lng": 174.7762,
    "code": "WLG",
    "tzAbbr": "NZST"
  },
  {
    "id": "omsk",
    "name": "OMSK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Omsk",
    "lat": 54.9885,
    "lng": 73.3242,
    "code": "OMS",
    "tzAbbr": "OMST"
  },
  {
    "id": "oral",
    "name": "ORAL",
    "country": "Kazakhstan",
    "countryCode": "kz",
    "continent": "asia",
    "timezone": "Asia/Oral",
    "lat": 51.2222,
    "lng": 51.3744,
    "code": "URA",
    "tzAbbr": "ORAT"
  },
  {
    "id": "seattle",
    "name": "SEATTLE",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 47.6062,
    "lng": -122.3321,
    "code": "SEA",
    "tzAbbr": "PDT"
  },
  {
    "id": "lima",
    "name": "LIMA",
    "country": "Peru",
    "countryCode": "pe",
    "continent": "america",
    "timezone": "America/Lima",
    "lat": -12.0464,
    "lng": -77.0428,
    "code": "LIM",
    "tzAbbr": "PET"
  },
  {
    "id": "kamchatka",
    "name": "KAMCHATKA",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Kamchatka",
    "lat": 53.0167,
    "lng": 158.65,
    "code": "PKC",
    "tzAbbr": "PETT"
  },
  {
    "id": "port-moresby",
    "name": "PORT MORESBY",
    "country": "Papua New Guinea",
    "countryCode": "pg",
    "continent": "oceania",
    "timezone": "Pacific/Port_Moresby",
    "lat": -9.4438,
    "lng": 147.1803,
    "code": "POM",
    "tzAbbr": "PGT"
  },
  {
    "id": "kanton-island",
    "name": "KANTON ISLAND",
    "country": "Kiribati",
    "countryCode": "ki",
    "continent": "oceania",
    "timezone": "Pacific/Enderbury",
    "lat": -2.8106,
    "lng": -171.6742,
    "code": "CIS",
    "tzAbbr": "PHOT"
  },
  {
    "id": "manila",
    "name": "MANILA",
    "country": "Philippines",
    "countryCode": "ph",
    "continent": "asia",
    "timezone": "Asia/Manila",
    "lat": 14.5995,
    "lng": 120.9842,
    "code": "MNL",
    "tzAbbr": "PHT"
  },
  {
    "id": "islamabad",
    "name": "ISLAMABAD",
    "country": "Pakistan",
    "countryCode": "pk",
    "continent": "asia",
    "timezone": "Asia/Karachi",
    "lat": 33.6844,
    "lng": 73.0479,
    "code": "ISB",
    "tzAbbr": "PKT"
  },
  {
    "id": "miquelon",
    "name": "MIQUELON",
    "country": "Saint Pierre and Miquelon",
    "countryCode": "pm",
    "continent": "america",
    "timezone": "America/Miquelon",
    "lat": 47.1,
    "lng": -56.3833,
    "code": "MQC",
    "tzAbbr": "PMDT"
  },
  {
    "id": "saint-pierre",
    "name": "SAINT PIERRE",
    "country": "Saint Pierre and Miquelon",
    "countryCode": "pm",
    "continent": "america",
    "timezone": "America/Miquelon",
    "lat": 46.7778,
    "lng": -56.1778,
    "code": "FSP",
    "tzAbbr": "PMST"
  },
  {
    "id": "pohnpei",
    "name": "POHNPEI",
    "country": "Micronesia",
    "countryCode": "fm",
    "continent": "oceania",
    "timezone": "Pacific/Pohnpei",
    "lat": 6.9147,
    "lng": 158.1611,
    "code": "PNI",
    "tzAbbr": "PONT"
  },
  {
    "id": "los-angeles",
    "name": "LOS ANGELES",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 34.0522,
    "lng": -118.2437,
    "code": "LAX",
    "tzAbbr": "PST"
  },
  {
    "id": "koror",
    "name": "KOROR",
    "country": "Palau",
    "countryCode": "pw",
    "continent": "oceania",
    "timezone": "Pacific/Palau",
    "lat": 7.3426,
    "lng": 134.4789,
    "code": "ROR",
    "tzAbbr": "PWT"
  },
  {
    "id": "ciudad-del-este",
    "name": "CIUDAD DEL ESTE",
    "country": "Paraguay",
    "countryCode": "py",
    "continent": "america",
    "timezone": "America/Asuncion",
    "lat": -25.5097,
    "lng": -54.6111,
    "code": "AGT",
    "tzAbbr": "PYST"
  },
  {
    "id": "asuncion",
    "name": "ASUNCION",
    "country": "Paraguay",
    "countryCode": "py",
    "continent": "america",
    "timezone": "America/Asuncion",
    "lat": -25.2637,
    "lng": -57.5759,
    "code": "ASU",
    "tzAbbr": "PYT"
  },
  {
    "id": "saint-denis",
    "name": "SAINT DENIS",
    "country": "Reunion",
    "countryCode": "re",
    "continent": "africa",
    "timezone": "Indian/Reunion",
    "lat": -20.8821,
    "lng": 55.4504,
    "code": "RUN",
    "tzAbbr": "RET"
  },
  {
    "id": "rothera-station",
    "name": "ROTHERA STATION",
    "country": "Antarctica",
    "countryCode": "aq",
    "continent": "antarctica",
    "timezone": "Antarctica/Rothera",
    "lat": -67.5705,
    "lng": -68.1278,
    "code": "ROT",
    "tzAbbr": "ROTT"
  },
  {
    "id": "yuzhno-sakhalinsk",
    "name": "YUZHNO SAKHALINSK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Sakhalin",
    "lat": 46.9592,
    "lng": 142.7381,
    "code": "UUS",
    "tzAbbr": "SAKT"
  },
  {
    "id": "samara",
    "name": "SAMARA",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "europe",
    "timezone": "Europe/Samara",
    "lat": 53.1959,
    "lng": 50.1003,
    "code": "KUF",
    "tzAbbr": "SAMT"
  },
  {
    "id": "cape-town",
    "name": "CAPE TOWN",
    "country": "South Africa",
    "countryCode": "za",
    "continent": "africa",
    "timezone": "Africa/Johannesburg",
    "lat": -33.9249,
    "lng": 18.4241,
    "code": "CPT",
    "tzAbbr": "SAST"
  },
  {
    "id": "honiara",
    "name": "HONIARA",
    "country": "Solomon Islands",
    "countryCode": "sb",
    "continent": "oceania",
    "timezone": "Pacific/Guadalcanal",
    "lat": -9.4456,
    "lng": 159.9729,
    "code": "HIR",
    "tzAbbr": "SBT"
  },
  {
    "id": "victoria",
    "name": "VICTORIA",
    "country": "Seychelles",
    "countryCode": "sc",
    "continent": "africa",
    "timezone": "Indian/Mahe",
    "lat": -4.6191,
    "lng": 55.4513,
    "code": "SEZ",
    "tzAbbr": "SCT"
  },
  {
    "id": "singapore",
    "name": "SINGAPORE",
    "country": "Singapore",
    "countryCode": "sg",
    "continent": "asia",
    "timezone": "Asia/Singapore",
    "lat": 1.3521,
    "lng": 103.8198,
    "code": "SIN",
    "tzAbbr": "SGT"
  },
  {
    "id": "colombo",
    "name": "COLOMBO",
    "country": "Sri Lanka",
    "countryCode": "lk",
    "continent": "asia",
    "timezone": "Asia/Colombo",
    "lat": 6.9271,
    "lng": 79.8612,
    "code": "CMB",
    "tzAbbr": "SLST"
  },
  {
    "id": "srednekolymsk",
    "name": "SREDNEKOLYMSK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Srednekolymsk",
    "lat": 67.4578,
    "lng": 153.7072,
    "code": "SEK",
    "tzAbbr": "SRET"
  },
  {
    "id": "paramaribo",
    "name": "PARAMARIBO",
    "country": "Suriname",
    "countryCode": "sr",
    "continent": "america",
    "timezone": "America/Paramaribo",
    "lat": 5.852,
    "lng": -55.2038,
    "code": "PBM",
    "tzAbbr": "SRT"
  },
  {
    "id": "pago-pago",
    "name": "PAGO PAGO",
    "country": "American Samoa",
    "countryCode": "as",
    "continent": "oceania",
    "timezone": "Pacific/Pago_Pago",
    "lat": -14.2756,
    "lng": -170.702,
    "code": "PPG",
    "tzAbbr": "SST"
  },
  {
    "id": "syowa-station",
    "name": "SYOWA STATION",
    "country": "Antarctica",
    "countryCode": "aq",
    "continent": "antarctica",
    "timezone": "Antarctica/Syowa",
    "lat": -69.0069,
    "lng": 39.5819,
    "code": "SYO",
    "tzAbbr": "SYOT"
  },
  {
    "id": "papeete",
    "name": "PAPEETE",
    "country": "French Polynesia",
    "countryCode": "pf",
    "continent": "oceania",
    "timezone": "Pacific/Tahiti",
    "lat": -17.5516,
    "lng": -149.5584,
    "code": "PPT",
    "tzAbbr": "TAHT"
  },
  {
    "id": "kerguelen",
    "name": "KERGUELEN",
    "country": "French Southern Territories",
    "countryCode": "tf",
    "continent": "antarctica",
    "timezone": "Indian/Kerguelen",
    "lat": -49.35,
    "lng": 70.2167,
    "code": "KER",
    "tzAbbr": "TFT"
  },
  {
    "id": "dushanbe",
    "name": "DUSHANBE",
    "country": "Tajikistan",
    "countryCode": "tj",
    "continent": "asia",
    "timezone": "Asia/Dushanbe",
    "lat": 38.5598,
    "lng": 68.787,
    "code": "DYU",
    "tzAbbr": "TJT"
  },
  {
    "id": "fakaofo",
    "name": "FAKAOFO",
    "country": "Tokelau",
    "countryCode": "tk",
    "continent": "oceania",
    "timezone": "Pacific/Fakaofo",
    "lat": -9.3803,
    "lng": -171.2189,
    "code": "TKL",
    "tzAbbr": "TKT"
  },
  {
    "id": "dili",
    "name": "DILI",
    "country": "Timor-Leste",
    "countryCode": "tl",
    "continent": "asia",
    "timezone": "Asia/Dili",
    "lat": -8.5569,
    "lng": 125.5603,
    "code": "DIL",
    "tzAbbr": "TLT"
  },
  {
    "id": "ashgabat",
    "name": "ASHGABAT",
    "country": "Turkmenistan",
    "countryCode": "tm",
    "continent": "asia",
    "timezone": "Asia/Ashgabat",
    "lat": 37.9601,
    "lng": 58.3261,
    "code": "ASB",
    "tzAbbr": "TMT"
  },
  {
    "id": "istanbul",
    "name": "ISTANBUL",
    "country": "Turkey",
    "countryCode": "tr",
    "continent": "europe",
    "timezone": "Europe/Istanbul",
    "lat": 41.0082,
    "lng": 28.9784,
    "code": "IST",
    "tzAbbr": "TRT"
  },
  {
    "id": "nukualofa",
    "name": "NUKU ALOFA",
    "country": "Tonga",
    "countryCode": "to",
    "continent": "oceania",
    "timezone": "Pacific/Tongatapu",
    "lat": -21.1394,
    "lng": -175.2049,
    "code": "TBU",
    "tzAbbr": "TOT"
  },
  {
    "id": "taipei",
    "name": "TAIPEI",
    "country": "Taiwan",
    "countryCode": "tw",
    "continent": "asia",
    "timezone": "Asia/Taipei",
    "lat": 25.033,
    "lng": 121.5654,
    "code": "TPE",
    "tzAbbr": "TST"
  },
  {
    "id": "funafuti",
    "name": "FUNAFUTI",
    "country": "Tuvalu",
    "countryCode": "tv",
    "continent": "oceania",
    "timezone": "Pacific/Funafuti",
    "lat": -8.5211,
    "lng": 179.1962,
    "code": "FUN",
    "tzAbbr": "TVT"
  },
  {
    "id": "ulaanbaatar",
    "name": "ULAANBAATAR",
    "country": "Mongolia",
    "countryCode": "mn",
    "continent": "asia",
    "timezone": "Asia/Ulaanbaatar",
    "lat": 47.8864,
    "lng": 106.9057,
    "code": "ULN",
    "tzAbbr": "ULAT"
  },
  {
    "id": "reykjavik",
    "name": "REYKJAVIK",
    "country": "Iceland",
    "countryCode": "is",
    "continent": "europe",
    "timezone": "Atlantic/Reykjavik",
    "lat": 64.1466,
    "lng": -21.9426,
    "code": "REK",
    "tzAbbr": "UTC"
  },
  {
    "id": "punta-del-este",
    "name": "PUNTA DEL ESTE",
    "country": "Uruguay",
    "countryCode": "uy",
    "continent": "america",
    "timezone": "America/Montevideo",
    "lat": -34.9667,
    "lng": -54.95,
    "code": "PDP",
    "tzAbbr": "UYST"
  },
  {
    "id": "montevideo",
    "name": "MONTEVIDEO",
    "country": "Uruguay",
    "countryCode": "uy",
    "continent": "america",
    "timezone": "America/Montevideo",
    "lat": -34.9011,
    "lng": -56.1645,
    "code": "MVD",
    "tzAbbr": "UYT"
  },
  {
    "id": "tashkent",
    "name": "TASHKENT",
    "country": "Uzbekistan",
    "countryCode": "uz",
    "continent": "asia",
    "timezone": "Asia/Tashkent",
    "lat": 41.2995,
    "lng": 69.2401,
    "code": "TAS",
    "tzAbbr": "UZT"
  },
  {
    "id": "caracas",
    "name": "CARACAS",
    "country": "Venezuela",
    "countryCode": "ve",
    "continent": "america",
    "timezone": "America/Caracas",
    "lat": 10.4806,
    "lng": -66.9036,
    "code": "CCS",
    "tzAbbr": "VET"
  },
  {
    "id": "vladivostok",
    "name": "VLADIVOSTOK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Vladivostok",
    "lat": 43.1198,
    "lng": 131.8869,
    "code": "VVO",
    "tzAbbr": "VLAT"
  },
  {
    "id": "volgograd",
    "name": "VOLGOGRAD",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "europe",
    "timezone": "Europe/Volgograd",
    "lat": 48.708,
    "lng": 44.5133,
    "code": "VOG",
    "tzAbbr": "VOLT"
  },
  {
    "id": "vostok-station",
    "name": "VOSTOK STATION",
    "country": "Antarctica",
    "countryCode": "aq",
    "continent": "antarctica",
    "timezone": "Antarctica/Vostok",
    "lat": -78.4645,
    "lng": 106.834,
    "code": "VOS",
    "tzAbbr": "VOST"
  },
  {
    "id": "port-vila",
    "name": "PORT VILA",
    "country": "Vanuatu",
    "countryCode": "vu",
    "continent": "oceania",
    "timezone": "Pacific/Efate",
    "lat": -17.7333,
    "lng": 168.3273,
    "code": "VLI",
    "tzAbbr": "VUT"
  },
  {
    "id": "wake-island",
    "name": "WAKE ISLAND",
    "country": "United States",
    "countryCode": "um",
    "continent": "oceania",
    "timezone": "Pacific/Wake",
    "lat": 19.2796,
    "lng": 166.6499,
    "code": "AWK",
    "tzAbbr": "WAKT"
  },
  {
    "id": "windhoek",
    "name": "WINDHOEK",
    "country": "Namibia",
    "countryCode": "na",
    "continent": "africa",
    "timezone": "Africa/Windhoek",
    "lat": -22.5609,
    "lng": 17.0658,
    "code": "WDH",
    "tzAbbr": "WAST"
  },
  {
    "id": "lagos",
    "name": "LAGOS",
    "country": "Nigeria",
    "countryCode": "ng",
    "continent": "africa",
    "timezone": "Africa/Lagos",
    "lat": 6.5244,
    "lng": 3.3792,
    "code": "LOS",
    "tzAbbr": "WAT"
  },
  {
    "id": "porto",
    "name": "PORTO",
    "country": "Portugal",
    "countryCode": "pt",
    "continent": "europe",
    "timezone": "Europe/Lisbon",
    "lat": 41.1579,
    "lng": -8.6291,
    "code": "OPO",
    "tzAbbr": "WEST"
  },
  {
    "id": "lisbon",
    "name": "LISBON",
    "country": "Portugal",
    "countryCode": "pt",
    "continent": "europe",
    "timezone": "Europe/Lisbon",
    "lat": 38.7223,
    "lng": -9.1393,
    "code": "LIS",
    "tzAbbr": "WET"
  },
  {
    "id": "jayapura",
    "name": "JAYAPURA",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jayapura",
    "lat": -2.5916,
    "lng": 140.669,
    "code": "DJJ",
    "tzAbbr": "WIT"
  },
  {
    "id": "makassar",
    "name": "MAKASSAR",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Makassar",
    "lat": -5.1477,
    "lng": 119.4327,
    "code": "UPG",
    "tzAbbr": "WITA"
  },
  {
    "id": "ilulissat",
    "name": "ILULISSAT",
    "country": "Greenland",
    "countryCode": "gl",
    "continent": "america",
    "timezone": "America/Nuuk",
    "lat": 69.2167,
    "lng": -51.1,
    "code": "JAV",
    "tzAbbr": "WGST"
  },
  {
    "id": "nuuk",
    "name": "NUUK",
    "country": "Greenland",
    "countryCode": "gl",
    "continent": "america",
    "timezone": "America/Nuuk",
    "lat": 64.1814,
    "lng": -51.6941,
    "code": "GOH",
    "tzAbbr": "WGT"
  },
  {
    "id": "apia",
    "name": "APIA",
    "country": "Samoa",
    "countryCode": "ws",
    "continent": "oceania",
    "timezone": "Pacific/Apia",
    "lat": -13.8333,
    "lng": -171.7667,
    "code": "APW",
    "tzAbbr": "WST"
  },
  {
    "id": "yakutsk",
    "name": "YAKUTSK",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Yakutsk",
    "lat": 62.0355,
    "lng": 129.6755,
    "code": "YKS",
    "tzAbbr": "YAKT"
  },
  {
    "id": "yekaterinburg",
    "name": "YEKATERINBURG",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "asia",
    "timezone": "Asia/Yekaterinburg",
    "lat": 56.8389,
    "lng": 60.6057,
    "code": "SVX",
    "tzAbbr": "YEKT"
  },
  {
    "id": "mexico-city",
    "name": "MEXICO CITY",
    "country": "Mexico",
    "countryCode": "mx",
    "continent": "america",
    "timezone": "America/Mexico_City",
    "lat": 19.4326,
    "lng": -99.1332,
    "code": "MEX",
    "tzAbbr": "CST"
  },
  {
    "id": "toronto",
    "name": "TORONTO",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/Toronto",
    "lat": 43.6532,
    "lng": -79.3832,
    "code": "YTO"
  },
  {
    "id": "vancouver",
    "name": "VANCOUVER",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/Vancouver",
    "lat": 49.2827,
    "lng": -123.1207,
    "code": "YVR"
  },
  {
    "id": "phoenix",
    "name": "PHOENIX",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Phoenix",
    "lat": 33.4484,
    "lng": -112.074,
    "code": "PHX",
    "tzAbbr": "MST"
  },
  {
    "id": "houston",
    "name": "HOUSTON",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Chicago",
    "lat": 29.7604,
    "lng": -95.3698,
    "code": "HOU"
  },
  {
    "id": "miami",
    "name": "MIAMI",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/New_York",
    "lat": 25.7617,
    "lng": -80.1918,
    "code": "MIA"
  },
  {
    "id": "washington-dc",
    "name": "WASHINGTON DC",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/New_York",
    "lat": 38.9072,
    "lng": -77.0369,
    "code": "WAS"
  },
  {
    "id": "san-francisco",
    "name": "SAN FRANCISCO",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 37.7749,
    "lng": -122.4194,
    "code": "SFO"
  },
  {
    "id": "havana",
    "name": "HAVANA",
    "country": "Cuba",
    "countryCode": "cu",
    "continent": "america",
    "timezone": "America/Havana",
    "lat": 23.1136,
    "lng": -82.3666,
    "code": "HAV"
  },
  {
    "id": "panama-city",
    "name": "PANAMA CITY",
    "country": "Panama",
    "countryCode": "pa",
    "continent": "america",
    "timezone": "America/Panama",
    "lat": 8.9824,
    "lng": -79.5199,
    "code": "PTY",
    "tzAbbr": "EST"
  },
  {
    "id": "casablanca",
    "name": "CASABLANCA",
    "country": "Morocco",
    "countryCode": "ma",
    "continent": "africa",
    "timezone": "Africa/Casablanca",
    "lat": 33.5731,
    "lng": -7.5898,
    "code": "CAS"
  },
  {
    "id": "algiers",
    "name": "ALGIERS",
    "country": "Algeria",
    "countryCode": "dz",
    "continent": "africa",
    "timezone": "Africa/Algiers",
    "lat": 36.7538,
    "lng": 3.0588,
    "code": "ALG",
    "tzAbbr": "CET"
  },
  {
    "id": "tunis",
    "name": "TUNIS",
    "country": "Tunisia",
    "countryCode": "tn",
    "continent": "africa",
    "timezone": "Africa/Tunis",
    "lat": 36.8065,
    "lng": 10.1815,
    "code": "TUN",
    "tzAbbr": "CET"
  },
  {
    "id": "tripoli",
    "name": "TRIPOLI",
    "country": "Libya",
    "countryCode": "ly",
    "continent": "africa",
    "timezone": "Africa/Tripoli",
    "lat": 32.8872,
    "lng": 13.1913,
    "code": "TIP",
    "tzAbbr": "EET"
  },
  {
    "id": "addis-ababa",
    "name": "ADDIS ABABA",
    "country": "Ethiopia",
    "countryCode": "et",
    "continent": "africa",
    "timezone": "Africa/Addis_Ababa",
    "lat": 9.0301,
    "lng": 38.7578,
    "code": "ADD",
    "tzAbbr": "EAT"
  },
  {
    "id": "dar-es-salaam",
    "name": "DAR ES SALAAM",
    "country": "Tanzania",
    "countryCode": "tz",
    "continent": "africa",
    "timezone": "Africa/Dar_es_Salaam",
    "lat": -6.7924,
    "lng": 39.2083,
    "code": "DAR",
    "tzAbbr": "EAT"
  },
  {
    "id": "accra",
    "name": "ACCRA",
    "country": "Ghana",
    "countryCode": "gh",
    "continent": "africa",
    "timezone": "Africa/Accra",
    "lat": 5.6037,
    "lng": -0.187,
    "code": "ACC",
    "tzAbbr": "GMT"
  },
  {
    "id": "dakar",
    "name": "DAKAR",
    "country": "Senegal",
    "countryCode": "sn",
    "continent": "africa",
    "timezone": "Africa/Dakar",
    "lat": 14.7167,
    "lng": -17.4677,
    "code": "DKR",
    "tzAbbr": "GMT"
  },
  {
    "id": "abidjan",
    "name": "ABIDJAN",
    "country": "Ivory Coast",
    "countryCode": "ci",
    "continent": "africa",
    "timezone": "Africa/Abidjan",
    "lat": 5.3599,
    "lng": -4.0083,
    "code": "ABJ",
    "tzAbbr": "GMT"
  },
  {
    "id": "kinshasa",
    "name": "KINSHASA",
    "country": "DR Congo",
    "countryCode": "cd",
    "continent": "africa",
    "timezone": "Africa/Kinshasa",
    "lat": -4.4419,
    "lng": 15.2663,
    "code": "FIH",
    "tzAbbr": "WAT"
  },
  {
    "id": "luanda",
    "name": "LUANDA",
    "country": "Angola",
    "countryCode": "ao",
    "continent": "africa",
    "timezone": "Africa/Luanda",
    "lat": -8.8383,
    "lng": 13.2344,
    "code": "LAD",
    "tzAbbr": "WAT"
  },
  {
    "id": "madrid",
    "name": "MADRID",
    "country": "Spain",
    "countryCode": "es",
    "continent": "europe",
    "timezone": "Europe/Madrid",
    "lat": 40.4168,
    "lng": -3.7038,
    "code": "MAD"
  },
  {
    "id": "rome",
    "name": "ROME",
    "country": "Italy",
    "countryCode": "it",
    "continent": "europe",
    "timezone": "Europe/Rome",
    "lat": 41.9028,
    "lng": 12.4964,
    "code": "ROM"
  },
  {
    "id": "amsterdam",
    "name": "AMSTERDAM",
    "country": "Netherlands",
    "countryCode": "nl",
    "continent": "europe",
    "timezone": "Europe/Amsterdam",
    "lat": 52.3676,
    "lng": 4.9041,
    "code": "AMS"
  },
  {
    "id": "brussels",
    "name": "BRUSSELS",
    "country": "Belgium",
    "countryCode": "be",
    "continent": "europe",
    "timezone": "Europe/Brussels",
    "lat": 50.8503,
    "lng": 4.3517,
    "code": "BRU"
  },
  {
    "id": "vienna",
    "name": "VIENNA",
    "country": "Austria",
    "countryCode": "at",
    "continent": "europe",
    "timezone": "Europe/Vienna",
    "lat": 48.2082,
    "lng": 16.3738,
    "code": "VIE"
  },
  {
    "id": "zurich",
    "name": "ZURICH",
    "country": "Switzerland",
    "countryCode": "ch",
    "continent": "europe",
    "timezone": "Europe/Zurich",
    "lat": 47.3769,
    "lng": 8.5417,
    "code": "ZRH"
  },
  {
    "id": "stockholm",
    "name": "STOCKHOLM",
    "country": "Sweden",
    "countryCode": "se",
    "continent": "europe",
    "timezone": "Europe/Stockholm",
    "lat": 59.3293,
    "lng": 18.0686,
    "code": "STO"
  },
  {
    "id": "oslo",
    "name": "OSLO",
    "country": "Norway",
    "countryCode": "no",
    "continent": "europe",
    "timezone": "Europe/Oslo",
    "lat": 59.9139,
    "lng": 10.7522,
    "code": "OSL"
  },
  {
    "id": "copenhagen",
    "name": "COPENHAGEN",
    "country": "Denmark",
    "countryCode": "dk",
    "continent": "europe",
    "timezone": "Europe/Copenhagen",
    "lat": 55.6761,
    "lng": 12.5683,
    "code": "CPH"
  },
  {
    "id": "helsinki",
    "name": "HELSINKI",
    "country": "Finland",
    "countryCode": "fi",
    "continent": "europe",
    "timezone": "Europe/Helsinki",
    "lat": 60.1699,
    "lng": 24.9384,
    "code": "HEL"
  },
  {
    "id": "warsaw",
    "name": "WARSAW",
    "country": "Poland",
    "countryCode": "pl",
    "continent": "europe",
    "timezone": "Europe/Warsaw",
    "lat": 52.2297,
    "lng": 21.0122,
    "code": "WAW"
  },
  {
    "id": "prague",
    "name": "PRAGUE",
    "country": "Czech Republic",
    "countryCode": "cz",
    "continent": "europe",
    "timezone": "Europe/Prague",
    "lat": 50.0755,
    "lng": 14.4378,
    "code": "PRG"
  },
  {
    "id": "budapest",
    "name": "BUDAPEST",
    "country": "Hungary",
    "countryCode": "hu",
    "continent": "europe",
    "timezone": "Europe/Budapest",
    "lat": 47.4979,
    "lng": 19.0402,
    "code": "BUD"
  },
  {
    "id": "athens",
    "name": "ATHENS",
    "country": "Greece",
    "countryCode": "gr",
    "continent": "europe",
    "timezone": "Europe/Athens",
    "lat": 37.9838,
    "lng": 23.7275,
    "code": "ATH"
  },
  {
    "id": "bucharest",
    "name": "BUCHAREST",
    "country": "Romania",
    "countryCode": "ro",
    "continent": "europe",
    "timezone": "Europe/Bucharest",
    "lat": 44.4268,
    "lng": 26.1025,
    "code": "BUH"
  },
  {
    "id": "belgrade",
    "name": "BELGRADE",
    "country": "Serbia",
    "countryCode": "rs",
    "continent": "europe",
    "timezone": "Europe/Belgrade",
    "lat": 44.7866,
    "lng": 20.4489,
    "code": "BEG"
  },
  {
    "id": "dublin",
    "name": "DUBLIN",
    "country": "Ireland",
    "countryCode": "ie",
    "continent": "europe",
    "timezone": "Europe/Dublin",
    "lat": 53.3498,
    "lng": -6.2603,
    "code": "DUB"
  },
  {
    "id": "beijing",
    "name": "BEIJING",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 39.9042,
    "lng": 116.4074,
    "code": "BJS",
    "tzAbbr": "CST"
  },
  {
    "id": "shanghai",
    "name": "SHANGHAI",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 31.2304,
    "lng": 121.4737,
    "code": "SHA",
    "tzAbbr": "CST"
  },
  {
    "id": "mumbai",
    "name": "MUMBAI",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 19.076,
    "lng": 72.8777,
    "code": "BOM",
    "tzAbbr": "IST"
  },
  {
    "id": "karachi",
    "name": "KARACHI",
    "country": "Pakistan",
    "countryCode": "pk",
    "continent": "asia",
    "timezone": "Asia/Karachi",
    "lat": 24.8607,
    "lng": 67.0011,
    "code": "KHI",
    "tzAbbr": "PKT"
  },
  {
    "id": "baghdad",
    "name": "BAGHDAD",
    "country": "Iraq",
    "countryCode": "iq",
    "continent": "asia",
    "timezone": "Asia/Baghdad",
    "lat": 33.3152,
    "lng": 44.3661,
    "code": "BGW",
    "tzAbbr": "AST"
  },
  {
    "id": "kuwait-city",
    "name": "KUWAIT CITY",
    "country": "Kuwait",
    "countryCode": "kw",
    "continent": "asia",
    "timezone": "Asia/Kuwait",
    "lat": 29.3759,
    "lng": 47.9774,
    "code": "KWI",
    "tzAbbr": "AST"
  },
  {
    "id": "doha",
    "name": "DOHA",
    "country": "Qatar",
    "countryCode": "qa",
    "continent": "asia",
    "timezone": "Asia/Qatar",
    "lat": 25.2854,
    "lng": 51.531,
    "code": "DOH",
    "tzAbbr": "AST"
  },
  {
    "id": "muscat",
    "name": "MUSCAT",
    "country": "Oman",
    "countryCode": "om",
    "continent": "asia",
    "timezone": "Asia/Muscat",
    "lat": 23.588,
    "lng": 58.3829,
    "code": "MCT",
    "tzAbbr": "GST"
  },
  {
    "id": "ho-chi-minh-city",
    "name": "HO CHI MINH CITY",
    "country": "Vietnam",
    "countryCode": "vn",
    "continent": "asia",
    "timezone": "Asia/Ho_Chi_Minh",
    "lat": 10.8231,
    "lng": 106.6297,
    "code": "SGN",
    "tzAbbr": "ICT"
  },
  {
    "id": "melbourne",
    "name": "MELBOURNE",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Melbourne",
    "lat": -37.8136,
    "lng": 144.9631,
    "code": "MEL"
  },
  {
    "id": "montreal",
    "name": "MONTREAL",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/Toronto",
    "lat": 45.5017,
    "lng": -73.5673,
    "code": "YMQ"
  },
  {
    "id": "atlanta",
    "name": "ATLANTA",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/New_York",
    "lat": 33.749,
    "lng": -84.388,
    "code": "ATL"
  },
  {
    "id": "philadelphia",
    "name": "PHILADELPHIA",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/New_York",
    "lat": 39.9526,
    "lng": -75.1652,
    "code": "PHL"
  },
  {
    "id": "orlando",
    "name": "ORLANDO",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/New_York",
    "lat": 28.5383,
    "lng": -81.3792,
    "code": "ORL"
  },
  {
    "id": "new-orleans",
    "name": "NEW ORLEANS",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Chicago",
    "lat": 29.9511,
    "lng": -90.0715,
    "code": "MSY"
  },
  {
    "id": "las-vegas",
    "name": "LAS VEGAS",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 36.1699,
    "lng": -115.1398,
    "code": "LAS"
  },
  {
    "id": "san-diego",
    "name": "SAN DIEGO",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 32.7157,
    "lng": -117.1611,
    "code": "SAN"
  },
  {
    "id": "rio-de-janeiro",
    "name": "RIO DE JANEIRO",
    "country": "Brazil",
    "countryCode": "br",
    "continent": "america",
    "timezone": "America/Sao_Paulo",
    "lat": -22.9068,
    "lng": -43.1729,
    "code": "RIO",
    "tzAbbr": "BRT"
  },
  {
    "id": "barcelona",
    "name": "BARCELONA",
    "country": "Spain",
    "countryCode": "es",
    "continent": "europe",
    "timezone": "Europe/Madrid",
    "lat": 41.3851,
    "lng": 2.1734,
    "code": "BCN"
  },
  {
    "id": "milan",
    "name": "MILAN",
    "country": "Italy",
    "countryCode": "it",
    "continent": "europe",
    "timezone": "Europe/Rome",
    "lat": 45.4642,
    "lng": 9.19,
    "code": "MIL"
  },
  {
    "id": "munich",
    "name": "MUNICH",
    "country": "Germany",
    "countryCode": "de",
    "continent": "europe",
    "timezone": "Europe/Berlin",
    "lat": 48.1351,
    "lng": 11.582,
    "code": "MUC"
  },
  {
    "id": "frankfurt",
    "name": "FRANKFURT",
    "country": "Germany",
    "countryCode": "de",
    "continent": "europe",
    "timezone": "Europe/Berlin",
    "lat": 50.1109,
    "lng": 8.6821,
    "code": "FRA"
  },
  {
    "id": "manchester",
    "name": "MANCHESTER",
    "country": "United Kingdom",
    "countryCode": "gb",
    "continent": "europe",
    "timezone": "Europe/London",
    "lat": 53.4808,
    "lng": -2.2426,
    "code": "MAN"
  },
  {
    "id": "saint-petersburg",
    "name": "SAINT PETERSBURG",
    "country": "Russia",
    "countryCode": "ru",
    "continent": "europe",
    "timezone": "Europe/Moscow",
    "lat": 59.9311,
    "lng": 30.3609,
    "code": "LED"
  },
  {
    "id": "osaka",
    "name": "OSAKA",
    "country": "Japan",
    "countryCode": "jp",
    "continent": "asia",
    "timezone": "Asia/Tokyo",
    "lat": 34.6937,
    "lng": 135.5023,
    "code": "OSA",
    "tzAbbr": "JST"
  },
  {
    "id": "guangzhou",
    "name": "GUANGZHOU",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 23.1291,
    "lng": 113.2644,
    "code": "CAN",
    "tzAbbr": "CST"
  },
  {
    "id": "shenzhen",
    "name": "SHENZHEN",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 22.5431,
    "lng": 114.0579,
    "code": "SZX",
    "tzAbbr": "CST"
  },
  {
    "id": "kolkata",
    "name": "KOLKATA",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 22.5726,
    "lng": 88.3639,
    "code": "CCU",
    "tzAbbr": "IST"
  },
  {
    "id": "bengaluru",
    "name": "BENGALURU",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 12.9716,
    "lng": 77.5946,
    "code": "BLR",
    "tzAbbr": "IST"
  },
  {
    "id": "surabaya",
    "name": "SURABAYA",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jakarta",
    "lat": -7.2575,
    "lng": 112.7521,
    "code": "SUB",
    "tzAbbr": "WIB"
  },
  {
    "id": "medan",
    "name": "MEDAN",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jakarta",
    "lat": 3.5952,
    "lng": 98.6722,
    "code": "MES",
    "tzAbbr": "WIB"
  },
  {
    "id": "denpasar",
    "name": "DENPASAR",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Makassar",
    "lat": -8.65,
    "lng": 115.2167,
    "code": "DPS",
    "tzAbbr": "WITA"
  },
  {
    "id": "penang",
    "name": "PENANG",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuala_Lumpur",
    "lat": 5.4141,
    "lng": 100.3288,
    "code": "PEN",
    "tzAbbr": "MYT"
  },
  {
    "id": "kuching",
    "name": "KUCHING",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuching",
    "lat": 1.5535,
    "lng": 110.3593,
    "code": "KCH",
    "tzAbbr": "MYT"
  },
  {
    "id": "kota-kinabalu",
    "name": "KOTA KINABALU",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuching",
    "lat": 5.9804,
    "lng": 116.0735,
    "code": "BKI",
    "tzAbbr": "MYT"
  },
  {
    "id": "jeddah",
    "name": "JEDDAH",
    "country": "Saudi Arabia",
    "countryCode": "sa",
    "continent": "asia",
    "timezone": "Asia/Riyadh",
    "lat": 21.4858,
    "lng": 39.1925,
    "code": "JED",
    "tzAbbr": "AST"
  },
  {
    "id": "abu-dhabi",
    "name": "ABU DHABI",
    "country": "United Arab Emirates",
    "countryCode": "ae",
    "continent": "asia",
    "timezone": "Asia/Dubai",
    "lat": 24.4539,
    "lng": 54.3773,
    "code": "AUH",
    "tzAbbr": "GST"
  },
  {
    "id": "jerusalem",
    "name": "JERUSALEM",
    "country": "Israel",
    "countryCode": "il",
    "continent": "asia",
    "timezone": "Asia/Jerusalem",
    "lat": 31.7683,
    "lng": 35.2137,
    "code": "JRS"
  },
  {
    "id": "bandung",
    "name": "BANDUNG",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jakarta",
    "lat": -6.9175,
    "lng": 107.6191,
    "code": "BDO",
    "tzAbbr": "WIB"
  },
  {
    "id": "semarang",
    "name": "SEMARANG",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jakarta",
    "lat": -6.9667,
    "lng": 110.4167,
    "code": "SRG",
    "tzAbbr": "WIB"
  },
  {
    "id": "yogyakarta",
    "name": "YOGYAKARTA",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jakarta",
    "lat": -7.7956,
    "lng": 110.3695,
    "code": "JOG",
    "tzAbbr": "WIB"
  },
  {
    "id": "palembang",
    "name": "PALEMBANG",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Jakarta",
    "lat": -2.9761,
    "lng": 104.7754,
    "code": "PLM",
    "tzAbbr": "WIB"
  },
  {
    "id": "balikpapan",
    "name": "BALIKPAPAN",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Makassar",
    "lat": -1.2379,
    "lng": 116.8529,
    "code": "BPN",
    "tzAbbr": "WITA"
  },
  {
    "id": "manado",
    "name": "MANADO",
    "country": "Indonesia",
    "countryCode": "id",
    "continent": "asia",
    "timezone": "Asia/Makassar",
    "lat": 1.4748,
    "lng": 124.8421,
    "code": "MDC",
    "tzAbbr": "WITA"
  },
  {
    "id": "johor-bahru",
    "name": "JOHOR BAHRU",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuala_Lumpur",
    "lat": 1.4927,
    "lng": 103.7414,
    "code": "JHB",
    "tzAbbr": "MYT"
  },
  {
    "id": "ipoh",
    "name": "IPOH",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuala_Lumpur",
    "lat": 4.5975,
    "lng": 101.0901,
    "code": "IPH",
    "tzAbbr": "MYT"
  },
  {
    "id": "melaka",
    "name": "MELAKA",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuala_Lumpur",
    "lat": 2.1896,
    "lng": 102.2501,
    "code": "MKZ",
    "tzAbbr": "MYT"
  },
  {
    "id": "putrajaya",
    "name": "PUTRAJAYA",
    "country": "Malaysia",
    "countryCode": "my",
    "continent": "asia",
    "timezone": "Asia/Kuala_Lumpur",
    "lat": 2.9264,
    "lng": 101.6964,
    "tzAbbr": "MYT"
  },
  {
    "id": "ankara",
    "name": "ANKARA",
    "country": "Turkey",
    "countryCode": "tr",
    "continent": "europe",
    "timezone": "Europe/Istanbul",
    "lat": 39.9334,
    "lng": 32.8597,
    "code": "ANK"
  },
  {
    "id": "san-jose-ca",
    "name": "SAN JOSE (CA)",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 37.3382,
    "lng": -121.8863,
    "code": "SJC"
  },
  {
    "id": "greenwich",
    "name": "GREENWICH",
    "country": "United Kingdom",
    "countryCode": "gb",
    "continent": "europe",
    "timezone": "Europe/London",
    "lat": 51.4769,
    "lng": -0.0005,
    "code": ""
  },
  {
    "id": "mecca",
    "name": "MECCA",
    "country": "Saudi Arabia",
    "countryCode": "sa",
    "continent": "asia",
    "timezone": "Asia/Riyadh",
    "lat": 21.3891,
    "lng": 39.8579,
    "code": "",
    "tzAbbr": "AST"
  },
  {
    "id": "medina",
    "name": "MEDINA",
    "country": "Saudi Arabia",
    "countryCode": "sa",
    "continent": "asia",
    "timezone": "Asia/Riyadh",
    "lat": 24.5247,
    "lng": 39.5692,
    "code": "MED",
    "tzAbbr": "AST"
  },
  {
    "id": "anaheim",
    "name": "ANAHEIM",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 33.8366,
    "lng": -117.9143,
    "code": "SNA"
  },
  {
    "id": "canberra",
    "name": "CANBERRA",
    "country": "Australia",
    "countryCode": "au",
    "continent": "oceania",
    "timezone": "Australia/Sydney",
    "lat": -35.2809,
    "lng": 149.13,
    "code": "CBR"
  },
  {
    "id": "ottawa",
    "name": "OTTAWA",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/Toronto",
    "lat": 45.4215,
    "lng": -75.6972,
    "code": "YOW"
  },
  {
    "id": "brasilia",
    "name": "BRASILIA",
    "country": "Brazil",
    "countryCode": "br",
    "continent": "america",
    "timezone": "America/Sao_Paulo",
    "lat": -15.7939,
    "lng": -47.8828,
    "code": "BSB",
    "tzAbbr": "BRT"
  },
  {
    "id": "abuja",
    "name": "ABUJA",
    "country": "Nigeria",
    "countryCode": "ng",
    "continent": "africa",
    "timezone": "Africa/Lagos",
    "lat": 9.0765,
    "lng": 7.3986,
    "code": "ABV",
    "tzAbbr": "WAT"
  },
  {
    "id": "rabat",
    "name": "RABAT",
    "country": "Morocco",
    "countryCode": "ma",
    "continent": "africa",
    "timezone": "Africa/Casablanca",
    "lat": 34.0209,
    "lng": -6.8416,
    "code": "RBA"
  },
  {
    "id": "pretoria",
    "name": "PRETORIA",
    "country": "South Africa",
    "countryCode": "za",
    "continent": "africa",
    "timezone": "Africa/Johannesburg",
    "lat": -25.7479,
    "lng": 28.2293,
    "code": "PRY",
    "tzAbbr": "SAST"
  },
  {
    "id": "hanoi",
    "name": "HANOI",
    "country": "Vietnam",
    "countryCode": "vn",
    "continent": "asia",
    "timezone": "Asia/Ho_Chi_Minh",
    "lat": 21.0285,
    "lng": 105.8542,
    "code": "HAN",
    "tzAbbr": "ICT"
  },
  {
    "id": "khartoum",
    "name": "KHARTOUM",
    "country": "Sudan",
    "countryCode": "sd",
    "continent": "africa",
    "timezone": "Africa/Khartoum",
    "lat": 15.5007,
    "lng": 32.5599,
    "code": "KRT",
    "tzAbbr": "CAT"
  },
  {
    "id": "kampala",
    "name": "KAMPALA",
    "country": "Uganda",
    "countryCode": "ug",
    "continent": "africa",
    "timezone": "Africa/Kampala",
    "lat": 0.3476,
    "lng": 32.5825,
    "code": "EBB",
    "tzAbbr": "EAT"
  },
  {
    "id": "harare",
    "name": "HARARE",
    "country": "Zimbabwe",
    "countryCode": "zw",
    "continent": "africa",
    "timezone": "Africa/Harare",
    "lat": -17.8252,
    "lng": 31.0335,
    "code": "HRE",
    "tzAbbr": "CAT"
  },
  {
    "id": "lusaka",
    "name": "LUSAKA",
    "country": "Zambia",
    "countryCode": "zm",
    "continent": "africa",
    "timezone": "Africa/Lusaka",
    "lat": -15.3875,
    "lng": 28.3228,
    "code": "LUN",
    "tzAbbr": "CAT"
  },
  {
    "id": "mogadishu",
    "name": "MOGADISHU",
    "country": "Somalia",
    "countryCode": "so",
    "continent": "africa",
    "timezone": "Africa/Mogadishu",
    "lat": 2.0469,
    "lng": 45.3182,
    "code": "MGQ",
    "tzAbbr": "EAT"
  },
  {
    "id": "amman",
    "name": "AMMAN",
    "country": "Jordan",
    "countryCode": "jo",
    "continent": "asia",
    "timezone": "Asia/Amman",
    "lat": 31.9454,
    "lng": 35.9284,
    "code": "AMM"
  },
  {
    "id": "beirut",
    "name": "BEIRUT",
    "country": "Lebanon",
    "countryCode": "lb",
    "continent": "asia",
    "timezone": "Asia/Beirut",
    "lat": 33.8938,
    "lng": 35.5018,
    "code": "BEY"
  },
  {
    "id": "damascus",
    "name": "DAMASCUS",
    "country": "Syria",
    "countryCode": "sy",
    "continent": "asia",
    "timezone": "Asia/Damascus",
    "lat": 33.5138,
    "lng": 36.2765,
    "code": "DAM"
  },
  {
    "id": "phnom-penh",
    "name": "PHNOM PENH",
    "country": "Cambodia",
    "countryCode": "kh",
    "continent": "asia",
    "timezone": "Asia/Phnom_Penh",
    "lat": 11.5564,
    "lng": 104.9282,
    "code": "PNH",
    "tzAbbr": "ICT"
  },
  {
    "id": "astana",
    "name": "ASTANA",
    "country": "Kazakhstan",
    "countryCode": "kz",
    "continent": "asia",
    "timezone": "Asia/Almaty",
    "lat": 51.1694,
    "lng": 71.4491,
    "code": "NQZ"
  },
  {
    "id": "sofia",
    "name": "SOFIA",
    "country": "Bulgaria",
    "countryCode": "bg",
    "continent": "europe",
    "timezone": "Europe/Sofia",
    "lat": 42.6977,
    "lng": 23.3219,
    "code": "SOF"
  },
  {
    "id": "santo-domingo",
    "name": "SANTO DOMINGO",
    "country": "Dominican Republic",
    "countryCode": "do",
    "continent": "america",
    "timezone": "America/Santo_Domingo",
    "lat": 18.4861,
    "lng": -69.9312,
    "code": "SDQ",
    "tzAbbr": "AST"
  },
  {
    "id": "guatemala-city",
    "name": "GUATEMALA CITY",
    "country": "Guatemala",
    "countryCode": "gt",
    "continent": "america",
    "timezone": "America/Guatemala",
    "lat": 14.6349,
    "lng": -90.5069,
    "code": "GUA",
    "tzAbbr": "CST"
  },
  {
    "id": "chennai",
    "name": "CHENNAI",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 13.0827,
    "lng": 80.2707,
    "code": "MAA",
    "tzAbbr": "IST"
  },
  {
    "id": "hyderabad",
    "name": "HYDERABAD",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 17.385,
    "lng": 78.4867,
    "code": "HYD",
    "tzAbbr": "IST"
  },
  {
    "id": "ahmedabad",
    "name": "AHMEDABAD",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 23.0225,
    "lng": 72.5714,
    "code": "AMD",
    "tzAbbr": "IST"
  },
  {
    "id": "pune",
    "name": "PUNE",
    "country": "India",
    "countryCode": "in",
    "continent": "asia",
    "timezone": "Asia/Kolkata",
    "lat": 18.5204,
    "lng": 73.8567,
    "code": "PNQ",
    "tzAbbr": "IST"
  },
  {
    "id": "lahore",
    "name": "LAHORE",
    "country": "Pakistan",
    "countryCode": "pk",
    "continent": "asia",
    "timezone": "Asia/Karachi",
    "lat": 31.5204,
    "lng": 74.3587,
    "code": "LHE",
    "tzAbbr": "PKT"
  },
  {
    "id": "chittagong",
    "name": "CHITTAGONG",
    "country": "Bangladesh",
    "countryCode": "bd",
    "continent": "asia",
    "timezone": "Asia/Dhaka",
    "lat": 22.3569,
    "lng": 91.7832,
    "code": "CGP",
    "tzAbbr": "BST"
  },
  {
    "id": "geneva",
    "name": "GENEVA",
    "country": "Switzerland",
    "countryCode": "ch",
    "continent": "europe",
    "timezone": "Europe/Zurich",
    "lat": 46.2044,
    "lng": 6.1432,
    "code": "GVA"
  },
  {
    "id": "kyoto",
    "name": "KYOTO",
    "country": "Japan",
    "countryCode": "jp",
    "continent": "asia",
    "timezone": "Asia/Tokyo",
    "lat": 35.0116,
    "lng": 135.7681,
    "code": "UKY",
    "tzAbbr": "JST"
  },
  {
    "id": "porto-alegre",
    "name": "PORTO ALEGRE",
    "country": "Brazil",
    "countryCode": "br",
    "continent": "america",
    "timezone": "America/Sao_Paulo",
    "lat": -30.0346,
    "lng": -51.2177,
    "code": "POA",
    "tzAbbr": "BRT"
  },
  {
    "id": "quebec-city",
    "name": "QUEBEC CITY",
    "country": "Canada",
    "countryCode": "ca",
    "continent": "america",
    "timezone": "America/Toronto",
    "lat": 46.8139,
    "lng": -71.208,
    "code": "YQB"
  },
  {
    "id": "sanaa",
    "name": "SANAA",
    "country": "Yemen",
    "countryCode": "ye",
    "continent": "asia",
    "timezone": "Asia/Aden",
    "lat": 15.3694,
    "lng": 44.191,
    "code": "SAH",
    "tzAbbr": "AST"
  },
  {
    "id": "yerevan",
    "name": "YEREVAN",
    "country": "Armenia",
    "countryCode": "am",
    "continent": "asia",
    "timezone": "Asia/Yerevan",
    "lat": 40.1792,
    "lng": 44.4991,
    "code": "EVN",
    "tzAbbr": "AMT"
  },
  {
    "id": "maputo",
    "name": "MAPUTO",
    "country": "Mozambique",
    "countryCode": "mz",
    "continent": "africa",
    "timezone": "Africa/Maputo",
    "lat": -25.9692,
    "lng": 32.5732,
    "code": "MPM",
    "tzAbbr": "CAT"
  },
  {
    "id": "pyongyang",
    "name": "PYONGYANG",
    "country": "North Korea",
    "countryCode": "kp",
    "continent": "asia",
    "timezone": "Asia/Pyongyang",
    "lat": 39.0392,
    "lng": 125.7625,
    "code": "FNJ",
    "tzAbbr": "KST"
  },
  {
    "id": "rotterdam",
    "name": "ROTTERDAM",
    "country": "Netherlands",
    "countryCode": "nl",
    "continent": "europe",
    "timezone": "Europe/Amsterdam",
    "lat": 51.9244,
    "lng": 4.4777,
    "code": "RTM"
  },
  {
    "id": "little-rock",
    "name": "LITTLE ROCK",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Chicago",
    "lat": 34.7465,
    "lng": -92.2896,
    "code": "LIT"
  },
  {
    "id": "chongqing",
    "name": "CHONGQING",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 29.563,
    "lng": 106.5516,
    "code": "CKG",
    "tzAbbr": "CST"
  },
  {
    "id": "fresno",
    "name": "FRESNO",
    "country": "United States",
    "countryCode": "us",
    "continent": "america",
    "timezone": "America/Los_Angeles",
    "lat": 36.7378,
    "lng": -119.7871,
    "code": "FAT"
  },
  {
    "id": "los-banos",
    "name": "LOS BANOS",
    "country": "Philippines",
    "countryCode": "ph",
    "continent": "asia",
    "timezone": "Asia/Manila",
    "lat": 14.1699,
    "lng": 121.2438,
    "code": "",
    "tzAbbr": "PST"
  },
  {
    "id": "isfahan",
    "name": "ISFAHAN",
    "country": "Iran",
    "countryCode": "ir",
    "continent": "asia",
    "timezone": "Asia/Tehran",
    "lat": 32.6546,
    "lng": 51.668,
    "code": "IFN",
    "tzAbbr": "IRST"
  },
  {
    "id": "mashhad",
    "name": "MASHHAD",
    "country": "Iran",
    "countryCode": "ir",
    "continent": "asia",
    "timezone": "Asia/Tehran",
    "lat": 36.2605,
    "lng": 59.6168,
    "code": "MHD",
    "tzAbbr": "IRST"
  },
  {
    "id": "hangzhou",
    "name": "HANGZHOU",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 30.2741,
    "lng": 120.1551,
    "code": "HGH",
    "tzAbbr": "CST"
  },
  {
    "id": "suzhou",
    "name": "SUZHOU",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 31.2989,
    "lng": 120.5853,
    "code": "",
    "tzAbbr": "CST"
  },
  {
    "id": "tianjin",
    "name": "TIANJIN",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 39.3434,
    "lng": 117.3616,
    "code": "TSN",
    "tzAbbr": "CST"
  },
  {
    "id": "wuhan",
    "name": "WUHAN",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 30.5928,
    "lng": 114.3055,
    "code": "WUH",
    "tzAbbr": "CST"
  },
  {
    "id": "shantou",
    "name": "SHANTOU",
    "country": "China",
    "countryCode": "cn",
    "continent": "asia",
    "timezone": "Asia/Shanghai",
    "lat": 23.3541,
    "lng": 116.6819,
    "code": "SWA",
    "tzAbbr": "CST"
  }
];

export const ALL_AVAILABLE_CITIES: City[] = [...DEFAULT_CITIES, ...RAW_CITIES];
export const WORLD_CITIES_DATABASE: City[] = ALL_AVAILABLE_CITIES;


// Standard abbreviations for zones whose English locales only offer a plain "GMT+x"
// (keyed by Intl's long English name; Greenland is keyed per zone because the name is shared).
const LONG_NAME_ABBR: Record<string, string> = {
  'Eastern European Standard Time': 'EET',
  'Eastern European Summer Time': 'EEST',
  'Azores Standard Time': 'AZOT',
  'Azores Summer Time': 'AZOST',
  'Chile Standard Time': 'CLT',
  'Chile Summer Time': 'CLST',
  'Easter Island Standard Time': 'EAST',
  'Easter Island Summer Time': 'EASST',
  'Israel Standard Time': 'IST',
  'Israel Daylight Time': 'IDT',
  'Norfolk Island Standard Time': 'NFT',
  'Norfolk Island Daylight Time': 'NFDT',
  'St. Pierre & Miquelon Standard Time': 'PMST',
  'St. Pierre & Miquelon Daylight Time': 'PMDT',
  'Greenland Standard Time@America/Scoresbysund': 'EGT',
  'Greenland Summer Time@America/Scoresbysund': 'EGST',
  'Greenland Standard Time@America/Nuuk': 'WGT',
  'Greenland Summer Time@America/Nuuk': 'WGST',
};
const dstObservedCache = new Map<string, boolean>();
function observesDst(timezone: string, year: number): boolean {
  const key = `${timezone}|${year}`;
  const cached = dstObservedCache.get(key);
  if (cached !== undefined) return cached;
  let result = false;
  try {
    const dtf = cachedDtf('en-US', { timeZone: timezone, timeZoneName: 'shortOffset' });
    const off = (d: Date) => dtf.formatToParts(d).find((p) => p.type === 'timeZoneName')?.value;
    result = off(new Date(Date.UTC(year, 0, 15))) !== off(new Date(Date.UTC(year, 6, 15)));
  } catch {
    // keep false
  }
  dstObservedCache.set(key, result);
  return result;
}

/**
 * Timezone abbreviation that is correct for the given date.
 * Zones that switch to DST get Intl's current name (e.g. "EDT") or a "GMT+1"-style offset,
 * because a single static abbreviation (EST/BST/AEDT) is wrong for half of the year.
 */
export function getTimeZoneAbbr(
  timezone: string,
  staticAbbr: string | undefined,
  date: Date,
  countryCode?: string
): string {
  const shortName = (locale: string) => {
    try {
      return (
        cachedDtf(locale, { timeZone: timezone, timeZoneName: 'short' })
          .formatToParts(date)
          .find((p) => p.type === 'timeZoneName')?.value || ''
      );
    } catch {
      return '';
    }
  };
  const isLetters = (s: string) => /^[A-Za-z]{2,5}$/.test(s);

  // en-US knows EDT/PST; the country's own English locale knows AEDT, BST, NZDT, IST, ...
  const candidates = ['en-US'];
  if (countryCode && countryCode.toLowerCase() !== 'un') candidates.push(`en-${countryCode.toUpperCase()}`);
  for (const loc of candidates) {
    const s = shortName(loc);
    if (isLetters(s)) return s;
  }
  try {
    const longName =
      cachedDtf('en-US', { timeZone: timezone, timeZoneName: 'long' })
        .formatToParts(date)
        .find((p) => p.type === 'timeZoneName')?.value || '';
    const known = LONG_NAME_ABBR[`${longName}@${timezone}`] ?? LONG_NAME_ABBR[longName];
    if (known) return known;
  } catch {
    // ignore
  }
  const fallback = shortName('en-US');
  if (staticAbbr && !observesDst(timezone, date.getUTCFullYear())) return staticAbbr;
  return fallback === 'GMT' ? 'GMT+0' : fallback || staticAbbr || '';
}

export function isTimezoneDst(date: Date, timezone: string): boolean {
  try {
    const year = date.getFullYear();
    const jan = new Date(year, 0, 1);
    const jul = new Date(year, 6, 1);
    const getOffset = (d: Date) => {
      const parts = cachedDtf('en-US', {
        timeZone: timezone,
        timeZoneName: 'shortOffset',
      }).formatToParts(d);
      const str = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT';
      const match = str.match(/GMT([+-])(\d+)(?::(\d+))?/);
      if (!match) return 0;
      const sign = match[1] === '+' ? 1 : -1;
      const h = parseInt(match[2], 10);
      const m = match[3] ? parseInt(match[3], 10) : 0;
      return sign * (h * 60 + m);
    };
    const currentOffset = getOffset(date);
    const janOffset = getOffset(jan);
    const julOffset = getOffset(jul);
    const stdOffset = Math.min(janOffset, julOffset);
    return currentOffset > stdOffset;
  } catch {
    return false;
  }
}

export function getTimeDetails(
  baseDate: Date,
  timezone: string,
  homeTimezone?: string,
  lang: 'id' | 'en' = 'id'
): TimeDetails {
  try {
    const dtf24 = cachedDtf('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = dtf24.formatToParts(baseDate);
    const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '00';

    const hoursStr = getPart('hour');
    const minutesStr = getPart('minute');
    const secondsStr = getPart('second');
    const time24 = `${hoursStr}:${minutesStr}`;

    const hourNum = parseInt(hoursStr, 10) % 24;
    const period: 'AM' | 'PM' = hourNum >= 12 ? 'PM' : 'AM';
    const hour12Num = hourNum % 12 === 0 ? 12 : hourNum % 12;
    const time12 = `${String(hour12Num).padStart(2, '0')}:${minutesStr} ${period}`;

    // Date & Day formatting based on selected language
    const locale = lang === 'id' ? 'id-ID' : 'en-US';
    const dtfDate = cachedDtf(locale, {
      timeZone: timezone,
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const dateParts = dtfDate.formatToParts(baseDate);
    const getDatePart = (type: string) => dateParts.find((p) => p.type === type)?.value || '';

    const dayName = getDatePart('weekday');
    const dayNumber = getDatePart('day');
    const monthName = getDatePart('month');
    const yearNumber = parseInt(getDatePart('year') || String(baseDate.getFullYear()), 10);

    const dtfMonthNum = cachedDtf('en-US', {
      timeZone: timezone,
      month: 'numeric',
    });
    const monthNumber = parseInt(dtfMonthNum.format(baseDate), 10) || 1;

    const shortDateStr = `${dayName}, ${dayNumber} ${monthName}`;
    const fullDateStr = `${dayName}, ${dayNumber} ${monthName} ${yearNumber}`;

    // GMT Offset & Timezone Name
    const dtfOffset = cachedDtf('en-US', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    });
    const offsetParts = dtfOffset.formatToParts(baseDate);
    const offsetStrRaw = offsetParts.find((p) => p.type === 'timeZoneName')?.value || 'GMT';
    const offsetStr = offsetStrRaw === 'GMT' ? 'GMT+0' : offsetStrRaw;

    // Timezone abbreviation (e.g. WIB, JST, EDT)
    let tzAbbr = '';
    try {
      const dtfAbbr = cachedDtf('en-US', {
        timeZone: timezone,
        timeZoneName: 'short',
      });
      const abbrParts = dtfAbbr.formatToParts(baseDate);
      tzAbbr = abbrParts.find((p) => p.type === 'timeZoneName')?.value || offsetStr;
    } catch {
      tzAbbr = offsetStr;
    }

    const parseMinutes = (str: string) => {
      const match = str.match(/GMT([+-])(\d+)(?::(\d+))?/);
      if (!match) return 0;
      const sign = match[1] === '+' ? 1 : -1;
      const hours = parseInt(match[2], 10);
      const minutes = match[3] ? parseInt(match[3], 10) : 0;
      return sign * (hours * 60 + minutes);
    };

    const offsetMinutes = parseMinutes(offsetStr);
    const isDst = isTimezoneDst(baseDate, timezone);

    // Relative day and difference from home
    let diffFromHomeHours = 0;
    let diffDayDesc: 'same' | 'next' | 'prev' = 'same';

    if (homeTimezone) {
      const dtfHome = cachedDtf('en-US', {
        timeZone: homeTimezone,
        timeZoneName: 'shortOffset',
        day: 'numeric',
      });
      const homeParts = dtfHome.formatToParts(baseDate);
      const homeOffsetStr = homeParts.find((p) => p.type === 'timeZoneName')?.value || 'GMT';
      const homeDayNum = parseInt(homeParts.find((p) => p.type === 'day')?.value || dayNumber, 10);
      const targetDayNum = parseInt(dayNumber, 10);

      const homeOffsetMinutes = parseMinutes(homeOffsetStr);
      const diffMin = offsetMinutes - homeOffsetMinutes;
      diffFromHomeHours = diffMin / 60;

      if (targetDayNum > homeDayNum || (homeDayNum >= 28 && targetDayNum === 1)) {
        diffDayDesc = 'next';
      } else if (targetDayNum < homeDayNum || (homeDayNum === 1 && targetDayNum >= 28)) {
        diffDayDesc = 'prev';
      } else {
        diffDayDesc = 'same';
      }
    }

    // Weekend (Sat/Sun) in the city's own timezone never counts as business hours
    const weekdayShort = cachedDtf('en-US', { timeZone: timezone, weekday: 'short' }).format(baseDate);
    const isWeekend = weekdayShort === 'Sat' || weekdayShort === 'Sun';
    const isBusinessHours = !isWeekend && hourNum >= 9 && hourNum < 18;

    return {
      hoursStr,
      minutesStr,
      secondsStr,
      time24,
      time12,
      period,
      dayName,
      dayNumber,
      monthName,
      monthNumber,
      yearNumber,
      fullDateStr,
      shortDateStr,
      offsetStr,
      offsetMinutes,
      tzAbbr,
      isDst,
      dstName: isDst ? 'DST' : 'Standard Time',
      diffFromHomeHours,
      diffDayDesc,
      isBusinessHours,
      isWeekend,
    };
  } catch (err) {
    console.error('Timezone calculation error:', err);
    return {
      hoursStr: '00',
      minutesStr: '00',
      secondsStr: '00',
      time24: '00:00',
      time12: '12:00 AM',
      dayName: 'Day',
      dayNumber: '1',
      monthName: 'Jan',
      monthNumber: 1,
      yearNumber: 2026,
      fullDateStr: 'Date',
      shortDateStr: 'Date',
      offsetStr: 'GMT',
      offsetMinutes: 0,
      tzAbbr: 'UTC',
      isDst: false,
      diffFromHomeHours: 0,
      diffDayDesc: 'same',
      isBusinessHours: false,
      isWeekend: false,
    };
  }
}

/**
 * Sets a specific date/time for a city's timezone and returns the corresponding UTC Date object.
 */
export function setTimeForTimezone(
  currentDate: Date,
  timezone: string,
  target: {
    hour?: number;
    minute?: number;
    day?: number;
    month?: number; // 0-11
    year?: number;
  }
): Date {
  try {
    const dtf = cachedDtf('en-GB', {
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const parts = dtf.formatToParts(currentDate);
    const getP = (type: string) => parseInt(parts.find((p) => p.type === type)?.value || '0', 10);

    const curYear = getP('year') || currentDate.getFullYear();
    const curMonth = (getP('month') || 1) - 1; // 0-11
    const curDay = getP('day') || currentDate.getDate();
    let curHour = getP('hour');
    if (curHour === 24) curHour = 0;
    const curMinute = getP('minute');
    const curSecond = getP('second');

    const desiredYear = target.year !== undefined ? target.year : curYear;
    const desiredMonth = target.month !== undefined ? target.month : curMonth;
    const desiredDay = target.day !== undefined ? target.day : curDay;
    const desiredHour = target.hour !== undefined ? target.hour : curHour;
    const desiredMinute = target.minute !== undefined ? target.minute : curMinute;
    const desiredSecond = curSecond;

    // Approximate UTC timestamp treating target components as UTC
    const targetUtc = Date.UTC(desiredYear, desiredMonth, desiredDay, desiredHour, desiredMinute, desiredSecond);

    // Measure the timezone offset at that approximate time
    const testDate = new Date(targetUtc);
    const testParts = dtf.formatToParts(testDate);
    const getTestP = (type: string) => parseInt(testParts.find((p) => p.type === type)?.value || '0', 10);
    let testHour = getTestP('hour');
    if (testHour === 24) testHour = 0;
    const testAsUtc = Date.UTC(
      getTestP('year') || desiredYear,
      (getTestP('month') || 1) - 1,
      getTestP('day') || desiredDay,
      testHour,
      getTestP('minute') || desiredMinute,
      getTestP('second') || desiredSecond
    );

    const offset = testAsUtc - targetUtc;
    const finalTime = targetUtc - offset;
    return new Date(finalTime);
  } catch (err) {
    console.error('setTimeForTimezone error:', err);
    return currentDate;
  }
}


// Cities shown the first time the app is opened (Jakarta is the default home)
export const INITIAL_CITIES: City[] = ['jakarta', 'aoe', 'utc']
  .map((id) => ALL_AVAILABLE_CITIES.find((c) => c.id === id))
  .filter((c): c is City => Boolean(c));

/** Current UTC offset of a zone as "GMT+1", "GMT-5", "GMT+5:30" (never plain "GMT"). */
export function getGmtOffsetLabel(timezone: string, date: Date): string {
  try {
    const v =
      cachedDtf('en-US', { timeZone: timezone, timeZoneName: 'shortOffset' })
        .formatToParts(date)
        .find((p) => p.type === 'timeZoneName')?.value || 'GMT';
    return v === 'GMT' ? 'GMT+0' : v.replace('−', '-');
  } catch {
    return 'GMT';
  }
}
