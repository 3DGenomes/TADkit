/**
 * Dataset: Class for dataset from TADbit experiment.
 */
import { Metadata } from './project-metadata.model';
import { Experiment } from './project-experiment.model';
import { Regions } from './project-position.model';
import { Ensemble } from './project-ensemble.model';

export class Dataset {
  metadata: Metadata;
  uuid: string; // unique ID to avoid share/title conflicts
  ref: string;  // for easy reference in UI/URI
  title: string;
  id: string;
  experiment: Experiment; // TADbit input: computational variables
  regions: Regions;
  ensemble: Ensemble; // TADbit output: spatial models
}
