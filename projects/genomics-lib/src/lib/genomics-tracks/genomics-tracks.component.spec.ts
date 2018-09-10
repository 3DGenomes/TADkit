import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomicsTracksComponent } from './genomics-tracks.component';

describe('GenomicsTracksComponent', () => {
  let component: GenomicsTracksComponent;
  let fixture: ComponentFixture<GenomicsTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomicsTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomicsTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
