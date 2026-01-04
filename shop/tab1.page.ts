// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductDetailModalPage } from './product-detail-modal/product-detail-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  categories: any[] = [];
  products: any[] = [];
  selectedCategory: string | null = null;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    // Fetch categories from Firestore
    this.categories = await this.productsService.getCategories();

    // Fetch all products initially (before category selection)
    this.products = await this.productsService.getProducts();
  }

  // Add product to the cart
  async addToCart(product: any) {
    // Adding product to the cart (localStorage)
    this.cartService.addProductToCart(product);

    // Show a success toast after adding the product to the cart
    const toast = await this.toastController.create({
      message: `${product.name} added to cart 🛒`,
      duration: 2000,
      color: 'success',  // Green toast color
    });
    await toast.present();
  }

  // Method to filter products based on selected category
  async onCategoryChange(event: any) {
    const selectedCategoryId = event.detail.value;
    this.selectedCategory = selectedCategoryId;

    if (selectedCategoryId) {
      // Fetch products filtered by category
      this.products = await this.productsService.getProducts(selectedCategoryId);
    } else {
      // Fetch all products if no category is selected
      this.products = await this.productsService.getProducts();
    }
  }

  async openProductModal(product: any) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailModalPage,
      componentProps: { product },
    });
  
    await modal.present();
  }
}
