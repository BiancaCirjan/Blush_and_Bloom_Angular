import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCustomersPage } from './admin-customers.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCustomersPageRoutingModule {}
