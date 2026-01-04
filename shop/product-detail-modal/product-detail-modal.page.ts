import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.page.html',
  styleUrls: ['./product-detail-modal.page.scss'],
  standalone: false
})
export class ProductDetailModalPage {

  @Input() product: any;

  constructor(
    private modalCtrl: ModalController,
    private cartService: CartService
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  addToCart() {
    this.cartService.addProductToCart(this.product);
    this.modalCtrl.dismiss('added');
  }

  

}
