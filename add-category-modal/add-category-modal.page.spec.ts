import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryModalPage } from './add-category-modal.page';

describe('AddCategoryModalPage', () => {
  let component: AddCategoryModalPage;
  let fixture: ComponentFixture<AddCategoryModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
