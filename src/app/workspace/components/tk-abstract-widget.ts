import { Observable } from 'rxjs';
import { Project } from '@projects/models/tk-project.model';

export abstract class TkAbstractWidget {
  constructor(private _name: string,
              private _data: Observable<Project>) {
  }

  get name(): string {
    return this._name;
  }

  get data(): Observable<Project> {
    return this._data;
  }

}
