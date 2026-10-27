import { ThemeMode } from '../types';

/**
 * Board palettes, same eight as flapdot.com.
 * bg = board / page color, ink = lit dot + text color, off = unlit dot color.
 * The whole UI is derived from these (see "Palettes" in index.css).
 */
export type PaletteId =
  | 'midnight'
  | 'obsidian'
  | 'paper'
  | 'matcha'
  | 'lemon'
  | 'sky'
  | 'amber'
  | 'phosphor';

export interface Palette {
  id: PaletteId;
  mode: ThemeMode;
  bg: string;
  ink: string;
  off: string;
  name: { en: string; id: string };
}

export const PALETTES: Palette[] = [
  { id: 'midnight', mode: 'dark', bg: '#1b1b1b', ink: '#ffffff', off: 'rgba(255,255,255,.13)', name: { en: 'Midnight', id: 'Tengah Malam' } },
  { id: 'obsidian', mode: 'dark', bg: '#000000', ink: '#ffffff', off: 'rgba(255,255,255,.18)', name: { en: 'Obsidian', id: 'Obsidian' } },
  { id: 'paper', mode: 'light', bg: '#eaeaea', ink: '#111111', off: 'rgba(0,0,0,.08)', name: { en: 'Paper', id: 'Kertas' } },
  { id: 'matcha', mode: 'light', bg: '#dde7cf', ink: '#24361a', off: 'rgba(36,54,26,.10)', name: { en: 'Matcha', id: 'Matcha' } },
  { id: 'lemon', mode: 'light', bg: '#f6f0b4', ink: '#2d2a12', off: 'rgba(45,42,18,.09)', name: { en: 'Lemon', id: 'Lemon' } },
  { id: 'sky', mode: 'light', bg: '#cfddf2', ink: '#14284a', off: 'rgba(20,40,74,.10)', name: { en: 'Sky', id: 'Langit' } },
  { id: 'amber', mode: 'dark', bg: '#0e0b07', ink: '#ffb238', off: 'rgba(255,178,56,.12)', name: { en: 'Amber', id: 'Amber' } },
  { id: 'phosphor', mode: 'dark', bg: '#050d07', ink: '#52f28a', off: 'rgba(82,242,138,.11)', name: { en: 'Phosphor', id: 'Fosfor' } },
];

export const DEFAULT_PALETTE_LIGHT: PaletteId = 'sky';
export const DEFAULT_PALETTE_DARK: PaletteId = 'midnight';

export function getPalette(id: string | null | undefined): Palette | undefined {
  return PALETTES.find((p) => p.id === id);
}
