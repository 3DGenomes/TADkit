/**
 * General classes defining TADkit settings.
 */

import { GridTemplate } from '@projects/models/tk-cssgrid.model';
import { Coordinate, Region } from '@projects/models/tk-position.model';

class Current {
  region: Region;
  position: Coordinate;
  particle: number;
  // particlesCount: number; // needed?
}

export class Settings {
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
