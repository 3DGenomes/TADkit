/**
 * TADkit settigns (Usefull to have interface??)
 */

import { GridTemplate } from "@projects/services/interfaces/tk-cssgrid";
import { Coordinate, Region } from "@projects/services/interfaces/tk-position";

interface Current {
  region: Region;
  position: Coordinate;
  particle: number;
  // particlesCount: number; // needed?
}

export interface Settings {
  initialized: boolean;
  online: boolean;
  importdelimiter: string;
  layout: GridTemplate;
  current: Current;
}

// MOVE to specific component (group?)
  // particleSegments: number;
  // edgesCount: number;
  // segment: number;
  // segmentLength: number;
  // segmentLower: number;
  // segmentUpper: number;
  // segmentCount: number;