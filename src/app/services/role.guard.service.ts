import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalService } from './globals.service';

export const roleGuard: CanActivateFn = (route, state) => {

  // Expecting the route data to have an array of permitted roles
  const expectedRoles = route.data['expectedRoles'];
  const router = inject(Router);
  const globalservice  = inject(GlobalService);

  // Retrieve the actual user role here (This is just an example assuming 'USER' role)
  // In real scenarios, you would get this information from a user service or authentication service.
  const userRole = 'ADMIN';

  // Check if the user role is within the expectedRoles array
  if (expectedRoles.includes(userRole)) {
    return true;
  } else {
    // Redirect unauthenticated users to the login page using UrlTree
    // return router.createUrlTree(['/home']);
    return false
  }
};
