export type TravelClass = 'SL' | '3A' | '2A' | '1A';

export type QuotaType = 'GENERAL' | 'TATKAL' | 'LADIES' | 'SENIOR_CITIZEN';

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

export interface TrainSearchParams {
  fromStationCode: string;
  toStationCode: string;
  journeyDate: string;
  travelClass?: TravelClass | 'ALL';
  quota?: QuotaType;
}
