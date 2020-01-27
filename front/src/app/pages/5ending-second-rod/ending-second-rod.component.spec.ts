import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingSecondRodComponent } from './ending-second-rod.component';

describe('EndingSecondRodComponent', () => {
  let component: EndingSecondRodComponent;
  let fixture: ComponentFixture<EndingSecondRodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndingSecondRodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingSecondRodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
