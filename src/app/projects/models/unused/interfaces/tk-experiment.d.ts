/**
 * Interface for a TADbit experiment.
 */

interface Dependency {
  IMP: string;
  TADbit: string;
  MCL: string;
}
interface Dependencies extends Array<Dependency> {}

interface Restraint {
  particle1Id: number,
  particle2Id: number,
  restraintType: "None" | "a" | "n" | "u" | "l",
  strength: number
}
interface Restraints extends Array<Restraint> {}

export interface Experiment {
  id: string;
  type: string;                           // e.g. "Hi-C", "ChIP-seq"...
  particleCount: number;
  start: number;                          // Matrix selection
  end: number;
  resolution: number;                     // in basepairs e.g. 2000 (2Kb), 5000 (5Kb)...
  dependencies: Dependencies[] | null;
  restraints: Restraints[] | null;
}