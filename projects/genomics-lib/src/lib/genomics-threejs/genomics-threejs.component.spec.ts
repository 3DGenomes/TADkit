import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomicsThreejsComponent } from './genomics-threejs.component';

describe('GenomicsThreeComponent', () => {
  let component: GenomicsThreejsComponent;
  let fixture: ComponentFixture<GenomicsThreejsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomicsThreejsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomicsThreejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
