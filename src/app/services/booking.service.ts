import { Booking, BookingStatus } from '../models/booking.model';
import { Passenger } from '../models/passenger.model';
import { Train, TravelClass, QuotaType } from '../models/train.model';
import { StorageService } from './storage.service';

/**
 * Booking Service for Angular Railway Reservation System
 * Handles multi-passenger booking, PNR generation, cancellation refund policy, and persistence
 */
export class BookingService {
  private storage = new StorageService();

  constructor() {
    this.seedInitialBookings();
  }

  private seedInitialBookings(): void {
    const existing = this.storage.getItem<Booking[]>(this.storage.getBookingsKey(), []);
    if (existing.length === 0) {
      const demoBookings: Booking[] = [
        {
          id: 'BK-894210',
          pnr: '4528931047',
          trainNumber: '20833',
          trainName: 'Vande Bharat Express',
          fromStationCode: 'SC',
          fromStationName: 'Secunderabad Junction',
          toStationCode: 'VSKP',
          toStationName: 'Visakhapatnam Junction',
          journeyDate: '2026-11-20',
          departureTime: '15:00',
          arrivalTime: '23:30',
          travelClass: '3A',
          quota: 'GENERAL',
          passengers: [
            {
              id: 'p-1',
              name: 'Sanjana Rao',
              age: 23,
              gender: 'Female',
              berthPreference: 'Window',
              coach: 'C3',
              seatNumber: '24',
              status: 'CNF',
            },
            {
              id: 'p-2',
              name: 'Venkatesh Rao',
              age: 56,
              gender: 'Male',
              berthPreference: 'Lower',
              coach: 'C3',
              seatNumber: '25',
              status: 'CNF',
            },
          ],
          baseFare: 2700,
          gst: 135,
          convenienceFee: 17.7,
          totalFare: 2852.7,
          bookingDate: '2026-11-10T14:30:00.000Z',
          status: 'CONFIRMED',
          userEmail: 'sanjana.mnv@gmail.com',
          userName: 'Sanjana Rao',
        },
      ];
      this.storage.setItem(this.storage.getBookingsKey(), demoBookings);
    }
  }

  getAllBookings(): Booking[] {
    return this.storage.getItem<Booking[]>(this.storage.getBookingsKey(), []);
  }

  getUserBookings(userEmail: string): Booking[] {
    const all = this.getAllBookings();
    return all.filter(b => b.userEmail.toLowerCase() === userEmail.toLowerCase().trim());
  }

  getBookingByPnr(pnr: string): Booking | null {
    const clean = pnr.replace(/[^0-9]/g, '');
    const all = this.getAllBookings();
    return all.find(b => b.pnr === clean) || null;
  }

  generatePNR(): string {
    const all = this.getAllBookings();
    let pnr = '';
    let isUnique = false;
    while (!isUnique) {
      const zone = ['2', '4', '6', '8'][Math.floor(Math.random() * 4)];
      const rand = Math.floor(100000000 + Math.random() * 900000000).toString();
      pnr = zone + rand.substring(1);
      if (!all.some(b => b.pnr === pnr)) {
        isUnique = true;
      }
    }
    return pnr;
  }

  generateBookingId(): string {
    return `BK-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  createBooking(
    train: Train,
    journeyDate: string,
    travelClass: TravelClass,
    quota: QuotaType,
    passengers: Omit<Passenger, 'id' | 'seatNumber' | 'coach' | 'status'>[],
    userEmail: string,
    userName: string
  ): Booking {
    const pnr = this.generatePNR();
    const id = this.generateBookingId();

    const classFare = train.classes[travelClass]?.fare || 500;
    const baseFare = classFare * passengers.length;
    // GST 5% for AC classes, 0% for Sleeper
    const isAc = travelClass !== 'SL';
    const gst = isAc ? Math.round(baseFare * 0.05 * 100) / 100 : 0;
    const convenienceFee = 17.7; // ₹15 + 18% GST
    const totalFare = Math.round((baseFare + gst + convenienceFee) * 100) / 100;

    // Assign coach and seat numbers realistically
    const coachPrefix = travelClass === '1A' ? 'H1' : travelClass === '2A' ? 'A1' : travelClass === '3A' ? 'B2' : 'S3';
    const baseSeat = Math.floor(Math.random() * 50) + 1;

    const assignedPassengers: Passenger[] = passengers.map((p, idx) => ({
      ...p,
      id: `pax-${Date.now()}-${idx}`,
      coach: coachPrefix,
      seatNumber: `${baseSeat + idx}`,
      status: 'CNF',
    }));

    const newBooking: Booking = {
      id,
      pnr,
      trainNumber: train.number,
      trainName: train.name,
      fromStationCode: train.fromStationCode,
      fromStationName: train.fromStationName,
      toStationCode: train.toStationCode,
      toStationName: train.toStationName,
      journeyDate,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      travelClass,
      quota,
      passengers: assignedPassengers,
      baseFare,
      gst,
      convenienceFee,
      totalFare,
      bookingDate: new Date().toISOString(),
      status: 'CONFIRMED',
      userEmail,
      userName,
    };

    const all = this.getAllBookings();
    all.unshift(newBooking);
    this.storage.setItem(this.storage.getBookingsKey(), all);
    return newBooking;
  }

  cancelBooking(bookingId: string): { success: boolean; message: string; refundAmount?: number; booking?: Booking } {
    const all = this.getAllBookings();
    const idx = all.findIndex(b => b.id === bookingId);
    if (idx === -1) {
      return { success: false, message: 'Booking not found.' };
    }

    const booking = all[idx];
    if (booking.status === 'CANCELLED') {
      return { success: false, message: 'Booking is already cancelled.' };
    }

    // Cancellation charge per passenger (Indian Railways standard)
    const feePerPax = booking.travelClass === '1A' ? 240 : booking.travelClass === '2A' ? 200 : booking.travelClass === '3A' ? 180 : 120;
    const totalFee = Math.min(booking.totalFare, feePerPax * booking.passengers.length);
    const refundAmount = Math.max(0, Math.round((booking.totalFare - totalFee) * 100) / 100);

    const updated: Booking = {
      ...booking,
      status: 'CANCELLED',
      cancellationDate: new Date().toISOString(),
      cancellationFee: totalFee,
      refundAmount,
      passengers: booking.passengers.map(p => ({ ...p, status: 'CAN' })),
    };

    all[idx] = updated;
    this.storage.setItem(this.storage.getBookingsKey(), all);

    return {
      success: true,
      message: `Booking cancelled successfully. Refund of ₹${refundAmount.toFixed(2)} will be processed.`,
      refundAmount,
      booking: updated,
    };
  }
}
