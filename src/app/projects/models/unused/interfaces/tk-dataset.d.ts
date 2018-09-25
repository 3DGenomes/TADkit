/**
 * Dataset from a TADbit experiment.
 */

import { Experiment } from "@projects/services/interfaces/tk-experiment"
import { Region } from "@projects/services/interfaces/tk-position"
import { Ensemble } from "@projects/services/interfaces/tk-ensemble"

interface Regions extends Array<Region> {}

export interface Dataset {
  uuid: string; // unique ID to avoid share/title conflicts
  ref: string;  // for easy reference in UI/URI
  title: string;
  id: string;
  experiment: Experiment; // TADbit input: computational variables
  regions: Regions;
  ensemble: Ensemble; // TADbit output: spatial models
}
