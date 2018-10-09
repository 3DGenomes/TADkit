import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'genomics-info',
  templateUrl: './genomics-info.component.html',
  styleUrls: ['./genomics-info.component.css']
})
export class GenomicsInfoComponent implements OnInit {
  @Input() dataStream: any;
  public data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }
}
