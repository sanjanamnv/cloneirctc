import React from 'react';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { Booking, Language } from '../types';
import { Translations } from '../services/i18n';
import { L10nService } from '../services/l10n';

interface CancelModalProps {
  booking: Booking | null;
  onClose: () => void;
  onConfirmCancel: (bookingId: string) => void;
  translations: Translations;
  currentLang: Language;
}

export const CancelModal: React.FC<CancelModalProps> = ({
  booking,
  onClose,
  onConfirmCancel,
  translations: t,
  currentLang,
}) => {
  if (!booking) return null;

  const cancellationFeePerPax = booking.travelClass === '1A' ? 240 : booking.travelClass === '2A' ? 200 : booking.travelClass === '3A' ? 180 : 120;
  const totalCancellationFee = Math.min(booking.totalFare, cancellationFeePerPax * booking.passengers.length);
  const estimatedRefund = Math.max(0, Math.round((booking.totalFare - totalCancellationFee) * 100) / 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-slate-900">
        {/* Header */}
        <div className="bg-rose-50 border-b border-rose-100 p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">
              {t.myBookingsCancelConfirmTitle}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.myBookingsCancelConfirmMsg}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Journey & Refund Breakdown */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-slate-500">Train & Route:</span>
              <span className="font-bold text-slate-900">
                #{booking.trainNumber} {booking.trainName}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-slate-500">PNR Number:</span>
              <span className="font-mono font-bold text-[#0f2d59]">{booking.pnr}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-slate-500">Journey Date:</span>
              <span className="font-bold text-slate-900">
                {L10nService.formatDate(booking.journeyDate, currentLang)}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-slate-500">Passengers:</span>
              <span className="font-bold text-slate-900">
                {booking.passengers.length} Passenger{booking.passengers.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Refund Calculation Table */}
          <div className="border border-slate-200 rounded-xl p-3.5 space-y-2 bg-white">
            <h4 className="font-bold uppercase text-[11px] text-slate-500">
              Refund Assessment
            </h4>
            <div className="flex justify-between text-slate-600">
              <span>Original Amount Paid:</span>
              <span className="font-mono font-semibold">
                {L10nService.formatCurrency(booking.totalFare, currentLang)}
              </span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Indian Railways Cancellation Clerkage:</span>
              <span className="font-mono font-semibold">
                - {L10nService.formatCurrency(totalCancellationFee, currentLang)}
              </span>
            </div>
            <div className="flex justify-between text-emerald-700 font-extrabold text-sm pt-2 border-t border-slate-100">
              <span>Net Refund to Source:</span>
              <span className="font-mono text-base">
                {L10nService.formatCurrency(estimatedRefund, currentLang)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-amber-50 border border-amber-200 p-2.5 rounded-lg">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Cancelled tickets cannot be reinstated. The booking status will be updated to CANCELLED in your records.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {t.myBookingsKeepBooking}
          </button>
          <button
            type="button"
            onClick={() => onConfirmCancel(booking.id)}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            {t.myBookingsCancelProceed}
          </button>
        </div>
      </div>
    </div>
  );
};
