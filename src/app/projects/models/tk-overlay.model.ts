/**
 * Overlay: Class for data formated to align to current visualization across components.
 */
import { Metadata } from '@projects/models/tk-metadata.model';
import { Dataset } from '@projects/models/tk-dataset.model';
import { Palette } from '@projects/models/tk-palette.model';

// Arrays of swatch indices
class Particles extends Array<number> {}
class Chromatin extends Array<number> {}
class Networks extends Array<number> {}

class Colorsets {
  particles: Particles[] | null;
  chromatin: Chromatin[] | null;
  networks: Networks[] | null;
}

export class Overlay {
  metadata: Metadata;
  uuid: string;
  ref: string; // for easy reference in UI/URI
  title: string;
  description: string;
  // type: string;
  // format: string;
  // components: number;
  state: boolean;
  palette: Palette['uuid'] | null;
  dataset: Dataset['uuid'] | null;
  colors?: Colorsets[] | null;
}