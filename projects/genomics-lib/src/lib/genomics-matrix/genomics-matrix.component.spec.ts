import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomicsMatrixComponent } from './genomics-matrix.component';

describe('GenomicsMatrixComponent', () => {
  let component: GenomicsMatrixComponent;
  let fixture: ComponentFixture<GenomicsMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomicsMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomicsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
