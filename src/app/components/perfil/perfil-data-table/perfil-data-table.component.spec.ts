import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDataTableComponent } from './perfil-data-table.component';

describe('PerfilDataTableComponent', () => {
  let component: PerfilDataTableComponent;
  let fixture: ComponentFixture<PerfilDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
