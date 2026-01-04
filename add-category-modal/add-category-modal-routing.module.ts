import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCategoryModalPage } from './add-category-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddCategoryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCategoryModalPageRoutingModule {}
