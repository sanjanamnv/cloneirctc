import React from 'react';
import { Train, ShieldCheck, PhoneCall, Mail, Heart, GraduationCap } from 'lucide-react';
import { Translations } from '../services/i18n';

interface FooterProps {
  translations: Translations;
  onNavigate: (tab: string) => void;
  onOpenAcademicHub: () => void;
}

export const Footer: React.FC<FooterProps> = ({ translations: t, onNavigate, onOpenAcademicHub }) => {
  return (
    <footer className="bg-[#0b1f3d] text-slate-300 pt-12 pb-8 border-t border-slate-800 no-print mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                <Train className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">{t.brandName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerAboutText}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t.footerSecurityText}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('search')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.navTrainSearch}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pnr')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.navPnrStatus}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bookings')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.navMyBookings}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAcademicHub} 
                  className="hover:text-amber-400 text-amber-300 font-medium transition-colors flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Angular Architecture & Docs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Passenger Helpline */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footerHelplineTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">24×7 Passenger Helpline: 139</p>
                  <p className="text-[11px]">PNR Enquiry, Train Timetable & Vigilance</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">care@railyatra.gov.in</p>
                  <p className="text-[11px]">e-Ticket Support & Cancellation Inquiries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack & University Academic Notice */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Academic Demonstration
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrates Angular Standalone architecture, Reactive Forms, Route Guards, LocalStorage persistence, and official XLIFF i18n/l10n with English, Telugu, and Hindi runtime switching.
            </p>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-[11px] text-amber-200/90 leading-normal">
              {t.footerAcademicNotice}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footerCopyright}</p>
          <p className="flex items-center gap-1">
            <span>Built with precision for academic review</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
