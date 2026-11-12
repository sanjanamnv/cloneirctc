import { Language } from '../../types';
import { TRANSLATIONS, Translations } from '../../services/i18n';
import { L10nService } from '../../services/l10n';
import { StorageService } from './storage.service';

/**
 * Translation and Localization Service for Angular Railway Reservation System
 * Provides seamless runtime language switching (English, Telugu, Hindi) and localized formatting
 */
export class TranslationService {
  private storage = new StorageService();
  private currentLanguage: Language = 'en';

  constructor() {
    this.currentLanguage = this.storage.getItem<Language>(this.storage.getLangKey(), 'en');
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(lang: Language): void {
    if (lang === 'en' || lang === 'te' || lang === 'hi') {
      this.currentLanguage = lang;
      this.storage.setItem(this.storage.getLangKey(), lang);
    }
  }

  get(key: keyof Translations): string {
    const dict = TRANSLATIONS[this.currentLanguage] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || String(key);
  }

  getAll(): Translations {
    return TRANSLATIONS[this.currentLanguage] || TRANSLATIONS.en;
  }

  formatCurrency(amount: number): string {
    return L10nService.formatCurrency(amount, this.currentLanguage);
  }

  formatDate(date: string | Date): string {
    return L10nService.formatDate(date, this.currentLanguage);
  }

  formatDateWithDay(date: string | Date): string {
    return L10nService.formatDateWithDay(date, this.currentLanguage);
  }

  formatTime(time: string): string {
    return L10nService.formatTime(time, this.currentLanguage);
  }
}
