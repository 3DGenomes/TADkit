/**
 * Palette.
 */

// type HEX = "#" + number;

interface Swatch {
  uuid: string;
  RGB: string | null;
  alpha: number | 1;
}
interface Swatches extends Array<Swatch> {}

export interface Palette {
  uuid: string;
  swatches: Swatches[] | null;
}