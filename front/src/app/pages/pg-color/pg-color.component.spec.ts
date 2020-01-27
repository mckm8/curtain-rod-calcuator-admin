import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgColorComponent } from './pg-color.component';

describe('PgColorComponent', () => {
  let component: PgColorComponent;
  let fixture: ComponentFixture<PgColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
