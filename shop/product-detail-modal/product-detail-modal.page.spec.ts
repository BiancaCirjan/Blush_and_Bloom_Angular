import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailModalPage } from './product-detail-modal.page';

describe('ProductDetailModalPage', () => {
  let component: ProductDetailModalPage;
  let fixture: ComponentFixture<ProductDetailModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
