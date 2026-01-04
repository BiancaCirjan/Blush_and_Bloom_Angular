import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductModal } from './add-product-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductModal
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductModalPageRoutingModule {}
