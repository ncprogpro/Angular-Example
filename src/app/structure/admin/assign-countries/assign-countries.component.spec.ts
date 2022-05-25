import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCountriesComponent } from './assign-countries.component';

describe('AssignCountriesComponent', () => {
  let component: AssignCountriesComponent;
  let fixture: ComponentFixture<AssignCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
