import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient ,withInterceptors} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { productReducer } from './features/product/state/product.reducer';
import { ProductEffects } from './features/product/state/product.effects';
import { routes } from './app.routes';
import { authInterceptor } from './features/auth/interceptors/authInterceptors';
import { orderReducer } from './features/orders/state/order.reducer';
import { OrderEffects } from './features/orders/state/order.effects';
import { cartReducer } from './features/cart/state/cart.reducer';
import { CartEffects } from './features/cart/state/cart.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
provideHttpClient(
  withInterceptors([
    authInterceptor
  ])
),
    provideStore({
      products: productReducer,
      orders: orderReducer,
      cart:cartReducer
    }),

    provideEffects(
      ProductEffects,OrderEffects,CartEffects
    )
  ]
};