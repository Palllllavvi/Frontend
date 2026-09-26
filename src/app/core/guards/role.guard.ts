import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  const expectedRoles = (route.data?.['roles'] as string[]) || [];
  const userRole = authService.getUserRole();

  // If no specific roles required, allow access
  if (expectedRoles.length === 0) {
    return true;
  }

  // If role matches one of expected roles
  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  // Role not permitted: redirect to dashboard
  return router.createUrlTree(['/dashboard']);
};
