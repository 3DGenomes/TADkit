import { Directive, OnInit, ElementRef, Output, EventEmitter, HostBinding, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Directive({
  selector: '[tkWidgetDragColHandle]',
  providers: [ { provide: DOCUMENT, useValue: document } ],
})
export class TkWidgetDragColDirective implements OnInit {

  @Output() DragStart = new EventEmitter();
  @Output() Drag = new EventEmitter();
  @Output() DragEnd = new EventEmitter();

  private dragging = false;

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    const el = this.elementRef.nativeElement;
    el.addEventListener('mousedown', (event) => {
      if (event.which === 1) {
        this.dragging = true;
        this.DragStart.emit({ originalEvent: event });
      }
    }, false);


    this.document.addEventListener('mouseup', (event) => {
      if (this.dragging) {
        this.DragEnd.emit({ originalEvent: event });
      }

      this.dragging = false;
    }, false);

    this.document.addEventListener('mousemove', (event) => {
      if (this.dragging) {
        this.Drag.emit({ originalEvent: event });
      }
    }, false);
  }
}
