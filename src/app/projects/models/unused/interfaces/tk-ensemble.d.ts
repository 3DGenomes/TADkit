/**
 * Ensemble of models from TADbit experiment.
 * Describes structure and clustering.
 */

interface Tuple {
  x: number;
  y: number;
  z: number;
}
interface Tuples extends Array<Tuple> {}

interface Model {
  id: number;
  data: Tuples[] | null;
}
interface Models extends Array<Model> {}
interface ModelRefs extends Array<Model["id"]> {}

interface Cluster {
  modelRefs: ModelRefs[] | null;
  centroid: Model["id"];
}
interface Clusters extends Array<Cluster> {}
// Note Clusters contain their Centroids

export interface Ensemble {
  uuid: string;
  ref: string;
  source: string; 
  type: string;
  components: 3;
  models: Models[] | null; // {"1","0,0,0","0,0,0"}; // return empty particle pair
  clusters: Clusters[] | null; // [["0"]] // return all refs as single cluster
}