/**
 * 3D wiget.
 */

 import { Species } from "@projects/services/interfaces/tk-genomics";

 export interface Widget3DView {
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
export interface Controls {
  autoRotate: boolean;
  autoRotateSpeed: number;
}
export interface Settings {
  lighting?: Lighting | null;
  axis?: Axis | null;
  particles?: Particles | null;
  chromatin?: Chromatin | null;
  cluster?: Cluster | null;
  occupancy?: Occupancy | null;
  segments?: number | null;
  heightInner?: string | null;
  example?: number | null;
  jbrowse_path?: string | null;
  species?: Species["common"];
}
export interface Padding {
  top: string;
  right: string;
  bottom: string;
  left: string;
}
export interface Lighting {
  ambient: string;
  color: string;
  intensity: number;
}
export interface Axis {
  size: number;
  visible: boolean;
}
export interface Particles {
  color: string;
  size: number;
  opacity: number;
  map?: string | null;
  depthTest: boolean;
  alphaTest: number;
  transparent: boolean;
  visible: boolean;
}
export interface Chromatin {
  particleSegments: number;
  curveSegments: number;
  radius: number;
  radiusSegments: number;
  endcap: boolean;
  pathClosed: boolean;
  visible: boolean;
}
export interface Cluster {
  color: string;
  linewidth: number;
  transparent: boolean;
  modelOpacity: number;
  centroidOpacity: number;
  fog: boolean;
  visible: boolean;
}
export interface Occupancy {
  visible: boolean;
}

