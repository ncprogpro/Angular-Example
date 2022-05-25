import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagerSidebarComponent } from './category-manager-sidebar.component';

describe('CategoryManagerSidebarComponent', () => {
  let component: CategoryManagerSidebarComponent;
  let fixture: ComponentFixture<CategoryManagerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryManagerSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManagerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
