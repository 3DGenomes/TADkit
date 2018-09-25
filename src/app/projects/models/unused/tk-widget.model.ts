/**
 * Widget: Class for TADkit visualization widget (aka storyboard/layout).
 */
import { GridLocation } from '@projects/models/tk-cssgrid.model';
import { Regions } from '@projects/models/tk-position.model';

class Setting {
  setting: string | number; // elaborate

  // export class Padding {
  //   top: string;
  //   right: string;
  //   bottom: string;
  //   left: string;
  // }
  // scale: number;
  // background: string;
  // padding: string;
}

export class Widget {
  id: string;
  title: string;
  type: string; // specify component
  dataset: string | null; // specify for comparsion | null to use current
  location: GridLocation; // using CSSGrid positioning
  regions: Regions | null; // specify for region | null to view extents
  settings: Array<Setting>; // component specific
}

export class Widgets extends Array<Widget> {}
