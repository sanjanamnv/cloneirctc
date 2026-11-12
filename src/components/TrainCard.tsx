import React, { useState } from 'react';
import { Clock, ArrowRight, ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import { Train, TravelClass, Language } from '../types';
import { Translations } from '../services/i18n';
import { L10nService } from '../services/l10n';

interface TrainCardProps {
  train: Train;
  selectedClass?: TravelClass;
  onBookClass: (train: Train, travelClass: TravelClass) => void;
  translations: Translations;
  currentLang: Language;
}

export const TrainCard: React.FC<TrainCardProps> = ({
  train,
  selectedClass: initialClass = '3A',
  onBookClass,
  translations: t,
  currentLang,
}) => {
  const [activeClass, setActiveClass] = useState<TravelClass>(initialClass);

  const classNames: Record<TravelClass, string> = {
    'SL': 'Sleeper (SL)',
    '3A': 'AC 3 Tier (3A)',
    '2A': 'AC 2 Tier (2A)',
    '1A': 'AC First Class (1A)',
  };

  const classList: TravelClass[] = ['SL', '3A', '2A', '1A'];
  const currentClassInfo = train.classes[activeClass];

  const getStatusBadge = (status: 'AVAILABLE' | 'RAC' | 'WL', text?: string) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>{text || t.availSeatsAvailable}</span>
          </span>
        );
      case 'RAC':
        return (
          <span className="text-amber-700 dark:text-amber-400 font-semibold text-xs flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{text || t.availRAC}</span>
          </span>
        );
      case 'WL':
      default:
        return (
          <span className="text-rose-700 dark:text-rose-400 font-semibold text-xs flex items-center gap-1">
            <span>{text || t.availWaitingList}</span>
          </span>
        );
    }
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between gap-5">
      {/* Header Info: Train Name & Running Days */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-blue-100 text-[#0f2d59] font-mono font-bold text-xs">
              #{train.number}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {train.name}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <span>{train.fromStationName} ({train.fromStationCode})</span>
            <span className="mx-1.5 text-slate-300">→</span>
            <span>{train.toStationName} ({train.toStationCode})</span>
            <span className="mx-2 text-slate-300">·</span>
            <span>{train.distanceKm} km</span>
          </p>
        </div>

        {/* Runs On Days */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">{t.availRunsOn}:</span>
          <div className="flex items-center gap-1">
            {daysOfWeek.map((day) => {
              const runs = train.runsOn.includes(day);
              return (
                <span
                  key={day}
                  className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    runs
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-400 opacity-50'
                  }`}
                  title={`${day}: ${runs ? 'Runs' : 'Does not run'}`}
                >
                  {day.charAt(0)}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timing Schedule Row */}
      <div className="grid grid-cols-3 items-center py-1 text-center bg-slate-50/70 rounded-xl p-3 border border-slate-100">
        {/* Departure */}
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
            {train.departureTime}
          </span>
          <p className="text-xs font-semibold text-slate-700 truncate">{train.fromStationCode}</p>
          <p className="text-[11px] text-slate-500 truncate">{train.fromStationName.split(' ')[0]}</p>
        </div>

        {/* Duration Track */}
        <div className="flex flex-col items-center justify-center px-2">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{train.duration}</span>
          </div>
          <div className="w-full flex items-center my-1.5">
            <div className="h-0.5 flex-1 bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#0f2d59] mx-1 shrink-0" />
            <div className="h-0.5 flex-1 bg-slate-300" />
          </div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Direct Superfast</span>
        </div>

        {/* Arrival */}
        <div className="text-right">
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
            {train.arrivalTime}
          </span>
          <p className="text-xs font-semibold text-slate-700 truncate">{train.toStationCode}</p>
          <p className="text-[11px] text-slate-500 truncate">{train.toStationName.split(' ')[0]}</p>
        </div>
      </div>

      {/* Travel Class Selection Boxes */}
      <div>
        <p className="text-xs font-medium text-slate-600 mb-2">
          Select Travel Class & Seat Availability:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {classList.map((cls) => {
            const classData = train.classes[cls];
            const isSelected = activeClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => setActiveClass(cls)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#0f2d59] bg-blue-50/70 shadow-sm ring-2 ring-[#0f2d59]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-sm ${isSelected ? 'text-[#0f2d59]' : 'text-slate-800'}`}>
                    {cls}
                  </span>
                  <span className="text-xs font-semibold text-slate-900">
                    {L10nService.formatCurrency(classData.fare, currentLang)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {classNames[cls]}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  {getStatusBadge(classData.status, classData.statusText)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Action Row: Selected Class Breakdown & Book Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Selected: <strong className="text-slate-900">{classNames[activeClass]}</strong> at{' '}
            <strong className="text-slate-900 font-mono">
              {L10nService.formatCurrency(currentClassInfo.fare, currentLang)}
            </strong> / passenger
          </span>
        </div>

        <button
          type="button"
          onClick={() => onBookClass(train, activeClass)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all shadow-sm"
        >
          <span>{t.availBookNow}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
