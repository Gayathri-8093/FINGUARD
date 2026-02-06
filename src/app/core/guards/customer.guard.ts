import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const CustomerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Not logged in → go to login
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Allow only CUSTOMER role
  if (auth.isInRole?.('CUSTOMER') || auth.hasAnyRole?.(['CUSTOMER'])) {
    return true;
  }

  // If logged in but wrong role → send to their home
  if (auth.isInRole?.('ADMIN')) { router.navigate(['/admin']); return false; }
  if (auth.isInRole?.('BANKER')) { router.navigate(['/banker']); return false; }

  router.navigate(['/not-found']);
  return false;
};
``