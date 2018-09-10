/**
 * Palette: Class defining color values used in visualization.
 * ¿Research Vega-lite an other visualization standards?
 */

// type HEX = "#" + number;

class Swatch {
  uuid: string;
  RGB: string | null;
  alpha: number | 1;
}
class Swatches extends Array<Swatch> {}

export class Palette {
  uuid: string;
  swatches: Swatches[] | null;
}