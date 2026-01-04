// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  // Get the cart from localStorage
  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Add a product to the cart
  addProductToCart(product: any) {
    const cart = this.getCart();
    const existingProduct = cart.find((item: any) => item.productId === product.productId);

    if (existingProduct) {
      existingProduct.quantity += 1;  // Increment quantity if product already exists
    } else {
      product.quantity = 1;  // Add new product with quantity 1
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Save updated cart to localStorage
  }

  // Remove a product from the cart
  removeProductFromCart(productId: string) {
    const cart = this.getCart();
    const updatedCart = cart.filter((item: any) => item.productId !== productId);  // Remove product
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save updated cart to localStorage
  }

  // Clear the entire cart
  clearCart() {
    localStorage.removeItem('cart');  // Remove cart from localStorage
  }
}
