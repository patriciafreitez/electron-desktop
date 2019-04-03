import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaPage } from './mensajeria.page';

describe('MensajeriaPage', () => {
  let component: MensajeriaPage;
  let fixture: ComponentFixture<MensajeriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
