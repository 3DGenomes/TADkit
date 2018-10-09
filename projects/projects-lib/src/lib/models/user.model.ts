/**
 * User: Class for TADkit user and assicated projects.
 */
import { Metadata } from './project-metadata.model';
import { Projects } from './project.model';

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
