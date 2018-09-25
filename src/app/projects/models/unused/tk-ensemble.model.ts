/**
 * Ensemble: Class for ensemble of models from TADbit experiment.
 * Describes structure and clustering.
 */
import { Metadata } from '@projects/models/tk-metadata.model';

class Tuple {
  x: number;
  y: number;
  z: number;
}
class Tuples extends Array<Tuple> {}

class Model {
  id: number;
  data: Tuples[] | null;
}
class Models extends Array<Model> {}
class ModelRefs extends Array<Model['id']> {}

class Cluster {
  modelRefs: ModelRefs[] | null;
  centroid: Model['id'];
}
class Clusters extends Array<Cluster> {}
// Note Clusters contain their Centroids

export class Ensemble {
  metadata: Metadata;
  uuid: string;
  ref: string;
  source: string; 
  type: string;
  components: 3;
  models: Models[] | null; // {"1","0,0,0","0,0,0"}; // return empty particle pair
  clusters: Clusters[] | null; // [["0"]] // return all refs as single cluster
}