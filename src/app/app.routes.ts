import { Routes } from '@angular/router';

import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { ProductList } from './features/product/components/product-list/product-list';
import { ProductForm } from './features/product/components/product-form/product-form';
import { OrderList } from './features/orders/components/order-list/order-list';
import { CustomerList } from './features/customers/components/customer-list/customer-list';
import { Profile } from './features/profile/profile';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
  path: 'products',
  component: ProductList
},
{
  path: 'products/new',
  component: ProductForm
},
{
  path: 'products/edit/:id',
  component: ProductForm
},
{
  path: 'products/new',
  component: ProductForm
},
{
  path: 'products/edit/:id',
  component: ProductForm
},
{
  path: 'orders',
  component: OrderList
},
{
  path: 'customers',
  component: CustomerList
},
{
  path: 'profile',
  component :Profile
}
];