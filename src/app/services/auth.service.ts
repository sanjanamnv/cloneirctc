import { User, LoginCredentials } from '../models/user.model';
import { StorageService } from './storage.service';

/**
 * Authentication Service for Angular Railway Reservation System
 * Handles passenger registration, credential validation, session storage and logout
 */
export class AuthService {
  private storage = new StorageService();

  constructor() {
    this.seedDefaultUsers();
  }

  private seedDefaultUsers(): void {
    const existing = this.storage.getItem<User[]>(this.storage.getUsersKey(), []);
    if (existing.length === 0) {
      const demoUsers: User[] = [
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
      this.storage.setItem(this.storage.getUsersKey(), demoUsers);
    }
  }

  getUsers(): User[] {
    return this.storage.getItem<User[]>(this.storage.getUsersKey(), []);
  }

  getCurrentUser(): User | null {
    return this.storage.getItem<User | null>(this.storage.getCurrentUserKey(), null);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  register(userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const normalizedEmail = userData.email.toLowerCase().trim();

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'Email address already registered. Please login.' };
    }

    const newUser: User = {
      ...userData,
      email: normalizedEmail,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.storage.setItem(this.storage.getUsersKey(), users);
    return { success: true, message: 'Registration successful! Please login to continue.', user: newUser };
  }

  login(credentials: LoginCredentials): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === credentials.email.toLowerCase().trim() && u.password === credentials.password
    );

    if (!user) {
      return { success: false, message: 'Invalid email address or password. Please try again.' };
    }

    // Save active session in LocalStorage
    this.storage.setItem(this.storage.getCurrentUserKey(), user);
    return { success: true, message: 'Login successful! Welcome back.', user };
  }

  logout(): void {
    this.storage.removeItem(this.storage.getCurrentUserKey());
  }
}
