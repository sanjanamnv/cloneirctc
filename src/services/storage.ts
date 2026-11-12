import { User, Booking, Language } from '../types';
import { INITIAL_SEED_BOOKINGS } from './data';

const USERS_KEY = 'railyatra_users_v1';
const CURRENT_USER_KEY = 'railyatra_current_user_v1';
const BOOKINGS_KEY = 'railyatra_bookings_v1';
const LANG_KEY = 'railyatra_selected_lang_v1';

export class StorageService {
  private static init() {
    if (typeof window === 'undefined') return;

    // Initialize bookings if not present
    if (!localStorage.getItem(BOOKINGS_KEY)) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_SEED_BOOKINGS));
    }

    // Initialize default demo user if not present
    if (!localStorage.getItem(USERS_KEY)) {
      const defaultUsers: User[] = [
        {
          id: 'usr-1',
          fullName: 'Sanjana Rao',
          email: 'sanjana.mnv@gmail.com',
          mobile: '9876543210',
          password: 'Password@123',
          gender: 'Female',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'usr-2',
          fullName: 'Rahul Sharma',
          email: 'rahul.demo@railway.gov.in',
          mobile: '9123456780',
          password: 'Password@123',
          gender: 'Male',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  // Language
  static getLanguage(): Language {
    this.init();
    if (typeof window === 'undefined') return 'en';
    const lang = localStorage.getItem(LANG_KEY) as Language;
    return lang === 'te' || lang === 'hi' ? lang : 'en';
  }

  static setLanguage(lang: Language): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LANG_KEY, lang);
  }

  // Users
  static getUsers(): User[] {
    this.init();
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveUser(user: User): { success: boolean; message: string } {
    this.init();
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'Email already registered. Please sign in.' };
    }
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: 'Registration successful! You can now log in.' };
  }

  static authenticate(email: string, password: string): { success: boolean; user?: User; message: string } {
    this.init();
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (!user) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }
    this.setCurrentUser(user);
    return { success: true, user, message: 'Login successful!' };
  }

  static getCurrentUser(): User | null {
    this.init();
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: User | null): void {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  // Bookings
  static getAllBookings(): Booking[] {
    this.init();
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static getUserBookings(email: string): Booking[] {
    const all = this.getAllBookings();
    return all.filter(b => b.userEmail.toLowerCase() === email.toLowerCase());
  }

  static getBookingByPnr(pnr: string): Booking | null {
    const cleanPnr = pnr.replace(/[^0-9]/g, '');
    const all = this.getAllBookings();
    return all.find(b => b.pnr === cleanPnr) || null;
  }

  static saveBooking(booking: Booking): void {
    this.init();
    const all = this.getAllBookings();
    all.unshift(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
  }

  static cancelBooking(bookingId: string): { success: boolean; booking?: Booking; refundAmount?: number; message: string } {
    this.init();
    const all = this.getAllBookings();
    const index = all.findIndex(b => b.id === bookingId);
    if (index === -1) {
      return { success: false, message: 'Booking not found.' };
    }

    const booking = all[index];
    if (booking.status === 'CANCELLED') {
      return { success: false, message: 'This booking has already been cancelled.' };
    }

    // Cancellation charge formula based on Indian Railways policy:
    // Fixed fee of ₹120 per passenger or 10% whichever is higher, refunded rest.
    const cancellationFeePerPassenger = booking.travelClass === '1A' ? 240 : booking.travelClass === '2A' ? 200 : booking.travelClass === '3A' ? 180 : 120;
    const totalCancellationFee = Math.min(booking.totalFare, cancellationFeePerPassenger * booking.passengers.length);
    const refundAmount = Math.max(0, Math.round((booking.totalFare - totalCancellationFee) * 100) / 100);

    const updatedBooking: Booking = {
      ...booking,
      status: 'CANCELLED',
      cancellationDate: new Date().toISOString(),
      cancellationFee: totalCancellationFee,
      refundAmount: refundAmount,
      passengers: booking.passengers.map(p => ({
        ...p,
        status: 'CAN',
      })),
    };

    all[index] = updatedBooking;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));

    return {
      success: true,
      booking: updatedBooking,
      refundAmount,
      message: `Booking cancelled successfully. Refund of ₹${refundAmount.toFixed(2)} will be credited to source account within 3-5 business days.`,
    };
  }

  // Generate 10-digit authentic Indian Railways PNR
  static generatePNR(): string {
    const all = this.getAllBookings();
    let pnr = '';
    let isUnique = false;

    while (!isUnique) {
      // First digit 2, 4, 6, 8 (standard Indian Railways PNR zones: 2=CR/WR, 4=SCR/SR, 6=ER/SER, 8=NR)
      const zoneDigit = ['2', '4', '6', '8'][Math.floor(Math.random() * 4)];
      const random9Digits = Math.floor(100000000 + Math.random() * 900000000).toString();
      pnr = zoneDigit + random9Digits.substring(1);
      if (!all.some(b => b.pnr === pnr)) {
        isUnique = true;
      }
    }
    return pnr;
  }

  // Generate unique booking ID
  static generateBookingId(): string {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `BK-${random}`;
  }
}
