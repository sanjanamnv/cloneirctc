import React, { useState, useEffect, useMemo } from 'react';
import { 
  Train as TrainIcon, 
  Search, 
  ArrowLeftRight, 
  Calendar, 
  MapPin, 
  Filter, 
  UserPlus, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Ticket, 
  Printer, 
  Copy, 
  Check, 
  Zap, 
  Clock, 
  CreditCard,
  UserCheck,
  ChevronRight,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { 
  Station, 
  Train, 
  TravelClass, 
  QuotaType, 
  Booking, 
  Passenger, 
  User, 
  Language 
} from './types';
import { STATIONS, SAMPLE_TRAINS } from './services/data';
import { StorageService } from './services/storage';
import { TRANSLATIONS } from './services/i18n';
import { L10nService } from './services/l10n';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TrainCard } from './components/TrainCard';
import { TicketModal } from './components/TicketModal';
import { CancelModal } from './components/CancelModal';
import { AcademicHubModal } from './components/AcademicHubModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Global & Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [academicHubOpen, setAcademicHubOpen] = useState<boolean>(false);

  // Train Search Form State
  const [fromStation, setFromStation] = useState<string>('SC');
  const [toStation, setToStation] = useState<string>('VSKP');
  const [journeyDate, setJourneyDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedClassFilter, setSelectedClassFilter] = useState<TravelClass | 'ALL'>('ALL');
  const [selectedQuota, setSelectedQuota] = useState<QuotaType>('GENERAL');
  const [sortBy, setSortBy] = useState<'departure' | 'fare' | 'duration'>('departure');
  const [searchValidationMsg, setSearchValidationMsg] = useState<string>('');

  // Booking Flow State
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedClass, setSelectedClass] = useState<TravelClass>('3A');
  const [bookingPassengers, setBookingPassengers] = useState<Omit<Passenger, 'id' | 'seatNumber' | 'coach' | 'status'>[]>([
    {
      name: '',
      age: 28,
      gender: 'Male',
      berthPreference: 'No Preference',
    },
  ]);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [bookingError, setBookingError] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // My Bookings & Modals
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [bookingsFilter, setBookingsFilter] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [ticketModalBooking, setTicketModalBooking] = useState<Booking | null>(null);
  const [cancelTargetBooking, setCancelTargetBooking] = useState<Booking | null>(null);

  // PNR Search State
  const [pnrInput, setPnrInput] = useState<string>('');
  const [pnrResult, setPnrResult] = useState<Booking | null>(null);
  const [pnrError, setPnrError] = useState<string>('');
  const [pnrSearched, setPnrSearched] = useState<boolean>(false);

  // Auth Forms State
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [returnUrl, setReturnUrl] = useState<string>('');

  const [registerName, setRegisterName] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerMobile, setRegisterMobile] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState<string>('');
  const [registerGender, setRegisterGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [registerError, setRegisterError] = useState<string>('');

  const [copiedPnr, setCopiedPnr] = useState<boolean>(false);

  // Load language and user session on mount
  useEffect(() => {
    const savedLang = StorageService.getLanguage();
    setCurrentLang(savedLang);

    const activeUser = StorageService.getCurrentUser();
    if (activeUser) {
      setCurrentUser(activeUser);
      setUserBookings(StorageService.getUserBookings(activeUser.email));
    }
  }, []);

  const t = useMemo(() => {
    return TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  }, [currentLang]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    StorageService.setLanguage(lang);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      message: lang === 'te' 
        ? 'భాష తెలుగుకు మార్చబడింది' 
        : lang === 'hi' 
        ? 'भाषा हिन्दी में परिवर्तित की गई' 
        : 'Language switched to English',
    });
  };

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    setCurrentUser(null);
    setUserBookings([]);
    if (currentTab === 'bookings' || currentTab === 'booking') {
      setCurrentTab('home');
    }
    setToast({
      id: Date.now().toString(),
      type: 'info',
      message: 'You have been logged out successfully.',
    });
  };

  // Station Swapping Logic
  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
    setSearchValidationMsg('');
  };

  // Search Trains
  const handleSearchTrains = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fromStation || !toStation) {
      setSearchValidationMsg(t.searchSelectBothError);
      return;
    }
    if (fromStation === toStation) {
      setSearchValidationMsg(t.searchSameStationError);
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (journeyDate < today) {
      setSearchValidationMsg(t.searchPastDateError);
      return;
    }

    setSearchValidationMsg('');
    setCurrentTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter & Sort Matching Trains
  const matchingTrains = useMemo(() => {
    const results = SAMPLE_TRAINS.filter(train => {
      // Check direct route
      const directMatch = train.fromStationCode === fromStation && train.toStationCode === toStation;
      if (directMatch) return true;

      // Check twin city connections (HYB / SC)
      const isTwinOrigin = (fromStation === 'HYB' && train.fromStationCode === 'SC') || (fromStation === 'SC' && train.fromStationCode === 'HYB');
      if (isTwinOrigin && train.toStationCode === toStation) return true;

      return false;
    });

    // Class filter
    const classFiltered = selectedClassFilter === 'ALL'
      ? results
      : results.filter(t => t.classes[selectedClassFilter]);

    // Sorting
    return classFiltered.sort((a, b) => {
      if (sortBy === 'fare') {
        const fareA = a.classes[selectedClassFilter === 'ALL' ? 'SL' : selectedClassFilter]?.fare || 9999;
        const fareB = b.classes[selectedClassFilter === 'ALL' ? 'SL' : selectedClassFilter]?.fare || 9999;
        return fareA - fareB;
      }
      if (sortBy === 'duration') {
        return a.distanceKm - b.distanceKm;
      }
      // default departure
      return a.departureTime.localeCompare(b.departureTime);
    });
  }, [fromStation, toStation, selectedClassFilter, sortBy]);

  // Initiate Booking from Train Card
  const handleBookClass = (train: Train, travelClass: TravelClass) => {
    setSelectedTrain(train);
    setSelectedClass(travelClass);

    // Route Guard: Authentication check
    if (!currentUser) {
      setToast({
        id: Date.now().toString(),
        type: 'info',
        message: 'Please sign in or register to complete your ticket reservation.',
      });
      setReturnUrl('booking');
      setCurrentTab('login');
      return;
    }

    // Set first passenger as user name if empty
    setBookingPassengers([
      {
        name: currentUser.fullName,
        age: 28,
        gender: currentUser.gender,
        berthPreference: 'No Preference',
      },
    ]);
    setBookingError('');
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Passenger Array Handlers
  const handleAddPassenger = () => {
    if (bookingPassengers.length >= 6) return;
    setBookingPassengers([
      ...bookingPassengers,
      {
        name: '',
        age: 25,
        gender: 'Male',
        berthPreference: 'No Preference',
      },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (bookingPassengers.length <= 1) return;
    setBookingPassengers(bookingPassengers.filter((_, i) => i !== index));
  };

  const handleUpdatePassenger = (index: number, field: string, value: any) => {
    const updated = [...bookingPassengers];
    updated[index] = { ...updated[index], [field]: value };
    setBookingPassengers(updated);
  };

  // Calculated Fares
  const fareCalculations = useMemo(() => {
    if (!selectedTrain) return { baseFare: 0, gst: 0, convenienceFee: 17.7, totalFare: 0 };
    const classRate = selectedTrain.classes[selectedClass]?.fare || 500;
    const base = classRate * bookingPassengers.length;
    const gstRate = selectedClass !== 'SL' ? 0.05 : 0;
    const gst = Math.round(base * gstRate * 100) / 100;
    const convenienceFee = 17.7;
    const total = Math.round((base + gst + convenienceFee) * 100) / 100;
    return { baseFare: base, gst, convenienceFee, totalFare: total };
  }, [selectedTrain, selectedClass, bookingPassengers.length]);

  // Submit Booking
  const handleConfirmBooking = () => {
    if (!currentUser || !selectedTrain) return;

    // Validate passengers
    for (let i = 0; i < bookingPassengers.length; i++) {
      const p = bookingPassengers[i];
      if (!p.name || p.name.trim().length < 2) {
        setBookingError(`Please provide a valid full name for Passenger #${i + 1}.`);
        return;
      }
      if (!p.age || p.age < 1 || p.age > 125) {
        setBookingError(`Please provide a valid age (1-125) for Passenger #${i + 1}.`);
        return;
      }
    }

    if (!agreeTerms) {
      setBookingError('Please agree to the railway reservation guidelines to proceed.');
      return;
    }

    setBookingError('');

    // Generate real 10-digit PNR and unique booking record
    const pnr = StorageService.generatePNR();
    const bookingId = StorageService.generateBookingId();
    const coachPrefix = selectedClass === '1A' ? 'H1' : selectedClass === '2A' ? 'A1' : selectedClass === '3A' ? 'B2' : 'S3';
    const baseSeat = Math.floor(Math.random() * 50) + 1;

    const assignedPassengers: Passenger[] = bookingPassengers.map((p, idx) => ({
      ...p,
      id: `pax-${Date.now()}-${idx}`,
      coach: coachPrefix,
      seatNumber: `${baseSeat + idx}`,
      status: 'CNF',
    }));

    const newBooking: Booking = {
      id: bookingId,
      pnr,
      trainNumber: selectedTrain.number,
      trainName: selectedTrain.name,
      fromStationCode: selectedTrain.fromStationCode,
      fromStationName: selectedTrain.fromStationName,
      toStationCode: selectedTrain.toStationCode,
      toStationName: selectedTrain.toStationName,
      journeyDate,
      departureTime: selectedTrain.departureTime,
      arrivalTime: selectedTrain.arrivalTime,
      travelClass: selectedClass,
      quota: selectedQuota,
      passengers: assignedPassengers,
      baseFare: fareCalculations.baseFare,
      gst: fareCalculations.gst,
      convenienceFee: fareCalculations.convenienceFee,
      totalFare: fareCalculations.totalFare,
      bookingDate: new Date().toISOString(),
      status: 'CONFIRMED',
      userEmail: currentUser.email,
      userName: currentUser.fullName,
    };

    StorageService.saveBooking(newBooking);
    setUserBookings(StorageService.getUserBookings(currentUser.email));
    setConfirmedBooking(newBooking);
    setCurrentTab('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setToast({
      id: Date.now().toString(),
      type: 'success',
      message: `Booking Confirmed! PNR #${pnr} allocated.`,
    });
  };

  // Cancellation Execution
  const handleCancelBooking = (bookingId: string) => {
    const res = StorageService.cancelBooking(bookingId);
    if (res.success && currentUser) {
      setUserBookings(StorageService.getUserBookings(currentUser.email));
      setCancelTargetBooking(null);
      setToast({
        id: Date.now().toString(),
        type: 'success',
        message: res.message,
      });
      if (pnrResult && pnrResult.id === bookingId) {
        setPnrResult(StorageService.getBookingByPnr(pnrResult.pnr));
      }
    } else {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        message: res.message,
      });
    }
  };

  // PNR Search Execution
  const handlePnrSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = pnrInput.replace(/[^0-9]/g, '');
    if (clean.length !== 10) {
      setPnrError(t.pnrInvalidError);
      setPnrResult(null);
      setPnrSearched(true);
      return;
    }

    setPnrError('');
    const found = StorageService.getBookingByPnr(clean);
    setPnrResult(found);
    setPnrSearched(true);

    if (!found) {
      setPnrError(t.pnrNotFoundError);
    }
  };

  // Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError(t.authFillAllFields);
      return;
    }

    const res = StorageService.authenticate(loginEmail, loginPassword);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setUserBookings(StorageService.getUserBookings(res.user.email));
      setLoginError('');
      setToast({
        id: Date.now().toString(),
        type: 'success',
        message: `Welcome back, ${res.user.fullName}!`,
      });

      if (returnUrl === 'booking' && selectedTrain) {
        setCurrentTab('booking');
        setReturnUrl('');
      } else {
        setCurrentTab('bookings');
      }
    } else {
      setLoginError(res.message);
    }
  };

  // Registration Handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerMobile || !registerPassword || !registerConfirmPassword) {
      setRegisterError(t.authFillAllFields);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setRegisterError(t.authInvalidEmail);
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(registerMobile.replace(/\s+/g, ''))) {
      setRegisterError(t.authInvalidMobile);
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError(t.authPasswordLength);
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError(t.authPasswordMismatch);
      return;
    }

    const res = StorageService.saveUser({
      id: `usr-${Date.now()}`,
      fullName: registerName.trim(),
      email: registerEmail.trim().toLowerCase(),
      mobile: registerMobile.trim(),
      password: registerPassword,
      gender: registerGender,
      createdAt: new Date().toISOString(),
    });

    if (res.success) {
      setRegisterError('');
      setLoginEmail(registerEmail.trim().toLowerCase());
      setLoginPassword('');
      setCurrentTab('login');
      setToast({
        id: Date.now().toString(),
        type: 'success',
        message: res.message,
      });
    } else {
      setRegisterError(res.message);
    }
  };

  // Quick One-Click Route Selector from Hero
  const selectQuickRoute = (from: string, to: string) => {
    setFromStation(from);
    setToStation(to);
    handleSearchTrains();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      
      {/* IRCTC-style Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          // Route guard check for protected tabs
          if (tab === 'bookings' && !currentUser) {
            setToast({
              id: Date.now().toString(),
              type: 'info',
              message: 'Please sign in to view your bookings.',
            });
            setReturnUrl('bookings');
            setCurrentTab('login');
            return;
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        translations={t}
        onOpenAcademicHub={() => setAcademicHubOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">

        {/* ---------------- 1. HOME TAB ---------------- */}
        {currentTab === 'home' && (
          <div className="space-y-12 pb-16">
            
            {/* Hero Section */}
            <section className="relative bg-[#0f2d59] text-white overflow-hidden py-12 md:py-16">
              {/* Subtle background overlay */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <img
                  src="/src/assets/images/hero_indian_railway_train_1794463500618.jpg"
                  alt="Indian Railways Vande Bharat Train"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Heading & Value Proposition */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.heroFastBooking}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      {t.heroTitle}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                      {t.heroSubtitle}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          const searchBox = document.getElementById('search-form-card');
                          searchBox?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-[0.98]"
                      >
                        <span>{t.heroBookJourneyBtn}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setCurrentTab('pnr')}
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center gap-2 border border-white/20 transition-colors"
                      >
                        <Ticket className="w-4 h-4 text-amber-300" />
                        <span>{t.navPnrStatus}</span>
                      </button>
                    </div>

                    <div className="pt-4 flex items-center gap-6 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Direct PNR Issuance</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Zero Booking Fee Markup</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Search Card Component */}
                  <div id="search-form-card" className="lg:col-span-6">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7 border border-slate-200 text-slate-900">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <TrainIcon className="w-5 h-5 text-[#0f2d59]" />
                          <h2 className="text-lg font-bold text-[#0f2d59]">
                            {t.searchCardTitle}
                          </h2>
                        </div>
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          IRCTC E-Ticketing
                        </span>
                      </div>

                      <form onSubmit={handleSearchTrains} className="mt-5 space-y-4">
                        {/* Origin & Destination with Swap button */}
                        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          {/* From Station */}
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              {t.searchFromStation}
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                              <select
                                value={fromStation}
                                onChange={(e) => setFromStation(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59] focus:bg-white"
                              >
                                {STATIONS.map((s) => (
                                  <option key={s.code} value={s.code}>
                                    {s.name} ({s.code})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Swap Button */}
                          <div className="hidden sm:flex absolute left-1/2 -ml-4 top-7 z-10">
                            <button
                              type="button"
                              onClick={handleSwapStations}
                              className="w-8 h-8 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center text-slate-600 hover:text-[#0f2d59] hover:border-[#0f2d59] transition-transform active:rotate-180"
                              title={t.searchSwapStations}
                              aria-label={t.searchSwapStations}
                            >
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* To Station */}
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              {t.searchToStation}
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                              <select
                                value={toStation}
                                onChange={(e) => setToStation(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59] focus:bg-white"
                              >
                                {STATIONS.map((s) => (
                                  <option key={s.code} value={s.code}>
                                    {s.name} ({s.code})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Date, Class & Quota */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Date Picker */}
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              {t.searchJourneyDate}
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                              <input
                                type="date"
                                value={journeyDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setJourneyDate(e.target.value)}
                                className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59] focus:bg-white"
                              />
                            </div>
                          </div>

                          {/* Class Picker */}
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              {t.searchTravelClass}
                            </label>
                            <select
                              value={selectedClassFilter}
                              onChange={(e) => setSelectedClassFilter(e.target.value as any)}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59] focus:bg-white"
                            >
                              <option value="ALL">{t.searchAllClasses}</option>
                              <option value="SL">Sleeper (SL)</option>
                              <option value="3A">AC 3 Tier (3A)</option>
                              <option value="2A">AC 2 Tier (2A)</option>
                              <option value="1A">AC First Class (1A)</option>
                            </select>
                          </div>

                          {/* Quota Picker */}
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              {t.searchQuota}
                            </label>
                            <select
                              value={selectedQuota}
                              onChange={(e) => setSelectedQuota(e.target.value as any)}
                              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59] focus:bg-white"
                            >
                              <option value="GENERAL">{t.searchGeneralQuota}</option>
                              <option value="TATKAL">{t.searchTatkalQuota}</option>
                              <option value="LADIES">{t.searchLadiesQuota}</option>
                              <option value="SENIOR_CITIZEN">{t.searchSeniorCitizenQuota}</option>
                            </select>
                          </div>
                        </div>

                        {/* Validation Error Banner */}
                        {searchValidationMsg && (
                          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{searchValidationMsg}</span>
                          </div>
                        )}

                        {/* Search Trains CTA Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl font-bold text-base text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            <Search className="w-5 h-5" />
                            <span>{t.searchBtn}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Popular Railway Routes */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {t.routesTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {t.routesSubtitle}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#0f2d59] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <span>Frequent Daily Trains</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { from: 'SC', to: 'VSKP', name: 'Secunderabad ⇄ Visakhapatnam', tag: 'Vande Bharat / Godavari', duration: '8h 30m' },
                  { from: 'HYB', to: 'MAS', name: 'Hyderabad ⇄ Chennai Central', tag: 'Charminar SF Express', duration: '13h 00m' },
                  { from: 'HYB', to: 'NDLS', name: 'Hyderabad ⇄ New Delhi', tag: 'Telangana SF / Rajdhani', duration: '21h 45m' },
                  { from: 'BZA', to: 'MAS', name: 'Vijayawada ⇄ Chennai Central', tag: 'Pinakini SF Express', duration: '6h 55m' },
                  { from: 'SC', to: 'TPTY', name: 'Secunderabad ⇄ Tirupati', tag: 'Venkatadri SF Express', duration: '11h 00m' },
                  { from: 'MAS', to: 'SBC', name: 'Chennai ⇄ Bengaluru City', tag: 'Shatabdi Express', duration: '4h 55m' },
                ].map((route, i) => (
                  <div
                    key={i}
                    onClick={() => selectQuickRoute(route.from, route.to)}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#0f2d59] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{route.duration}</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Daily</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0f2d59] transition-colors">
                        {route.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {route.tag}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0f2d59]">
                      <span>Check Seat Availability</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Book With RailYatra Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#0f2d59] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-2xl space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {t.featTitle}
                  </h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {t.featSubtitle}
                  </p>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base">{t.featVandeBharat}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {t.featVandeBharatDesc}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-emerald-400 text-slate-950 flex items-center justify-center font-bold mb-3">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base">{t.featPnrTracking}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {t.featPnrTrackingDesc}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-blue-400 text-slate-950 flex items-center justify-center font-bold mb-3">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base">{t.featMultilingual}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {t.featMultilingualDesc}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-purple-400 text-slate-950 flex items-center justify-center font-bold mb-3">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base">{t.featSecureBooking}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {t.featSecureBookingDesc}
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ---------------- 2. SEARCH & AVAILABILITY TAB ---------------- */}
        {currentTab === 'search' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Filter / Search Bar Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-amber-400 flex items-center justify-center shrink-0">
                    <TrainIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {fromStation} → {toStation}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Journey Date: <strong className="text-slate-800">{L10nService.formatDateWithDay(journeyDate, currentLang)}</strong> · Quota: <strong>{selectedQuota}</strong>
                    </p>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-400 mr-1">{t.availSortBy}:</span>
                    <button
                      onClick={() => setSortBy('departure')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        sortBy === 'departure' ? 'bg-[#0f2d59] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {t.availSortTime}
                    </button>
                    <button
                      onClick={() => setSortBy('fare')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        sortBy === 'fare' ? 'bg-[#0f2d59] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {t.availSortFare}
                    </button>
                    <button
                      onClick={() => setSortBy('duration')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        sortBy === 'duration' ? 'bg-[#0f2d59] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {t.availSortDuration}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentTab('home');
                      setTimeout(() => {
                        document.getElementById('search-form-card')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Modify Search
                  </button>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Showing <strong className="text-slate-900">{matchingTrains.length}</strong> {t.availTrainsFound}
              </span>
              <span>Prices in Indian Rupees (₹) · All Quotas</span>
            </div>

            {/* Train List / Empty State */}
            {matchingTrains.length > 0 ? (
              <div className="space-y-4">
                {matchingTrains.map((train) => (
                  <TrainCard
                    key={train.id}
                    train={train}
                    selectedClass={selectedClassFilter === 'ALL' ? '3A' : selectedClassFilter}
                    onBookClass={handleBookClass}
                    translations={t}
                    currentLang={currentLang}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.availNoTrainsFound}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.availNoTrainsMsg}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setFromStation('SC');
                      setToStation('VSKP');
                      handleSearchTrains();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                  >
                    Try Secunderabad (SC) to Visakhapatnam (VSKP)
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ---------------- 3. BOOKING TAB ---------------- */}
        {currentTab === 'booking' && selectedTrain && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Header Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button onClick={() => setCurrentTab('search')} className="hover:text-[#0f2d59] font-medium">
                ← Back to Train Results
              </button>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{t.bookingTitle}</span>
            </div>

            {/* Train & Selected Journey Summary Card */}
            <div className="bg-[#0f2d59] text-white rounded-2xl p-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                    #{selectedTrain.number}
                  </span>
                  <h2 className="text-xl font-bold mt-1 tracking-tight">
                    {selectedTrain.name}
                  </h2>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-amber-300">
                    Class: {selectedClass} · Quota: {selectedQuota}
                  </span>
                  <p className="text-xs text-slate-300">
                    {L10nService.formatDateWithDay(journeyDate, currentLang)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <p className="text-slate-400">Boarding Station</p>
                  <p className="font-bold text-sm">{selectedTrain.fromStationName} ({selectedTrain.fromStationCode})</p>
                  <p className="font-mono text-amber-300">{selectedTrain.departureTime}</p>
                </div>
                <div>
                  <p className="text-slate-400">Destination</p>
                  <p className="font-bold text-sm">{selectedTrain.toStationName} ({selectedTrain.toStationCode})</p>
                  <p className="font-mono text-amber-300">{selectedTrain.arrivalTime}</p>
                </div>
                <div>
                  <p className="text-slate-400">Duration</p>
                  <p className="font-bold text-sm">{selectedTrain.duration}</p>
                  <p className="text-slate-300">Distance: {selectedTrain.distanceKm} km</p>
                </div>
                <div>
                  <p className="text-slate-400">Fare per Passenger</p>
                  <p className="font-bold text-sm font-mono text-amber-300">
                    {L10nService.formatCurrency(selectedTrain.classes[selectedClass]?.fare || 500, currentLang)}
                  </p>
                </div>
              </div>
            </div>

            {/* Passenger Information Form Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {t.bookingPassengerDetails}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.bookingMaxPassengers}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddPassenger}
                  disabled={bookingPassengers.length >= 6}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0f2d59] hover:bg-[#1a3d73] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.bookingAddPassenger}</span>
                </button>
              </div>

              {/* Dynamic Passenger Rows */}
              <div className="space-y-4">
                {bookingPassengers.map((pax, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 relative space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Passenger #{index + 1}
                      </span>
                      {bookingPassengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePassenger(index)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t.bookingRemovePassenger}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      {/* Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {t.bookingPassengerName} *
                        </label>
                        <input
                          type="text"
                          value={pax.name}
                          placeholder="e.g. Rahul Sharma"
                          onChange={(e) => handleUpdatePassenger(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                        />
                      </div>

                      {/* Age */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {t.bookingPassengerAge} *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="125"
                          value={pax.age}
                          onChange={(e) => handleUpdatePassenger(index, 'age', parseInt(e.target.value, 10) || '')}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {t.bookingPassengerGender}
                        </label>
                        <select
                          value={pax.gender}
                          onChange={(e) => handleUpdatePassenger(index, 'gender', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                        >
                          <option value="Male">{t.bookingMale}</option>
                          <option value="Female">{t.bookingFemale}</option>
                          <option value="Other">{t.bookingOther}</option>
                        </select>
                      </div>
                    </div>

                    {/* Berth Preference */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          {t.bookingPassengerBerth}
                        </label>
                        <select
                          value={pax.berthPreference}
                          onChange={(e) => handleUpdatePassenger(index, 'berthPreference', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                        >
                          <option value="No Preference">{t.bookingNoPreference}</option>
                          <option value="Lower">{t.bookingLower}</option>
                          <option value="Middle">{t.bookingMiddle}</option>
                          <option value="Upper">{t.bookingUpper}</option>
                          <option value="Side Lower">{t.bookingSideLower}</option>
                          <option value="Side Upper">{t.bookingSideUpper}</option>
                          <option value="Window">{t.bookingWindow}</option>
                        </select>
                      </div>

                      <div className="flex items-center text-xs text-slate-500 pt-5">
                        <span className="text-[11px]">
                          Allotment subject to Indian Railways computerized reservation quota rules.
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fare Calculation & Breakdown */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold uppercase text-slate-700 pb-1 border-b border-slate-200">
                  {t.bookingFareSummary}
                </h4>
                
                <div className="flex justify-between text-slate-600">
                  <span>{t.bookingBaseFare} ({bookingPassengers.length} × {L10nService.formatCurrency(selectedTrain.classes[selectedClass]?.fare || 500, currentLang)}):</span>
                  <span className="font-mono font-semibold">{L10nService.formatCurrency(fareCalculations.baseFare, currentLang)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>{t.bookingGst}:</span>
                  <span className="font-mono font-semibold">{L10nService.formatCurrency(fareCalculations.gst, currentLang)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>{t.bookingConvenienceFee}:</span>
                  <span className="font-mono font-semibold">{L10nService.formatCurrency(fareCalculations.convenienceFee, currentLang)}</span>
                </div>

                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t.bookingTotalAmount}:</span>
                  <span className="font-mono text-base text-[#0f2d59]">
                    {L10nService.formatCurrency(fareCalculations.totalFare, currentLang)}
                  </span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0f2d59] focus:ring-[#0f2d59] mt-0.5 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-xs text-slate-700 cursor-pointer">
                  {t.bookingAgreeTerms}
                </label>
              </div>

              {/* Error Alert */}
              {bookingError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Simulation Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.bookingSimulatedNotice}</span>
              </div>

              {/* Confirm Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full py-3.5 rounded-xl font-bold text-base text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{t.bookingConfirmPay} ({L10nService.formatCurrency(fareCalculations.totalFare, currentLang)})</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ---------------- 4. CONFIRMATION TAB ---------------- */}
        {currentTab === 'confirmation' && confirmedBooking && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            
            {/* Success Celebration Banner */}
            <div className="bg-emerald-700 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-white/20 text-white mx-auto flex items-center justify-center shadow-inner">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t.confirmSuccessTitle}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto">
                {t.confirmSuccessSubtitle}
              </p>

              {/* PNR Prominent Box */}
              <div className="mt-4 p-4 rounded-xl bg-white text-slate-900 max-w-sm mx-auto shadow-md flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">{t.confirmPnr}</p>
                  <p className="text-2xl font-black font-mono tracking-wider text-[#0f2d59]">
                    {confirmedBooking.pnr}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(confirmedBooking.pnr);
                    setCopiedPnr(true);
                    setTimeout(() => setCopiedPnr(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedPnr ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPnr ? 'Copied' : 'Copy PNR'}</span>
                </button>
              </div>
            </div>

            {/* Quick Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    #{confirmedBooking.trainNumber} - {confirmedBooking.trainName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {confirmedBooking.fromStationName} ({confirmedBooking.fromStationCode}) → {confirmedBooking.toStationName} ({confirmedBooking.toStationCode})
                  </p>
                </div>
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {t.confirmStatusConfirmed}
                </span>
              </div>

              {/* Passenger List Preview */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.confirmPassengerList}
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="p-3">Passenger</th>
                        <th className="p-3">Age/Gender</th>
                        <th className="p-3">{t.confirmCoachSeat}</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {confirmedBooking.passengers.map((p, i) => (
                        <tr key={i}>
                          <td className="p-3 font-bold text-slate-900">{p.name}</td>
                          <td className="p-3 text-slate-600">{p.age} Yrs · {p.gender}</td>
                          <td className="p-3 font-mono font-bold text-[#0f2d59]">{p.coach}-{p.seatNumber}</td>
                          <td className="p-3 text-emerald-700 font-bold">{p.status || 'CNF'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Paid */}
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-500">Total Fare Paid (incl. GST & Service Fee):</span>
                <span className="font-mono font-bold text-base text-slate-900">
                  {L10nService.formatCurrency(confirmedBooking.totalFare, currentLang)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setTicketModalBooking(confirmedBooking)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0f2d59] hover:bg-[#1a3d73] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>{t.confirmPrintTicket}</span>
              </button>

              <button
                onClick={() => setCurrentTab('bookings')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>{t.confirmViewMyBookings}</span>
              </button>

              <button
                onClick={() => setCurrentTab('home')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
              >
                {t.confirmBackHome}
              </button>
            </div>

          </div>
        )}

        {/* ---------------- 5. MY BOOKINGS TAB ---------------- */}
        {currentTab === 'bookings' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {t.myBookingsTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  {t.myBookingsSubtitle}
                </p>
              </div>

              {/* Filter Tabs: All, Confirmed, Cancelled */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setBookingsFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    bookingsFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({userBookings.length})
                </button>
                <button
                  onClick={() => setBookingsFilter('CONFIRMED')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    bookingsFilter === 'CONFIRMED' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Confirmed ({userBookings.filter(b => b.status === 'CONFIRMED').length})
                </button>
                <button
                  onClick={() => setBookingsFilter('CANCELLED')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    bookingsFilter === 'CANCELLED' ? 'bg-white text-rose-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cancelled ({userBookings.filter(b => b.status === 'CANCELLED').length})
                </button>
              </div>
            </div>

            {/* Bookings List */}
            {userBookings.filter(b => bookingsFilter === 'ALL' || b.status === bookingsFilter).length > 0 ? (
              <div className="space-y-4">
                {userBookings
                  .filter(b => bookingsFilter === 'ALL' || b.status === bookingsFilter)
                  .map((booking) => {
                    const isCancelled = booking.status === 'CANCELLED';
                    return (
                      <div
                        key={booking.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-sm transition-shadow space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono font-bold text-xs bg-blue-100 text-[#0f2d59] px-2 py-0.5 rounded">
                                PNR: {booking.pnr}
                              </span>
                              <span className="text-xs font-mono text-slate-500">
                                #{booking.id}
                              </span>
                              <span className="text-xs text-slate-300">·</span>
                              <span className="text-xs text-slate-500">
                                Booked: {L10nService.formatDate(booking.bookingDate, currentLang)}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mt-1">
                              #{booking.trainNumber} - {booking.trainName}
                            </h3>
                          </div>

                          <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider self-start sm:self-center ${
                            isCancelled
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}>
                            {isCancelled ? t.myBookingsStatusCancelled : t.confirmStatusConfirmed}
                          </span>
                        </div>

                        {/* Route details */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-slate-400">From</p>
                            <p className="font-bold text-slate-900">{booking.fromStationName} ({booking.fromStationCode})</p>
                            <p className="font-mono text-slate-600">{booking.departureTime}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">To</p>
                            <p className="font-bold text-slate-900">{booking.toStationName} ({booking.toStationCode})</p>
                            <p className="font-mono text-slate-600">{booking.arrivalTime}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Journey Date</p>
                            <p className="font-bold text-slate-900">{L10nService.formatDate(booking.journeyDate, currentLang)}</p>
                            <p className="text-slate-500">Class: {booking.travelClass}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Total Fare</p>
                            <p className="font-bold text-slate-900 font-mono text-sm">
                              {L10nService.formatCurrency(booking.totalFare, currentLang)}
                            </p>
                            <p className="text-slate-500">{booking.passengers.length} Passenger{booking.passengers.length > 1 ? 's' : ''}</p>
                          </div>
                        </div>

                        {/* Passenger summary */}
                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="font-bold text-slate-700">Passengers:</span>
                          {booking.passengers.map((p, i) => (
                            <span key={i} className="inline-flex items-center gap-1">
                              <span>{p.name}</span>
                              <span className="font-mono text-slate-500 font-bold">({p.coach}-{p.seatNumber})</span>
                              {i < booking.passengers.length - 1 && <span className="text-slate-300">·</span>}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                          <div className="text-xs text-slate-500">
                            {isCancelled && booking.refundAmount && (
                              <span className="text-emerald-700 font-bold">
                                Refund Credited: {L10nService.formatCurrency(booking.refundAmount, currentLang)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setTicketModalBooking(booking)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#0f2d59] hover:bg-[#1a3d73] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5 text-amber-400" />
                              <span>{t.myBookingsViewTicket}</span>
                            </button>

                            {!isCancelled && (
                              <button
                                onClick={() => setCancelTargetBooking(booking)}
                                className="px-3.5 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>{t.myBookingsCancelTicket}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Ticket className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.myBookingsEmpty}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.myBookingsEmptySub}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentTab('home')}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                  >
                    {t.myBookingsBookTrainBtn}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ---------------- 6. PNR STATUS TAB ---------------- */}
        {currentTab === 'pnr' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#0f2d59] text-amber-400 mx-auto flex items-center justify-center shadow-md">
                <Ticket className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.pnrTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                {t.pnrSubtitle}
              </p>
            </div>

            {/* PNR Search Input Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-4">
              <form onSubmit={handlePnrSearch} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    {t.pnrInputLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={10}
                      value={pnrInput}
                      onChange={(e) => {
                        setPnrInput(e.target.value.replace(/[^0-9]/g, ''));
                        setPnrError('');
                      }}
                      placeholder={t.pnrInputPlaceholder}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-lg font-mono font-bold tracking-widest text-[#0f2d59] placeholder:font-sans placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-[#0f2d59] focus:bg-white"
                    />
                  </div>
                </div>

                {pnrError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pnrError}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#0f2d59] hover:bg-[#1a3d73] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Search className="w-4 h-4 text-amber-400" />
                    <span>{t.pnrCheckBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPnrInput('');
                      setPnrResult(null);
                      setPnrError('');
                      setPnrSearched(false);
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                  >
                    {t.pnrClearBtn}
                  </button>
                </div>
              </form>

              {/* Quick Demo PNR buttons for examiner */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{t.pnrQuickTest}</span>
                <button
                  type="button"
                  onClick={() => {
                    setPnrInput('4528931047');
                    setPnrError('');
                  }}
                  className="font-mono font-bold text-[#0f2d59] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
                >
                  4528931047 (Vande Bharat)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPnrInput('6198420315');
                    setPnrError('');
                  }}
                  className="font-mono font-bold text-[#0f2d59] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
                >
                  6198420315 (Charminar SF)
                </button>
              </div>
            </div>

            {/* PNR Found Result Card */}
            {pnrResult && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md animate-in fade-in duration-150">
                <div className="bg-[#0f2d59] text-white p-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-amber-300 font-bold">
                      PNR: {pnrResult.pnr}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight">
                      #{pnrResult.trainNumber} - {pnrResult.trainName}
                    </h3>
                  </div>

                  <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    pnrResult.status === 'CANCELLED'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {pnrResult.status}
                  </span>
                </div>

                <div className="p-6 space-y-6">
                  {/* Schedule Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-slate-400">From Station</p>
                      <p className="font-bold text-slate-900">{pnrResult.fromStationName} ({pnrResult.fromStationCode})</p>
                      <p className="font-mono text-slate-600">{pnrResult.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">To Station</p>
                      <p className="font-bold text-slate-900">{pnrResult.toStationName} ({pnrResult.toStationCode})</p>
                      <p className="font-mono text-slate-600">{pnrResult.arrivalTime}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Date of Journey</p>
                      <p className="font-bold text-slate-900">{L10nService.formatDate(pnrResult.journeyDate, currentLang)}</p>
                      <p className="text-slate-500">Class: {pnrResult.travelClass}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">{t.pnrChartStatus}</p>
                      <p className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit mt-0.5">
                        {t.pnrChartNotPrepared}
                      </p>
                    </div>
                  </div>

                  {/* Passenger Reservation Table */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">
                      Passenger Status & Berth Allocation
                    </h4>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                          <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Passenger</th>
                            <th className="p-3">Booking Status</th>
                            <th className="p-3">Current Status</th>
                            <th className="p-3">Coach/Berth</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {pnrResult.passengers.map((p, idx) => (
                            <tr key={idx}>
                              <td className="p-3 text-slate-400">{idx + 1}</td>
                              <td className="p-3 font-bold text-slate-900">{p.name}</td>
                              <td className="p-3 text-slate-600">{pnrResult.status === 'CANCELLED' ? 'CAN' : 'CNF'}</td>
                              <td className="p-3 font-bold text-emerald-700">
                                {pnrResult.status === 'CANCELLED' ? 'CANCELLED' : (p.status || 'CNF')}
                              </td>
                              <td className="p-3 font-mono font-bold text-[#0f2d59]">
                                {p.coach || 'B2'}-{p.seatNumber || (20 + idx)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setTicketModalBooking(pnrResult)}
                      className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#1a3d73] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>{t.confirmPrintTicket}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ---------------- 7. LOGIN TAB ---------------- */}
        {currentTab === 'login' && (
          <div className="max-w-md mx-auto px-4 py-12 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="text-center space-y-1.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0f2d59] text-amber-400 mx-auto flex items-center justify-center shadow-md">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t.loginTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  {t.loginSubtitle}
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t.loginEmailLabel}
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="sanjana.mnv@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t.loginPasswordLabel}
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0f2d59] hover:bg-[#1a3d73] text-white font-bold text-sm transition-colors shadow-sm"
                >
                  {t.loginBtn}
                </button>
              </form>

              {/* Quick Demo Autofill */}
              <div className="pt-2 border-t border-slate-100 text-center space-y-2">
                <p className="text-[11px] text-slate-400 font-medium">
                  Quick Academic Review Credentials:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('sanjana.mnv@gmail.com');
                    setLoginPassword('Password@123');
                    setLoginError('');
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Autofill Demo Passenger (Sanjana Rao)
                </button>
              </div>

              {/* Link to Register */}
              <div className="text-center text-xs text-slate-600 pt-1">
                <span>{t.loginNoAccount} </span>
                <button
                  type="button"
                  onClick={() => setCurrentTab('register')}
                  className="font-bold text-[#0f2d59] hover:underline"
                >
                  {t.loginRegisterLink}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ---------------- 8. REGISTER TAB ---------------- */}
        {currentTab === 'register' && (
          <div className="max-w-lg mx-auto px-4 py-10 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="text-center space-y-1.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 mx-auto flex items-center justify-center shadow-md">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t.registerTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  {t.registerSubtitle}
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t.registerFullName} *
                  </label>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.loginEmailLabel} *
                    </label>
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.registerMobile} *
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={registerMobile}
                      onChange={(e) => setRegisterMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.loginPasswordLabel} *
                    </label>
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Min. 6 chars"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.registerConfirmPassword} *
                    </label>
                    <input
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t.registerGender}
                  </label>
                  <select
                    value={registerGender}
                    onChange={(e) => setRegisterGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f2d59]"
                  >
                    <option value="Male">{t.bookingMale}</option>
                    <option value="Female">{t.bookingFemale}</option>
                    <option value="Other">{t.bookingOther}</option>
                  </select>
                </div>

                {registerError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{registerError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-colors shadow-sm"
                >
                  {t.registerBtn}
                </button>
              </form>

              <div className="text-center text-xs text-slate-600 pt-2 border-t border-slate-100">
                <span>{t.registerHaveAccount} </span>
                <button
                  type="button"
                  onClick={() => setCurrentTab('login')}
                  className="font-bold text-[#0f2d59] hover:underline"
                >
                  {t.registerLoginLink}
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* IRCTC-style Footer */}
      <Footer
        translations={t}
        onNavigate={(tab) => {
          if (tab === 'bookings' && !currentUser) {
            setToast({
              id: Date.now().toString(),
              type: 'info',
              message: 'Please sign in to view your bookings.',
            });
            setCurrentTab('login');
            return;
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAcademicHub={() => setAcademicHubOpen(true)}
      />

      {/* Ticket Modal (Printable E-Ticket) */}
      <TicketModal
        booking={ticketModalBooking}
        onClose={() => setTicketModalBooking(null)}
        translations={t}
        currentLang={currentLang}
      />

      {/* Cancel Ticket Confirmation Modal */}
      <CancelModal
        booking={cancelTargetBooking}
        onClose={() => setCancelTargetBooking(null)}
        onConfirmCancel={handleCancelBooking}
        translations={t}
        currentLang={currentLang}
      />

      {/* Academic Hub & Source Code Inspector Modal */}
      <AcademicHubModal
        isOpen={academicHubOpen}
        onClose={() => setAcademicHubOpen(false)}
      />

      {/* Global Notifications Toast */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
