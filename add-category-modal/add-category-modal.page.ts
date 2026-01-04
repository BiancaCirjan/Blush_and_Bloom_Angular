import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.page.html',
  styleUrls: ['./add-category-modal.page.scss'],
  standalone: false
})
export class AddCategoryModalPage {
  categoryName = '';

  constructor(
    private modalCtrl: ModalController,
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  async addCategory() {
    if (!this.categoryName.trim()) {
      const alert = await this.alertCtrl.create({
        header: 'Missing Field',
        message: 'Please enter a category name.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    await addDoc(collection(this.firestore, 'categories'), {
      name: this.categoryName.trim()
    });

    const success = await this.alertCtrl.create({
      header: 'Category Added',
      message: `The category "${this.categoryName}" was created successfully 🎉`,
      buttons: ['OK']
    });
    await success.present();

    this.modalCtrl.dismiss(true);
  }

  close() {
    this.modalCtrl.dismiss(false);
  }

}
