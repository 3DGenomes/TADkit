/**
 * TADkit project.
 */

// import { Species } from "./tk-genomics";

// import { Dataset } from "./tk-dataset"
// import { Overlay } from "./tk-overlay"
// import { Storyboard } from "./tk-storyboard"

// export interface Datasets extends Array<Dataset> {}
// export interface Overlays extends Array<Overlay> {}
// export interface Storyboards extends Array<Storyboard> {}

export interface Project {
  uuid: string;
  ref: string; // for easy reference in UI/URI
  title: string;
  description: string;
  group: string;
  state: boolean;
  cellType: string;
  species: string;
  assembly: string;
  // datasets?: Datasets[] | null;
  // overlays?: Overlays[] | null;
  // storyboards?: Storyboards[] | null;
}
