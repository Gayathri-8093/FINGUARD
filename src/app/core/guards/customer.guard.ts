import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const CustomerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (auth.isInRole?.('CUSTOMER') || auth.hasAnyRole?.(['CUSTOMER'])) {
    return true;
  }

  if (auth.isInRole?.('ADMIN')) { router.navigate(['/admin']); return false; }
  if (auth.isInRole?.('BANKER')) { router.navigate(['/banker']); return false; }

  router.navigate(['/not-found']);
  return false;
};
``