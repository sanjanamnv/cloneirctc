import React from 'react';
import { X, Printer, Download, Train, ShieldCheck, QrCode } from 'lucide-react';
import { Booking, Language } from '../types';
import { Translations } from '../services/i18n';
import { L10nService } from '../services/l10n';

interface TicketModalProps {
  booking: Booking | null;
  onClose: () => void;
  translations: Translations;
  currentLang: Language;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  booking,
  onClose,
  translations: t,
  currentLang,
}) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(booking, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `IRCTC_Ticket_${booking.pnr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const isCancelled = booking.status === 'CANCELLED';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 text-slate-900 my-8">
        
        {/* Modal Header Controls (Hidden during print) */}
        <div className="no-print bg-[#0f2d59] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg tracking-tight">
              Indian Railways Electronic Reservation Slip (ERS)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download Ticket Data (JSON)"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Print E-Ticket"
            >
              <Printer className="w-4 h-4" />
              <span>{t.confirmPrintTicket}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close ticket modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Content Container */}
        <div className="p-6 sm:p-8 space-y-6 bg-white relative">
          
          {/* Watermark in background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
            <span className="text-7xl sm:text-9xl font-black text-slate-950 transform -rotate-12">
              IRCTC CLONE
            </span>
          </div>

          {/* Ticket Header & Emblem */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0f2d59]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0f2d59] text-amber-400 flex items-center justify-center shrink-0">
                <Train className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#0f2d59]">
                  INDIAN RAILWAYS / IRCTC
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  Electronic Reservation Slip (ERS) · Normal User
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className={`inline-block px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider ${
                isCancelled
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {isCancelled ? 'STATUS: CANCELLED' : 'STATUS: BOOKED / CONFIRMED'}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Booked On: {L10nService.formatDate(booking.bookingDate, currentLang)}
              </p>
            </div>
          </div>

          {/* Primary Key Block: PNR & Booking ID Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">{t.confirmPnr}</p>
              <p className="text-lg font-black font-mono tracking-wider text-[#0f2d59]">
                {booking.pnr}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">{t.confirmBookingId}</p>
              <p className="text-base font-bold font-mono text-slate-800">
                {booking.id}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Class & Quota</p>
              <p className="text-sm font-bold text-slate-800">
                {booking.travelClass} · {booking.quota}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Passenger Count</p>
              <p className="text-sm font-bold text-slate-800">
                {booking.passengers.length} Passenger{booking.passengers.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Train Schedule Grid */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase text-slate-700 flex items-center justify-between">
              <span>Train: #{booking.trainNumber} - {booking.trainName}</span>
              <span>Date: {L10nService.formatDateWithDay(booking.journeyDate, currentLang)}</span>
            </div>
            
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">From (Origin Station)</span>
                <p className="font-bold text-base text-slate-900">
                  {booking.fromStationName} ({booking.fromStationCode})
                </p>
                <p className="text-xs text-slate-600 font-mono">
                  Scheduled Departure: <strong>{booking.departureTime}</strong>
                </p>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase">To (Destination Station)</span>
                <p className="font-bold text-base text-slate-900">
                  {booking.toStationName} ({booking.toStationCode})
                </p>
                <p className="text-xs text-slate-600 font-mono">
                  Scheduled Arrival: <strong>{booking.arrivalTime}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Details Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Passenger Reservation Details
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Passenger Name</th>
                    <th className="p-3">Age / Gender</th>
                    <th className="p-3">Coach</th>
                    <th className="p-3">Berth / Seat</th>
                    <th className="p-3">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {booking.passengers.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 font-medium">
                      <td className="p-3 text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900">{p.name}</td>
                      <td className="p-3 text-slate-600">{p.age} Yrs / {p.gender}</td>
                      <td className="p-3 font-mono font-bold text-[#0f2d59]">{p.coach || 'B2'}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{p.seatNumber || (20 + idx)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isCancelled
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isCancelled ? 'CAN' : (p.status || 'CNF')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fare Summary & QR Code Block */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="sm:col-span-2 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <h4 className="font-bold uppercase text-slate-700 pb-1 border-b border-slate-100">
                Fare Breakdown (Indian Rupees)
              </h4>
              <div className="flex justify-between text-slate-600">
                <span>Base Ticket Fare:</span>
                <span className="font-mono">{L10nService.formatCurrency(booking.baseFare, currentLang)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (Goods & Services Tax 5%):</span>
                <span className="font-mono">{L10nService.formatCurrency(booking.gst, currentLang)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IRCTC Convenience Fee:</span>
                <span className="font-mono">{L10nService.formatCurrency(booking.convenienceFee, currentLang)}</span>
              </div>
              
              {isCancelled && (
                <>
                  <div className="flex justify-between text-rose-700 font-semibold pt-1 border-t border-slate-100">
                    <span>Clerkage / Cancellation Fee:</span>
                    <span className="font-mono">- {L10nService.formatCurrency(booking.cancellationFee || 120, currentLang)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Refund Credited to Source:</span>
                    <span className="font-mono">{L10nService.formatCurrency(booking.refundAmount || 0, currentLang)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount Paid:</span>
                <span className="font-mono text-base text-[#0f2d59]">
                  {L10nService.formatCurrency(booking.totalFare, currentLang)}
                </span>
              </div>
            </div>

            {/* Electronic QR & Verification */}
            <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/50">
              <QrCode className="w-20 h-20 text-slate-800 mb-2" />
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                PNR: {booking.pnr}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Scan for TTE On-Board Verification
              </p>
            </div>
          </div>

          {/* Academic Notice & Disclaimers */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center gap-1 font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Academic Simulation Notice</span>
            </p>
            <p>
              {t.confirmDisclaimer}
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="no-print bg-slate-100 px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Keep this Electronic Reservation Slip handy on mobile during your journey.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#1a3d73] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print E-Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
