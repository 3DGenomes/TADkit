/**
 * Widget3D: Class extending Widget class for 3D views
 */
import { Widget } from '@projects/models/tk-widget.model';
import { Geometries } from '@projects/models/tk-geometry.model';

 export class Frustum {
  camera?: (number)[] | null;
  target?: (number)[] | null;
  fov?: number | null;
  near?: number | null;
  far?: number | null;
  translate?: number | null;
  fog?: boolean | null;
  fogNear?: number | null;
  fogFar?: number | null;
}

export class Lighting {
  ambient: string;
  color: string;
  intensity: number;
}

export class Axis {
  size: number;
  visible: boolean;
}

export class Navigation {
  autoRotate: boolean;
  autoRotateSpeed: number;
}

export class Widget3D extends Widget {
  frustum: Frustum; // spatial matrix for 3D view
  lighting?: Lighting | null;
  axis?: Axis | null;
  navigation?: Navigation | null;
  geometries?: Geometries | null;
}
