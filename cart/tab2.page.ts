import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where, doc, updateDoc, addDoc, Timestamp } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  cartItems: any[] = [];
  user: any = null;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private authService: AuthService,
    private firestore: Firestore,
    private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.user = this.auth.currentUser;
    await this.loadCartItems();  // Load cart items when the component is initialized
  }

  // Load product details from Firestore and merge with local storage
  async loadCartItems() {
    const cart = this.cartService.getCart();  // Get cart from localStorage
    const fullCartItems = [];

    if (cart.length === 0) {
      console.log("Cart is empty");
    }

    // Fetch product details from Firestore for each item in the cart
    for (const item of cart) {
      // Instead of getting a single product by ID, we will iterate the products collection to find the correct productId
      const products = await this.productsService.getProductsByProductId(item.productId); // Bulk fetch products

      const product = products.find(p => p['productId'] === item.productId);

      if (product) {
        fullCartItems.push({
          ...item,  // Keep the item data from localStorage
          ...product,  // Merge product data from Firestore (e.g., name, price, stock, description)
        });
      } else {
        console.error(`Product with productId: ${item.productId} not found in Firestore`);
      }
    }

    this.cartItems = fullCartItems;  // Update the cart items to the merged data
  }

  // Calculate the total price of the cart
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Checkout function
  async checkout() {
    if (!this.user) {
      alert('You must be logged in to checkout.');
      return;
    }

    // Fetch user data using email (using the email of the logged-in user)
    const userData = await this.authService.getUserDataByEmail(this.user.email); 
    if (!userData) {
      this.showToast('User data not found', 'danger');
      return;
    }

    // Check if the product exists and if stock is sufficient
    for (const item of this.cartItems) {
      // Fetch product details by iterating through the products collection
      const productsRef = collection(this.firestore, 'products');
      const productQuery = query(productsRef, where('productId', '==', item.productId));
      const querySnapshot = await getDocs(productQuery);

      if (querySnapshot.empty) {
        this.showToast(`Product "${item.name}" no longer exists`, 'danger');
        return;
      }

      const product = querySnapshot.docs[0].data();
      if (product && product['stock'] < item.quantity) {
        this.showToast(`"${item.name}" has only ${product['stock']} left in stock`, 'warning');
        return;
      }
    }

    // Update stock after successful purchase
    for (const item of this.cartItems) {
      const productsRef = collection(this.firestore, 'products');
      const productQuery = query(productsRef, where('productId', '==', item.productId));
      const querySnapshot = await getDocs(productQuery);

      if (!querySnapshot.empty) {
        const product = querySnapshot.docs[0].data();
        const newStock = product['stock'] - item.quantity;

        // Update the product stock in Firestore
        const productRef = doc(this.firestore, 'products', querySnapshot.docs[0].id);
        await updateDoc(productRef, { stock: newStock });
      }
    }

    // Create the order in the Firestore 'orders' collection
    const orderRef = collection(this.firestore, 'orders');
    await addDoc(orderRef, {
      customerId: this.user.uid,
      email: this.user.email,
      phone: userData['phoneNumber'],
      address: userData['homeAddress'],
      createdAt: Timestamp.now(),
      totalPrice: this.getTotalPrice(),
      items: this.cartItems.map(item => ({
        id: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });

    // Clear the cart after successful checkout
    this.cartService.clearCart();
    this.cartItems = [];

    this.showToast('Order placed successfully ✅', 'success');
    this.router.navigate(['/tabs/tab1']); 
  }

  // Show a toast notification
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  // Remove item from the cart
  removeFromCart(productId: string) {
    this.cartService.removeProductFromCart(productId);
    this.loadCartItems(); // Refresh the cart after removal
  }
}
