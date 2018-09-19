import { PipeTransform } from '@angular/core';
export declare class Deg2RadPipe implements PipeTransform {
    /**
     * Converts degrees to radians
     * @param degree Degrees
     */
    transform(degrees: number): number;
}
