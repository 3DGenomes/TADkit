import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export class Widget {
  constructor(
    public component: Type<any>,
    public dataStream: Observable<any>
  ) {}
}
