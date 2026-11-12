import { TravelClass, QuotaType } from './train.model';
import { Passenger } from './passenger.model';

export type BookingStatus = 'CONFIRMED' | 'CANCELLED';

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
