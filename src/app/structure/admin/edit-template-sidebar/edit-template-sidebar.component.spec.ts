import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTemplateSidebarComponent } from './edit-template-sidebar.component';

describe('EditTemplateSidebarComponent', () => {
  let component: EditTemplateSidebarComponent;
  let fixture: ComponentFixture<EditTemplateSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTemplateSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTemplateSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
