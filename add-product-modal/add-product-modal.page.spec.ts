import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductModalPage } from './add-product-modal.page';

describe('AddProductModalPage', () => {
  let component: AddProductModalPage;
  let fixture: ComponentFixture<AddProductModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
