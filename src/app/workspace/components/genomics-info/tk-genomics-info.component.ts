import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tk-genomics-info',
  templateUrl: './tk-genomics-info.component.html'
})

export class TkGenomicsInfoComponent implements OnInit {
  @Input() dataStream: any;
  private data: any;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
  }

}
