import { Type } from '@angular/core';
import { Observable } from 'rxjs';
export declare class Workspace {
    component: Type<any>;
    dataStream: Observable<any>;
    constructor(component: Type<any>, dataStream: Observable<any>);
}
