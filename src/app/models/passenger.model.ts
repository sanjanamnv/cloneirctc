export type BerthPreference = 'No Preference' | 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window';

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  berthPreference: BerthPreference;
  seatNumber?: string;
  coach?: string;
  status?: string;
}
