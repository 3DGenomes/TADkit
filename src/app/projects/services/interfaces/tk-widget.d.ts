/**
 * TADkit visualization widget (aka storyboard/layout).
 */

import { GridLocation } from "@projects/services/interfaces/tk-cssgrid"
import { Region } from "@projects/services/interfaces/tk-position"

interface Regions extends Array<Region> {}

interface Setting {
  setting: string | number; // elaborate

  // scale: number;
  // background: string;
  // padding: string;
}

export interface Widget {
  id: string;
  title: string;
  type: string; // specify component
  dataset: string | null; // specify for comparsion | null to use current
  location: GridLocation; // using CSSGrid positioning
  regions: Regions | null; // specify for region | null to view extents
  settings: Array<Setting>; // component specific
}

