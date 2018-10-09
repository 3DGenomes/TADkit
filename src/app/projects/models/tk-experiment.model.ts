/**
 * Experiment: Class for documenting a TADbit experiment.
 */
import { Metadata } from '@projects/models/tk-metadata.model';

class Dependency {
  IMP: string;
  TADbit: string;
  MCL: string;
}
class Dependencies extends Array<Dependency> {}

class Restraint {
  particle1Id: number;
  particle2Id: number;
  restraintType: 'None' | 'a' | 'n' | 'u' | 'l';
  strength: number;
}
class Restraints extends Array<Restraint> {}

export class Experiment {
  metadata: Metadata;
  id: string;
  type: string;                           // e.g. "Hi-C", "ChIP-seq"...
  particleCount: number;
  start: number;                          // Matrix selection
  end: number;
  resolution: number;                     // in basepairs e.g. 2000 (2Kb), 5000 (5Kb)...
  dependencies: Dependencies[] | null;
  restraints: Restraints[] | null;
}
