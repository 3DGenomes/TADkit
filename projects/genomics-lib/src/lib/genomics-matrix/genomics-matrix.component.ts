import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tk-genomics-matrix',
  templateUrl: './genomics-matrix.component.html',
  styleUrls: ['./genomics-matrix.component.css']
})
export class GenomicsMatrixComponent implements OnInit {
  @Input() dataStream: any;
  public data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }

}
