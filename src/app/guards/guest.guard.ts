import { AuthService } from '../services/auth.service';

/**
 * Angular Route Guard for Guest-Only Routes
 * Prevents authenticated passengers from accessing login/register needlessly
 */
export const guestGuard = (): boolean => {
  const authService = new AuthService();
  if (!authService.isLoggedIn()) {
    return true;
  }
  if (typeof window !== 'undefined') {
    window.location.href = '/my-bookings';
  }
  return false;
};
