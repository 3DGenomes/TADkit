/**
 * User: Class for TADkit user and assicated projects.
 */
import { Metadata } from '@projects/models/tk-metadata.model';
import { Projects } from '@projects/models/tk-project.model';

export class User {
  metadata: Metadata;
  uuid: string;
  ref: string; // for easy reference in UI/URI
  title: string;
  email: string;
  organization: string;
  permissions: string;
  projects: Projects[] | null; // optional or install samples
}

export class Users extends Array<User> {}
