/**
 * Cross-component formated to align to current visualization.
 */

import { Dataset } from "@projects/services/interfaces/tk-dataset"
import { Palette } from "@projects/services/interfaces/tk-palette"

// Arrays of swatch indices
interface Particles extends Array<number> {}
interface Chromatin extends Array<number> {}
interface Networks extends Array<number> {}

interface Colorsets {
  particles: Particles[] | null;
  chromatin: Chromatin[] | null;
  networks: Networks[] | null;
}

export interface Overlay {
  uuid: string;
  ref: string; // for easy reference in UI/URI
  title: string;
  description: string;
  // type: string;
  // format: string;
  // components: number;
  state: boolean;
  palette: Palette["uuid"] | null;
  dataset: Dataset["uuid"] | null;
  colors?: Colorsets[] | null;
}