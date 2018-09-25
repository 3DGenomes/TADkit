/**
 * TADkit user.
 */

import { Project } from "@projects/services/interfaces/tk-project"

export interface Projects extends Array<Project> {}

export interface User {
  uuid: string;
  ref: string; // for easy reference in UI/URI
  title: string;
  email: string;
  organization: string;
  permissions: string;
  projects: Projects[] | null; // optional or install samples
}

//type Email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
