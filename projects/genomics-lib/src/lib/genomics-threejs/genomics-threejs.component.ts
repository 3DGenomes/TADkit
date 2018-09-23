import { Component, Input, OnInit } from '@angular/core';
import * as ThreeWidgets from 'three-lib';

@Component({
  selector: 'genomics-threejs',
  templateUrl: './genomics-threejs.component.html',
  styleUrls: ['./genomics-threejs.component.css']
})
export class GenomicsThreejsComponent implements OnInit {
  @Input() dataStream: any;
  public data: any;
  public x = 20;
  public z = 20;
  public rotationX = 1;
  public rotationY = 2;
  public rotationZ = 3;
  public translationY = 0;

  constructor() { }

  public ngOnInit() {
    this.dataStream.subscribe(strm => this.data = strm);
    // console.log('ThreeWidgets: ', ThreeWidgets);
  }
}
