/**
 * User: Class for TADkit user and assicated projects.
 */
import { Metadata } from './project-metadata.model';
import { Projects } from './project.model';
export declare class User {
    metadata: Metadata;
    uuid: string;
    ref: string;
    title: string;
    email: string;
    organization: string;
    permissions: string;
    projects: Projects[] | null;
}
export declare class Users extends Array<User> {
}
