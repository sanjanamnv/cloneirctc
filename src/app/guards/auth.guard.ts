import { AuthService } from '../services/auth.service';

/**
 * Angular Route Guard for Protected Routes
 * Restricts access to authenticated passengers (Booking, My Bookings)
 */
export const authGuard = (): boolean => {
  const authService = new AuthService();
  if (authService.isLoggedIn()) {
    return true;
  }
  // Store return URL or redirect to login
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
  }
  return false;
};
