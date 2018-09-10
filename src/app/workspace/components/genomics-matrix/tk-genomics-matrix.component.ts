import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tk-genomics-matrix',
  templateUrl: './tk-genomics-matrix.component.html'
})

export class TkGenomicsMatrixComponent implements OnInit {
  @Input() dataStream: any;
  private data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }

}
