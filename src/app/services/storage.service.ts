/**
 * Storage Service for Angular Railway Reservation System
 * Encapsulates LocalStorage CRUD operations for persistence
 */
export class StorageService {
  private usersKey = 'railyatra_users_v1';
  private currentUserKey = 'railyatra_current_user_v1';
  private bookingsKey = 'railyatra_bookings_v1';
  private langKey = 'railyatra_selected_lang_v1';

  getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }

  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  getUsersKey(): string { return this.usersKey; }
  getCurrentUserKey(): string { return this.currentUserKey; }
  getBookingsKey(): string { return this.bookingsKey; }
  getLangKey(): string { return this.langKey; }
}
