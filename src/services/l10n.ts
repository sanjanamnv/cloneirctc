import { Language } from '../types';

export class L10nService {
  private static getLocale(lang: Language): string {
    switch (lang) {
      case 'te':
        return 'te-IN';
      case 'hi':
        return 'hi-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  }

  // Format currency with Indian Rupee symbol and Indian numbering system (lakhs/crores)
  static formatCurrency(amount: number, lang: Language = 'en'): string {
    const locale = this.getLocale(lang);
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `₹${amount.toFixed(2)}`;
    }
  }

  // Format full date according to locale
  static formatDate(dateInput: string | Date, lang: Language = 'en'): string {
    if (!dateInput) return '';
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);

    const locale = this.getLocale(lang);
    try {
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return date.toLocaleDateString('en-IN');
    }
  }

  // Format full date with day of the week
  static formatDateWithDay(dateInput: string | Date, lang: Language = 'en'): string {
    if (!dateInput) return '';
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);

    const locale = this.getLocale(lang);
    try {
      return new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return date.toLocaleDateString('en-IN');
    }
  }

  // Format time (HH:MM or localized)
  static formatTime(timeStr: string, _lang: Language = 'en'): string {
    if (!timeStr) return '';
    const parts = timeStr.split(':');
    if (parts.length < 2) return timeStr;

    const hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }
}
