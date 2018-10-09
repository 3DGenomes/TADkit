/**
 * Geometry: Class for 3D geometry.
 * Describes properities for rendering in 3D view.
 */
import { Metadata } from './project-metadata.model';

class Particles {
  color: string;
  size: number;
  opacity: number;
  map?: string | null;
  depthTest: boolean;
  alphaTest: number;
  transparent: boolean;
  visible: boolean;
}
class Chromatin {
  particleSegments: number;
  curveSegments: number;
  radius: number;
  radiusSegments: number;
  endcap: boolean;
  pathClosed: boolean;
  visible: boolean;
}
class Cluster {
  color: string;
  linewidth: number;
  transparent: boolean;
  modelOpacity: number;
  centroidOpacity: number;
  fog: boolean;
  visible: boolean;
}
class Occupancy {
  visible: boolean;
}

export class Geometry {
  segments?: number | null;
  particles?: Particles | null;
  chromatin?: Chromatin | null;
  cluster?: Cluster | null;
  occupancy?: Occupancy | null;
}

export class Geometries extends Array<Geometry> {}
