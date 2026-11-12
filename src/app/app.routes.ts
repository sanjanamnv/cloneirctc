/**
 * Angular Application Route Definitions
 * Configures routes with Standalone Components and Route Guards
 */
export interface RouteConfig {
  path: string;
  componentName: string;
  title: string;
  canActivate?: string[];
  redirectTo?: string;
  pathMatch?: 'full' | 'prefix';
}

export const routes: RouteConfig[] = [
  { path: '', componentName: 'HomeComponent', title: 'RailYatra - Indian Railway Reservation Portal' },
  { path: 'train-search', componentName: 'TrainSearchComponent', title: 'Search Trains - RailYatra' },
  { path: 'train-availability', componentName: 'TrainAvailabilityComponent', title: 'Train Availability & Fares' },
  { path: 'booking', componentName: 'BookingComponent', title: 'Book Train Tickets', canActivate: ['authGuard'] },
  { path: 'booking-confirmation', componentName: 'BookingConfirmationComponent', title: 'Booking Confirmation', canActivate: ['authGuard'] },
  { path: 'my-bookings', componentName: 'MyBookingsComponent', title: 'My Bookings', canActivate: ['authGuard'] },
  { path: 'pnr-status', componentName: 'PnrStatusComponent', title: 'Check PNR Status' },
  { path: 'login', componentName: 'LoginComponent', title: 'Passenger Login', canActivate: ['guestGuard'] },
  { path: 'register', componentName: 'RegisterComponent', title: 'Passenger Registration', canActivate: ['guestGuard'] },
  { path: '**', componentName: 'HomeComponent', redirectTo: '', pathMatch: 'full', title: 'RailYatra' },
];
