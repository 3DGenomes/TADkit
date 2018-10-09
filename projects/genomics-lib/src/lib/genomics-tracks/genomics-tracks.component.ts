import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'genomics-tracks',
  templateUrl: './genomics-tracks.component.html',
  styleUrls: ['./genomics-tracks.component.css']
})
export class GenomicsTracksComponent implements OnInit {
  @Input() dataStream: any;
  public data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }

}
