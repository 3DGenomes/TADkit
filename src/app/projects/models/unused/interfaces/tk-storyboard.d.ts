/**
 * TADkit visualization storyboard (aka user UI/workspace)
 */

import { Widget } from "@projects/services/interfaces/tk-widget"

interface Widgets extends Array<Widget> {}

export interface Storyboard {
  uuid: string;
  ref: string; // for easy reference in UI/URI
  title: string;
  background: string;
  margin: string;
  padding: string;
  components?: Widgets[] | null;
}