import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosPage } from './medicos.page';

describe('MedicosPage', () => {
  let component: MedicosPage;
  let fixture: ComponentFixture<MedicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
