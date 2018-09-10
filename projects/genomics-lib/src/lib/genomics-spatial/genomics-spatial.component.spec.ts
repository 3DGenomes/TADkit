import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomicsSpatialComponent } from './genomics-spatial.component';

describe('GenomicsSpatialComponent', () => {
  let component: GenomicsSpatialComponent;
  let fixture: ComponentFixture<GenomicsSpatialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomicsSpatialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomicsSpatialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
