// src/app/tab3/tab3.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Firestore, collection, addDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddProductModal} from './add-product-modal/add-product-modal.page';
import { AddCategoryModalPage } from './add-category-modal/add-category-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  isAuthenticated = false;
  userData: any = null;
  isAdmin = false;
  orders: any[] = [];

  // Form data
  newCategoryName = '';
  newProduct: any = {
    name: '',
    description: '',
    categoryId: '',
    price: 0,
    productId: 0,
    imageUrl: '',
    stock: 0,
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public router: Router,
    private firestore: Firestore,
    private alertController: AlertController ,
    public modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const user = this.authService.auth.currentUser;
      if (user && user.email) {
        const data = await this.authService.getUserDataByEmail(user.email);
        this.userData = data;
        this.isAdmin = data?.['role'] === 'admin';

        if (!this.isAdmin) {
          await this.loadUserOrders(user.email);
        }
      }
    }
  }

  async loadUserOrders(email: string) {
    const ordersRef = collection(this.firestore, 'orders');
    const q = await this.authService.getOrdersByEmail(email);
    this.orders = q;
  }

  async addCategory() {
    if (!this.newCategoryName.trim()) return;
    const categoriesRef = collection(this.firestore, 'categories');
    await addDoc(categoriesRef, { name: this.newCategoryName });
    this.newCategoryName = '';
    alert('Category added!');
  }

  async addProduct() {
    const productsRef = collection(this.firestore, 'products');
    await addDoc(productsRef, this.newProduct);
    this.newProduct = {
      name: '',
      description: '',
      categoryId: '',
      price: 0,
      productId: 0,
      imageUrl: '',
      stock: 0,
    };
    alert('Product added!');
  }

  navigateToLogin() {
    this.router.navigate(['/tabs/tab3/login']);
  }

  logout() {
    this.authService.auth.signOut();
    this.router.navigate(['']);
  }

  navigateToRegister() {
    this.router.navigate(['/tabs/tab3/register']);
  }  

  navigateToOrders() {
    this.router.navigate(['/tabs/tab3/admin-orders']);
  }  

  navigateToCustomers() {
    this.router.navigate(['/tabs/tab3/admin-customers']);
  }  


  async editDescription() {
    const alert = await this.alertController.create({
      header: 'Edit Description',
      inputs: [
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Write something about yourself...',
          value: this.userData?.description || ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async data => {
            const newDescription = data.description;
  
            // Find user document by email
            const usersRef = collection(this.firestore, 'users');
            const q = query(usersRef, where('email', '==', this.userData.email));
            const snapshot = await getDocs(q);
  
            if (!snapshot.empty) {
              const userDoc = snapshot.docs[0];
              const userRef = doc(this.firestore, 'users', userDoc.id);
  
              await updateDoc(userRef, {
                description: newDescription
              });
  
              // Update local state to reflect changes
              this.userData.description = newDescription;
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  async openProductModal() {
    const categoryRef = collection(this.firestore, 'categories');
    const snapshot = await getDocs(categoryRef);
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
    const modal = await this.modalCtrl.create({
      component: AddProductModal,
      componentProps: { categories },
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
  
    await modal.present();
  }
  

async openCategoryModal() {
  const modal = await this.modalCtrl.create({
    component: AddCategoryModalPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.4
  });

  await modal.present();
}
}
