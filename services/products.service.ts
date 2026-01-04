// src/app/services/products.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { inject } from '@angular/core';

export interface Product {
    id: string;           // Firestore document ID
    productId: number;
    name: string;
    description: string;
    categoryId: string;
    price: number;
    stock: number;
    imageUrl: string;
  }

@Injectable({
  providedIn: 'root',
})
  
export class ProductsService {
  private firestore = inject(Firestore);

  constructor() {}

  // Fetch product details by productId (searching in the products collection)
  async getProductById(productId: string | number) {
    const productsCollection = collection(this.firestore, 'products');
    const productQuery = query(productsCollection, where('productId', '==', productId));

    const querySnapshot = await getDocs(productQuery);
    if (!querySnapshot.empty) {
      // Return the first matching product
      return querySnapshot.docs[0].data();
    } else {
      console.log(`No product found with productId: ${productId}`);
      return null;  // Return null if product is not found
    }
  }

  // Fetch multiple products by their IDs
  async getProductsByProductId(productId: string | number) {
    const productsCollection = collection(this.firestore, 'products');
    const productQuery = query(productsCollection, where('productId', '==', productId));

    const querySnapshot = await getDocs(productQuery);
    return querySnapshot.docs.map(doc => doc.data());
  }

  // Fetch all categories from Firestore
  async getCategories() {
    const categoriesCollection = collection(this.firestore, 'categories');
    const categorySnapshot = await getDocs(categoriesCollection);
    return categorySnapshot.docs.map(doc => doc.data());
  }

  // Fetch products based on categoryId (if provided), else fetch all products
  async getProducts(categoryId: string | null = null) {
    const productsCollection = collection(this.firestore, 'products');
    let productQuery;

    if (categoryId) {
      productQuery = query(productsCollection, where('categoryId', '==', categoryId));  // Filter by categoryId
    } else {
      productQuery = query(productsCollection);  // No filtering, fetch all products
    }

    const productSnapshot = await getDocs(productQuery);
    return productSnapshot.docs.map(doc => doc.data());
  }

  async getAllProducts(): Promise<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<Product, 'id'>;
  
      return {
        id: doc.id,
        productId: data.productId,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
      };
    });
  }

  
}
