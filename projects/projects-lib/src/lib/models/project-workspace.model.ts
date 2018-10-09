/**
 * Storyboard: Class capturing TADkit visualization layout (aka user UI/workspace) state.
 */
import { Metadata } from './project-metadata.model';
import { Widgets } from './project-widget.model';

export class Workspace {
  metadata: Metadata;
  uuid: string;
  ref: string; // for easy reference in UI/URI
  title: string;
  background: string;
  margin: string;
  padding: string;
  components?: Widgets | null;
}
