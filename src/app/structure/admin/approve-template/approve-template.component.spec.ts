import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTemplateComponent } from './approve-template.component';

describe('ApproveTemplateComponent', () => {
  let component: ApproveTemplateComponent;
  let fixture: ComponentFixture<ApproveTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
