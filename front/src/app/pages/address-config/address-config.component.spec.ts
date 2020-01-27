import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressConfigComponent } from './address-config.component';

describe('AddressConfigComponent', () => {
  let component: AddressConfigComponent;
  let fixture: ComponentFixture<AddressConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
