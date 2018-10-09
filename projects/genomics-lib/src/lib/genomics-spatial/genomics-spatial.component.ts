import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'genomics-spatial',
  templateUrl: './genomics-spatial.component.html',
  styleUrls: ['./genomics-spatial.component.css']
})
export class GenomicsSpatialComponent implements OnInit {
  @Input() dataStream: any;
  public data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }

}
