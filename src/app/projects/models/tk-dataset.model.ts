/**
 * Dataset: Class for dataset from TADbit experiment.
 */
import { Metadata } from '@projects/models/tk-metadata.model';
import { Experiment } from '@projects/models/tk-experiment.model';
import { Regions } from '@projects/models/tk-position.model';
import { Ensemble } from '@projects/models/tk-ensemble.model';

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
