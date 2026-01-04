import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.page.html',
  styleUrls: ['./add-product-modal.page.scss'],
  standalone: false
})
export class AddProductModal {
  @Input() categories: any[] = [];

  product = {
    name: '',
    description: '',
    categoryId: '',
    price: 0,
    imageUrl: '',
    stock: 0
  };

  constructor(
    private modalCtrl: ModalController,
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  close() {
    this.modalCtrl.dismiss(false);
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.product.imageUrl = file.name;
  
      // ❗ Warn the user to manually place the image in the assets folder
      this.alertCtrl.create({
        header: 'Reminder 📸',
        message: `Make sure to manually place "${file.name}" in the folder <strong>src/assets/products</strong> of your project.`,
        buttons: ['OK']
      }).then(alert => alert.present());
    }
  }
  
  async addProduct() {
    const { name, description, categoryId, price, imageUrl, stock } = this.product;
    if (!name || !description || !categoryId || price <= 0 || !imageUrl || stock < 0) {
      const alert = await this.alertCtrl.create({
        header: 'Missing Fields',
        message: 'All fields are required and must be valid.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    const productRef = collection(this.firestore, 'products');
    const snapshot = await getDocs(productRef);
    const maxId = Math.max(0, ...snapshot.docs.map(doc => doc.data()['productId'] || 0));
    const productId = maxId + 1;
  
    await addDoc(productRef, { ...this.product, productId });
  
    const success = await this.alertCtrl.create({
      header: 'Product Added!',
      message: 'Your product has been successfully added 🎉',
      buttons: ['OK']
    });
    await success.present();
  
    this.modalCtrl.dismiss(true);
  }
  
}
