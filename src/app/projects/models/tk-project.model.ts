/**
 * Project: Class encapsulating all data within a TADkit project.
 */
import { Metadata } from '@projects/models/tk-metadata.model';

// import { Dataset } from "./tk-dataset.model"
// import { Overlay } from "./tk-overlay.model"
// import { Storyboard } from "./tk-storyboard.model"
// // import { Species } from "./tk-genomics.model";

// export class Datasets extends Array<Dataset> {}
// export class Overlays extends Array<Overlay> {}
// export class Storyboards extends Array<Storyboard> {}

export class Project {
  metadata: Metadata;
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

export class Projects extends Array<Project> {}

