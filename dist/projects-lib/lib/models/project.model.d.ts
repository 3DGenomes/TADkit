/**
 * Project: Class encapsulating all data within a TADkit project.
 */
import { Metadata } from './project-metadata.model';
export declare class Project {
    metadata: Metadata;
    uuid: string;
    ref: string;
    title: string;
    description: string;
    group: string;
    state: boolean;
    cellType: string;
    species: string;
    assembly: string;
}
export declare class Projects extends Array<Project> {
}
