import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoryModalPageRoutingModule } from './add-category-modal-routing.module';

import { AddCategoryModalPage } from './add-category-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCategoryModalPageRoutingModule
  ],
  declarations: [AddCategoryModalPage]
})
export class AddCategoryModalPageModule {}
