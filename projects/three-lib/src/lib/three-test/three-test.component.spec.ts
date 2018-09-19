import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeTestComponent } from './three-test.component';

describe('ThreeTestComponent', () => {
  let component: ThreeTestComponent;
  let fixture: ComponentFixture<ThreeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
