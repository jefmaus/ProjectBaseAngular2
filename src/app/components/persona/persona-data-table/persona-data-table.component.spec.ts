import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaDataTableComponent } from './persona-data-table.component';

describe('PersonaDataTableComponent', () => {
  let component: PersonaDataTableComponent;
  let fixture: ComponentFixture<PersonaDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
