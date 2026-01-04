import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCustomersPageRoutingModule } from './admin-customers-routing.module';

import { AdminCustomersPage } from './admin-customers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCustomersPageRoutingModule
  ],
  declarations: [AdminCustomersPage]
})
export class AdminCustomersPageModule {}
