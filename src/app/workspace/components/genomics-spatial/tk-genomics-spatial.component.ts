import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tk-genomics-spatial',
  templateUrl: './tk-genomics-spatial.component.html'
})

export class TkGenomicsSpatialComponent implements OnInit {
  @Input() dataStream: any;
  private data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }

}
