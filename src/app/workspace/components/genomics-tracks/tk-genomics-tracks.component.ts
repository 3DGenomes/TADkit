import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tk-genomics-tracks',
  templateUrl: './tk-genomics-tracks.component.html'
})

export class TkGenomicsTracksComponent implements OnInit {
  @Input() dataStream: any;
  private data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }

}
