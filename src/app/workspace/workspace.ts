import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export class Workspace {
  constructor(
    public component: Type<any>,
    public dataStream: Observable<any>
  ) {}
}
