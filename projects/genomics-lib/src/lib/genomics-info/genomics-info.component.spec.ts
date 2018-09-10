import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomicsInfoComponent } from './genomics-info.component';

describe('GenomicsInfoComponent', () => {
  let component: GenomicsInfoComponent;
  let fixture: ComponentFixture<GenomicsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomicsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomicsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
