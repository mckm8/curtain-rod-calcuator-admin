import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RodLengthComponent } from './rod-length.component';

describe('RodLengthComponent', () => {
  let component: RodLengthComponent;
  let fixture: ComponentFixture<RodLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RodLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RodLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
