import { PipeTransform } from '@angular/core';
export declare class Rad2DegPipe implements PipeTransform {
    /**
     * Converts radians to degrees
     * @param radians Radians
     */
    transform(radians: number): number;
}
