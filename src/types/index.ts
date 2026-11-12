export type TravelClass = 'SL' | '3A' | '2A' | '1A';

export type QuotaType = 'GENERAL' | 'TATKAL' | 'LADIES' | 'SENIOR_CITIZEN';

export type BookingStatus = 'CONFIRMED' | 'CANCELLED';

export type Language = 'en' | 'te' | 'hi';

export interface Station {
  id: string;
  code: string;
  name: string;
  city: string;
  state: string;
}

export interface ClassAvailability {
  fare: number;
  availableSeats: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  statusText?: string;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  fromStationCode: string;
  toStationCode: string;
  fromStationName: string;
  toStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  runsOn: string[];
  classes: Record<TravelClass, ClassAvailability>;
}

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  berthPreference: 'No Preference' | 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window';
  seatNumber?: string;
  coach?: string;
  status?: string;
}

export interface Booking {
  id: string;
  pnr: string;
  trainNumber: string;
  trainName: string;
  fromStationCode: string;
  fromStationName: string;
  toStationCode: string;
  toStationName: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  travelClass: TravelClass;
  quota: QuotaType;
  passengers: Passenger[];
  baseFare: number;
  gst: number;
  convenienceFee: number;
  totalFare: number;
  bookingDate: string;
  status: BookingStatus;
  userEmail: string;
  userName: string;
  cancellationDate?: string;
  refundAmount?: number;
  cancellationFee?: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  gender: 'Male' | 'Female' | 'Other';
  createdAt: string;
}

export interface SearchQuery {
  fromStationCode: string;
  toStationCode: string;
  journeyDate: string;
  travelClass?: TravelClass | 'ALL';
  quota?: QuotaType;
}
