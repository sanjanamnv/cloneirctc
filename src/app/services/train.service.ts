import { Station, Train, TrainSearchParams, TravelClass } from '../models/train.model';

/**
 * Train Service for Angular Railway Reservation System
 * Handles station queries, realistic train routes, timetable data, and seat availability filters
 */
export class TrainService {
  private stations: Station[] = [
    { id: '1', code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad', state: 'Telangana' },
    { id: '2', code: 'HYB', name: 'Hyderabad Deccan (Nampally)', city: 'Hyderabad', state: 'Telangana' },
    { id: '3', code: 'BZA', name: 'Vijayawada Junction', city: 'Vijayawada', state: 'Andhra Pradesh' },
    { id: '4', code: 'VSKP', name: 'Visakhapatnam Junction', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
    { id: '5', code: 'MAS', name: 'MGR Chennai Central', city: 'Chennai', state: 'Tamil Nadu' },
    { id: '6', code: 'SBC', name: 'KSR Bengaluru City Junction', city: 'Bengaluru', state: 'Karnataka' },
    { id: '7', code: 'NDLS', name: 'New Delhi Railway Station', city: 'New Delhi', state: 'Delhi' },
    { id: '8', code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra' },
    { id: '9', code: 'WL', name: 'Warangal Junction', city: 'Warangal', state: 'Telangana' },
    { id: '10', code: 'TPTY', name: 'Tirupati Main', city: 'Tirupati', state: 'Andhra Pradesh' },
    { id: '11', code: 'GNT', name: 'Guntur Junction', city: 'Guntur', state: 'Andhra Pradesh' },
    { id: '12', code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra' },
  ];

  private trains: Train[] = [
    {
      id: 'tr-20833',
      number: '20833',
      name: 'Vande Bharat Express',
      fromStationCode: 'SC',
      toStationCode: 'VSKP',
      fromStationName: 'Secunderabad Junction',
      toStationName: 'Visakhapatnam Junction',
      departureTime: '15:00',
      arrivalTime: '23:30',
      duration: '8h 30m',
      distanceKm: 699,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
      classes: {
        'SL': { fare: 650, availableSeats: 0, status: 'WL', statusText: 'WL 14' },
        '3A': { fare: 1350, availableSeats: 48, status: 'AVAILABLE', statusText: 'AVAILABLE 48' },
        '2A': { fare: 1980, availableSeats: 22, status: 'AVAILABLE', statusText: 'AVAILABLE 22' },
        '1A': { fare: 3150, availableSeats: 8, status: 'AVAILABLE', statusText: 'AVAILABLE 8' },
      },
    },
    {
      id: 'tr-20834',
      number: '20834',
      name: 'Vande Bharat Express',
      fromStationCode: 'VSKP',
      toStationCode: 'SC',
      fromStationName: 'Visakhapatnam Junction',
      toStationName: 'Secunderabad Junction',
      departureTime: '05:45',
      arrivalTime: '14:15',
      duration: '8h 30m',
      distanceKm: 699,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
      classes: {
        'SL': { fare: 650, availableSeats: 0, status: 'WL', statusText: 'WL 09' },
        '3A': { fare: 1350, availableSeats: 36, status: 'AVAILABLE', statusText: 'AVAILABLE 36' },
        '2A': { fare: 1980, availableSeats: 16, status: 'AVAILABLE', statusText: 'AVAILABLE 16' },
        '1A': { fare: 3150, availableSeats: 4, status: 'AVAILABLE', statusText: 'AVAILABLE 4' },
      },
    },
    {
      id: 'tr-12728',
      number: '12728',
      name: 'Godavari Superfast Express',
      fromStationCode: 'HYB',
      toStationCode: 'VSKP',
      fromStationName: 'Hyderabad Deccan',
      toStationName: 'Visakhapatnam Junction',
      departureTime: '17:05',
      arrivalTime: '05:45',
      duration: '12h 40m',
      distanceKm: 709,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: {
        'SL': { fare: 420, availableSeats: 112, status: 'AVAILABLE', statusText: 'AVAILABLE 112' },
        '3A': { fare: 1120, availableSeats: 28, status: 'AVAILABLE', statusText: 'AVAILABLE 28' },
        '2A': { fare: 1610, availableSeats: 14, status: 'AVAILABLE', statusText: 'AVAILABLE 14' },
        '1A': { fare: 2720, availableSeats: 6, status: 'AVAILABLE', statusText: 'AVAILABLE 6' },
      },
    },
    {
      id: 'tr-12727',
      number: '12727',
      name: 'Godavari Superfast Express',
      fromStationCode: 'VSKP',
      toStationCode: 'HYB',
      fromStationName: 'Visakhapatnam Junction',
      toStationName: 'Hyderabad Deccan',
      departureTime: '17:20',
      arrivalTime: '06:15',
      duration: '12h 55m',
      distanceKm: 709,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: {
        'SL': { fare: 420, availableSeats: 85, status: 'AVAILABLE', statusText: 'AVAILABLE 85' },
        '3A': { fare: 1120, availableSeats: 42, status: 'AVAILABLE', statusText: 'AVAILABLE 42' },
        '2A': { fare: 1610, availableSeats: 19, status: 'AVAILABLE', statusText: 'AVAILABLE 19' },
        '1A': { fare: 2720, availableSeats: 5, status: 'AVAILABLE', statusText: 'AVAILABLE 5' },
      },
    },
    {
      id: 'tr-12760',
      number: '12760',
      name: 'Charminar SF Express',
      fromStationCode: 'HYB',
      toStationCode: 'MAS',
      fromStationName: 'Hyderabad Deccan',
      toStationName: 'MGR Chennai Central',
      departureTime: '18:00',
      arrivalTime: '07:00',
      duration: '13h 00m',
      distanceKm: 790,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: {
        'SL': { fare: 440, availableSeats: 64, status: 'AVAILABLE', statusText: 'AVAILABLE 64' },
        '3A': { fare: 1180, availableSeats: 31, status: 'AVAILABLE', statusText: 'AVAILABLE 31' },
        '2A': { fare: 1690, availableSeats: 12, status: 'AVAILABLE', statusText: 'AVAILABLE 12' },
        '1A': { fare: 2850, availableSeats: 4, status: 'AVAILABLE', statusText: 'AVAILABLE 4' },
      },
    },
    {
      id: 'tr-12759',
      number: '12759',
      name: 'Charminar SF Express',
      fromStationCode: 'MAS',
      toStationCode: 'HYB',
      fromStationName: 'MGR Chennai Central',
      toStationName: 'Hyderabad Deccan',
      departureTime: '17:30',
      arrivalTime: '06:35',
      duration: '13h 05m',
      distanceKm: 790,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: {
        'SL': { fare: 440, availableSeats: 55, status: 'AVAILABLE', statusText: 'AVAILABLE 55' },
        '3A': { fare: 1180, availableSeats: 26, status: 'AVAILABLE', statusText: 'AVAILABLE 26' },
        '2A': { fare: 1690, availableSeats: 15, status: 'AVAILABLE', statusText: 'AVAILABLE 15' },
        '1A': { fare: 2850, availableSeats: 3, status: 'AVAILABLE', statusText: 'AVAILABLE 3' },
      },
    },
    {
      id: 'tr-12723',
      number: '12723',
      name: 'Telangana Superfast Express',
      fromStationCode: 'HYB',
      toStationCode: 'NDLS',
      fromStationName: 'Hyderabad Deccan',
      toStationName: 'New Delhi Railway Station',
      departureTime: '06:00',
      arrivalTime: '07:40',
      duration: '25h 40m',
      distanceKm: 1677,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: {
        'SL': { fare: 710, availableSeats: 140, status: 'AVAILABLE', statusText: 'AVAILABLE 140' },
        '3A': { fare: 1890, availableSeats: 52, status: 'AVAILABLE', statusText: 'AVAILABLE 52' },
        '2A': { fare: 2740, availableSeats: 24, status: 'AVAILABLE', statusText: 'AVAILABLE 24' },
        '1A': { fare: 4680, availableSeats: 7, status: 'AVAILABLE', statusText: 'AVAILABLE 7' },
      },
    },
    {
      id: 'tr-12437',
      number: '12437',
      name: 'Secunderabad Rajdhani Express',
      fromStationCode: 'SC',
      toStationCode: 'NDLS',
      fromStationName: 'Secunderabad Junction',
      toStationName: 'New Delhi Railway Station',
      departureTime: '12:45',
      arrivalTime: '10:30',
      duration: '21h 45m',
      distanceKm: 1667,
      runsOn: ['Wed', 'Sun'],
      classes: {
        'SL': { fare: 1150, availableSeats: 0, status: 'WL', statusText: 'NO SL COACH' },
        '3A': { fare: 2890, availableSeats: 38, status: 'AVAILABLE', statusText: 'AVAILABLE 38' },
        '2A': { fare: 4120, availableSeats: 18, status: 'AVAILABLE', statusText: 'AVAILABLE 18' },
        '1A': { fare: 5750, availableSeats: 6, status: 'AVAILABLE', statusText: 'AVAILABLE 6' },
      },
    },
    {
      id: 'tr-12711',
      number: '12711',
      name: 'Pinakini SF Express',
      fromStationCode: 'BZA',
      toStationCode: 'MAS',
      fromStationName: 'Vijayawada Junction',
      toStationName: 'MGR Chennai Central',
      departureTime: '06:10',
      arrivalTime: '13:05',
      duration: '6h 55m',
      distanceKm: 431,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: {
        'SL': { fare: 285, availableSeats: 160, status: 'AVAILABLE', statusText: 'AVAILABLE 160' },
        '3A': { fare: 760, availableSeats: 44, status: 'AVAILABLE', statusText: 'AVAILABLE 44' },
        '2A': { fare: 1090, availableSeats: 20, status: 'AVAILABLE', statusText: 'AVAILABLE 20' },
        '1A': { fare: 1820, availableSeats: 4, status: 'AVAILABLE', statusText: 'AVAILABLE 4' },
      },
    },
    {
      id: 'tr-12797',
      number: '12797',
      name: 'Venkatadri SF Express',
      fromStationCode: 'SC',
      toStationCode: 'TPTY',
      fromStationName: 'Secunderabad Junction',
      toStationName: 'Tirupati Main',
      departureTime: '20:05',
      arrivalTime: '07:05',
      duration: '11h 00m',
      distanceKm: 627,
      runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: {
        'SL': { fare: 385, availableSeats: 92, status: 'AVAILABLE', statusText: 'AVAILABLE 92' },
        '3A': { fare: 1025, availableSeats: 34, status: 'AVAILABLE', statusText: 'AVAILABLE 34' },
        '2A': { fare: 1470, availableSeats: 16, status: 'AVAILABLE', statusText: 'AVAILABLE 16' },
        '1A': { fare: 2460, availableSeats: 5, status: 'AVAILABLE', statusText: 'AVAILABLE 5' },
      },
    },
  ];

  getStations(): Station[] {
    return [...this.stations];
  }

  getStationByCode(code: string): Station | undefined {
    return this.stations.find(s => s.code === code);
  }

  getAllTrains(): Train[] {
    return [...this.trains];
  }

  getTrainByNumber(number: string): Train | undefined {
    return this.trains.find(t => t.number === number);
  }

  searchTrains(params: TrainSearchParams): Train[] {
    const from = params.fromStationCode.trim().toUpperCase();
    const to = params.toStationCode.trim().toUpperCase();

    // Check direct matching trains
    let matched = this.trains.filter(t => t.fromStationCode === from && t.toStationCode === to);

    // If no direct trains, check if stations can map via major junction (e.g. HYB and SC are twin cities)
    if (matched.length === 0) {
      if ((from === 'HYB' || from === 'SC') && (to === 'VSKP' || to === 'MAS' || to === 'NDLS' || to === 'TPTY')) {
        matched = this.trains.filter(t => (t.fromStationCode === 'HYB' || t.fromStationCode === 'SC') && t.toStationCode === to);
      }
    }

    return matched;
  }
}
