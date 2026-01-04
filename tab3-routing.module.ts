import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    canActivate: [AuthGuard], 
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-product-modal',
    loadChildren: () => import('./add-product-modal/add-product-modal.module').then( m => m.AddProductModalPageModule)
  },
  {
    path: 'add-category-modal',
    loadChildren: () => import('./add-category-modal/add-category-modal.module').then( m => m.AddCategoryModalPageModule)
  },
  {
    path: 'admin-orders',
    loadChildren: () => import('./admin-orders/admin-orders.module').then( m => m.AdminOrdersPageModule)
  },
  {
    path: 'admin-customers',
    loadChildren: () => import('./admin-customers/admin-customers.module').then( m => m.AdminCustomersPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
