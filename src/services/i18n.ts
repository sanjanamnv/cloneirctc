import { Language } from '../types';

export interface Translations {
  // Navigation
  brandName: string;
  brandTagline: string;
  navHome: string;
  navTrainSearch: string;
  navPnrStatus: string;
  navMyBookings: string;
  navLogin: string;
  navRegister: string;
  navLogout: string;
  navAcademicHub: string;
  emergencyAlert: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroBookJourneyBtn: string;
  heroFastBooking: string;

  // Train Search
  searchCardTitle: string;
  searchFromStation: string;
  searchToStation: string;
  searchJourneyDate: string;
  searchTravelClass: string;
  searchQuota: string;
  searchBtn: string;
  searchSwapStations: string;
  searchAllClasses: string;
  searchGeneralQuota: string;
  searchTatkalQuota: string;
  searchLadiesQuota: string;
  searchSeniorCitizenQuota: string;
  searchSameStationError: string;
  searchPastDateError: string;
  searchSelectBothError: string;

  // Train Availability
  availResultsTitle: string;
  availTrainsFound: string;
  availNoTrainsFound: string;
  availNoTrainsMsg: string;
  availDeparture: string;
  availArrival: string;
  availDuration: string;
  availRunsOn: string;
  availSortBy: string;
  availSortTime: string;
  availSortFare: string;
  availSortDuration: string;
  availFilterClass: string;
  availBookNow: string;
  availSeatsAvailable: string;
  availWaitingList: string;
  availRAC: string;

  // Booking
  bookingTitle: string;
  bookingJourneySummary: string;
  bookingTrainDetails: string;
  bookingClassLabel: string;
  bookingPassengerDetails: string;
  bookingAddPassenger: string;
  bookingRemovePassenger: string;
  bookingMaxPassengers: string;
  bookingPassengerName: string;
  bookingPassengerAge: string;
  bookingPassengerGender: string;
  bookingPassengerBerth: string;
  bookingMale: string;
  bookingFemale: string;
  bookingOther: string;
  bookingNoPreference: string;
  bookingLower: string;
  bookingMiddle: string;
  bookingUpper: string;
  bookingSideLower: string;
  bookingSideUpper: string;
  bookingWindow: string;
  bookingFareSummary: string;
  bookingBaseFare: string;
  bookingGst: string;
  bookingConvenienceFee: string;
  bookingTotalAmount: string;
  bookingConfirmPay: string;
  bookingAgreeTerms: string;
  bookingSimulatedNotice: string;

  // Confirmation
  confirmSuccessTitle: string;
  confirmSuccessSubtitle: string;
  confirmPnr: string;
  confirmBookingId: string;
  confirmBookingStatus: string;
  confirmStatusConfirmed: string;
  confirmPassengerList: string;
  confirmCoachSeat: string;
  confirmDownloadTicket: string;
  confirmPrintTicket: string;
  confirmBackHome: string;
  confirmViewMyBookings: string;
  confirmDisclaimer: string;

  // My Bookings
  myBookingsTitle: string;
  myBookingsSubtitle: string;
  myBookingsEmpty: string;
  myBookingsEmptySub: string;
  myBookingsBookTrainBtn: string;
  myBookingsViewTicket: string;
  myBookingsCancelTicket: string;
  myBookingsCancelConfirmTitle: string;
  myBookingsCancelConfirmMsg: string;
  myBookingsCancelProceed: string;
  myBookingsKeepBooking: string;
  myBookingsStatusCancelled: string;
  myBookingsRefundAmount: string;
  myBookingsCancellationCharges: string;

  // PNR Status
  pnrTitle: string;
  pnrSubtitle: string;
  pnrInputLabel: string;
  pnrInputPlaceholder: string;
  pnrCheckBtn: string;
  pnrClearBtn: string;
  pnrQuickTest: string;
  pnrInvalidError: string;
  pnrNotFoundError: string;
  pnrDetailsTitle: string;
  pnrChartStatus: string;
  pnrChartNotPrepared: string;

  // Auth
  loginTitle: string;
  loginSubtitle: string;
  loginEmailLabel: string;
  loginPasswordLabel: string;
  loginBtn: string;
  loginNoAccount: string;
  loginRegisterLink: string;
  registerTitle: string;
  registerSubtitle: string;
  registerFullName: string;
  registerMobile: string;
  registerConfirmPassword: string;
  registerGender: string;
  registerBtn: string;
  registerHaveAccount: string;
  registerLoginLink: string;
  authFillAllFields: string;
  authInvalidEmail: string;
  authInvalidMobile: string;
  authPasswordMismatch: string;
  authPasswordLength: string;

  // Features & Highlights
  featTitle: string;
  featSubtitle: string;
  featVandeBharat: string;
  featVandeBharatDesc: string;
  featPnrTracking: string;
  featPnrTrackingDesc: string;
  featMultilingual: string;
  featMultilingualDesc: string;
  featSecureBooking: string;
  featSecureBookingDesc: string;

  // Popular Routes
  routesTitle: string;
  routesSubtitle: string;

  // Footer
  footerAboutTitle: string;
  footerAboutText: string;
  footerQuickLinks: string;
  footerHelplineTitle: string;
  footerHelplineText: string;
  footerSecurityText: string;
  footerAcademicNotice: string;
  footerCopyright: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandName: 'RailYatra',
    brandTagline: 'Indian Railway Reservation System',
    navHome: 'Home',
    navTrainSearch: 'Train Search',
    navPnrStatus: 'PNR Status',
    navMyBookings: 'My Bookings',
    navLogin: 'Login',
    navRegister: 'Register',
    navLogout: 'Logout',
    navAcademicHub: 'Angular Architecture & Academic Hub',
    emergencyAlert: 'IRCTC Helpline: 139 | Security Helpline: 182 | RailMadad Complaint Portal',

    heroTitle: 'Your Journey Begins Here',
    heroSubtitle: 'Book train tickets across India with real-time seat availability, instant PNR tracking, and authentic Indian Railways reservation experience.',
    heroBookJourneyBtn: 'Book Your Journey',
    heroFastBooking: 'Instant Confirmations & Direct PNR Issuance',

    searchCardTitle: 'Book Train Tickets',
    searchFromStation: 'From Station',
    searchToStation: 'To Station',
    searchJourneyDate: 'Journey Date',
    searchTravelClass: 'Class',
    searchQuota: 'Quota',
    searchBtn: 'Search Trains',
    searchSwapStations: 'Swap Stations',
    searchAllClasses: 'All Classes',
    searchGeneralQuota: 'General (GN)',
    searchTatkalQuota: 'Tatkal (TQ)',
    searchLadiesQuota: 'Ladies (LD)',
    searchSeniorCitizenQuota: 'Senior Citizen (SS)',
    searchSameStationError: 'Source and destination stations cannot be the same.',
    searchPastDateError: 'Journey date cannot be in the past.',
    searchSelectBothError: 'Please select both departure and destination stations.',

    availResultsTitle: 'Available Trains',
    availTrainsFound: 'trains found for this route',
    availNoTrainsFound: 'No Trains Found',
    availNoTrainsMsg: 'No direct trains match your selected route and date. Try selecting another date or swapping source and destination stations.',
    availDeparture: 'Departure',
    availArrival: 'Arrival',
    availDuration: 'Duration',
    availRunsOn: 'Runs On',
    availSortBy: 'Sort By',
    availSortTime: 'Departure Time',
    availSortFare: 'Lowest Fare',
    availSortDuration: 'Travel Duration',
    availFilterClass: 'Filter by Class',
    availBookNow: 'Book Now',
    availSeatsAvailable: 'Available',
    availWaitingList: 'Waitlist',
    availRAC: 'RAC',

    bookingTitle: 'Passenger & Ticket Reservation',
    bookingJourneySummary: 'Journey Summary',
    bookingTrainDetails: 'Train Details',
    bookingClassLabel: 'Selected Travel Class',
    bookingPassengerDetails: 'Passenger Information',
    bookingAddPassenger: '+ Add Passenger',
    bookingRemovePassenger: 'Remove',
    bookingMaxPassengers: 'Maximum 6 passengers allowed per booking',
    bookingPassengerName: 'Full Name',
    bookingPassengerAge: 'Age',
    bookingPassengerGender: 'Gender',
    bookingPassengerBerth: 'Berth Preference',
    bookingMale: 'Male',
    bookingFemale: 'Female',
    bookingOther: 'Other',
    bookingNoPreference: 'No Preference',
    bookingLower: 'Lower Berth',
    bookingMiddle: 'Middle Berth',
    bookingUpper: 'Upper Berth',
    bookingSideLower: 'Side Lower',
    bookingSideUpper: 'Side Upper',
    bookingWindow: 'Window Seat',
    bookingFareSummary: 'Fare Calculation',
    bookingBaseFare: 'Base Fare',
    bookingGst: 'Goods & Services Tax (GST 5%)',
    bookingConvenienceFee: 'IRCTC Convenience Fee',
    bookingTotalAmount: 'Total Fare',
    bookingConfirmPay: 'Confirm & Pay Securely',
    bookingAgreeTerms: 'I agree to Indian Railways reservation rules & cancellation policy',
    bookingSimulatedNotice: 'Academic Simulation Notice: This is an educational demonstration project. No real bank transaction or railway reservation will occur.',

    confirmSuccessTitle: 'Booking Confirmed Successfully!',
    confirmSuccessSubtitle: 'Your e-Ticket reservation has been processed. A copy has been saved to your account.',
    confirmPnr: 'PNR Number',
    confirmBookingId: 'Booking ID',
    confirmBookingStatus: 'Booking Status',
    confirmStatusConfirmed: 'CONFIRMED',
    confirmPassengerList: 'Confirmed Passengers',
    confirmCoachSeat: 'Coach / Berth',
    confirmDownloadTicket: 'Download Ticket (PDF)',
    confirmPrintTicket: 'Print E-Ticket',
    confirmBackHome: 'Back to Home',
    confirmViewMyBookings: 'View My Bookings',
    confirmDisclaimer: 'Note: This ticket is generated for academic demonstration purposes (IRCTC Angular Clone). Keep valid government ID during travel.',

    myBookingsTitle: 'My Railway Bookings',
    myBookingsSubtitle: 'View, download e-tickets, or manage cancellations for your reserved journeys.',
    myBookingsEmpty: 'No Bookings Found',
    myBookingsEmptySub: 'You have not reserved any train tickets yet. Search for trains and plan your trip today.',
    myBookingsBookTrainBtn: 'Book a Train Ticket',
    myBookingsViewTicket: 'View Ticket',
    myBookingsCancelTicket: 'Cancel Ticket',
    myBookingsCancelConfirmTitle: 'Confirm Ticket Cancellation',
    myBookingsCancelConfirmMsg: 'Are you sure you want to cancel this booking? As per Indian Railways cancellation rules, standard clerkage and cancellation charges will apply.',
    myBookingsCancelProceed: 'Yes, Cancel Booking',
    myBookingsKeepBooking: 'No, Keep Booking',
    myBookingsStatusCancelled: 'CANCELLED',
    myBookingsRefundAmount: 'Refund Processed',
    myBookingsCancellationCharges: 'Cancellation Charges',

    pnrTitle: 'Check Your PNR Status',
    pnrSubtitle: 'Get live real-time booking confirmation and coach/berth allocation status for your 10-digit Indian Railways PNR.',
    pnrInputLabel: 'Enter 10-Digit PNR Number',
    pnrInputPlaceholder: 'e.g. 4528931047',
    pnrCheckBtn: 'Check Status',
    pnrClearBtn: 'Clear',
    pnrQuickTest: 'Quick Test Demo PNR:',
    pnrInvalidError: 'Please enter a valid 10-digit numeric PNR number.',
    pnrNotFoundError: 'PNR number not found in reservation database. Please verify the 10 digits or book a new ticket.',
    pnrDetailsTitle: 'PNR Reservation Details',
    pnrChartStatus: 'Charting Status',
    pnrChartNotPrepared: 'CHART NOT PREPARED',

    loginTitle: 'Passenger Login',
    loginSubtitle: 'Access your railway reservations, booking history, and e-ticket downloads.',
    loginEmailLabel: 'Email Address',
    loginPasswordLabel: 'Password',
    loginBtn: 'Sign In to Account',
    loginNoAccount: "Don't have an IRCTC account?",
    loginRegisterLink: 'Register as New Passenger',
    registerTitle: 'Passenger Registration',
    registerSubtitle: 'Create your passenger profile for seamless railway reservations.',
    registerFullName: 'Full Name',
    registerMobile: 'Mobile Number (10 Digits)',
    registerConfirmPassword: 'Confirm Password',
    registerGender: 'Gender',
    registerBtn: 'Create Account',
    registerHaveAccount: 'Already have an account?',
    registerLoginLink: 'Sign In here',
    authFillAllFields: 'Please fill in all required fields.',
    authInvalidEmail: 'Please enter a valid email address.',
    authInvalidMobile: 'Please enter a valid 10-digit Indian mobile number.',
    authPasswordMismatch: 'Password and Confirm Password do not match.',
    authPasswordLength: 'Password must be at least 6 characters long.',

    featTitle: 'Why Book With RailYatra?',
    featSubtitle: 'Built with Angular Standalone Components, reactive architecture, and full i18n/l10n standards.',
    featVandeBharat: 'High-Speed Express Network',
    featVandeBharatDesc: 'Real-time schedule and seat availability for Vande Bharat, Rajdhani, Shatabdi, and Superfast trains.',
    featPnrTracking: 'Instant PNR Tracking',
    featPnrTrackingDesc: 'Accurate passenger berth status, coach numbers, and charting updates with zero latency.',
    featMultilingual: 'Full Multilingual Support',
    featMultilingualDesc: 'Seamless runtime language switching between English, Telugu, and Hindi with localized dates and currency.',
    featSecureBooking: 'Transparent Fare Calculation',
    featSecureBookingDesc: 'Detailed itemized fare breakdown including base fare, GST, and standard IRCTC convenience fees.',

    routesTitle: 'Popular Indian Railway Routes',
    routesSubtitle: 'Explore frequent express connections between major Indian technology and commercial hubs.',

    footerAboutTitle: 'RailYatra - Indian Railways IRCTC Clone',
    footerAboutText: 'An academic showcase project developed with Angular Standalone Components, Reactive Forms, Route Guards, LocalStorage persistence, XLIFF internationalization, and Indian Rupee localization.',
    footerQuickLinks: 'Quick Links',
    footerHelplineTitle: 'Passenger Support',
    footerHelplineText: '24x7 Customer Care: 139 | Email: care@railyatra.gov.in | Security Helpline: 182',
    footerSecurityText: 'Verified SSL Secured Railway Transaction Portal',
    footerAcademicNotice: 'Academic Project Simulation Notice: Built for educational demonstration. Not affiliated with IRCTC or Ministry of Railways.',
    footerCopyright: '© 2026 RailYatra Portal. Developed for University Academic Demonstration.',
  },

  te: {
    brandName: 'రైల్ యాత్ర',
    brandTagline: 'భారతీయ రైల్వే రిజర్వేషన్ వ్యవస్థ',
    navHome: 'హోమ్',
    navTrainSearch: 'రైలు శోధన',
    navPnrStatus: 'PNR స్థితి',
    navMyBookings: 'నా బుకింగ్‌లు',
    navLogin: 'లాగిన్',
    navRegister: 'నమోదు',
    navLogout: 'లాగౌట్',
    navAcademicHub: 'యాంగ్యులర్ ఆర్కిటెక్చర్ & ప్రాజెక్ట్ హబ్',
    emergencyAlert: 'IRCTC హెల్ప్‌లైన్: 139 | భద్రతా హెల్ప్‌లైన్: 182 | రైల్ మదద్ పోర్టల్',

    heroTitle: 'మీ ప్రయాణం ఇక్కడే ప్రారంభమవుతుంది',
    heroSubtitle: 'నిజ-సమయ సీట్ల లభ్యత, తక్షణ PNR ట్రాకింగ్ మరియు విశ్వసనీయ రైల్వే రిజర్వేషన్ అనుభవంతో భారతదేశమంతటా రైలు టిక్కెట్లను బుక్ చేసుకోండి.',
    heroBookJourneyBtn: 'మీ ప్రయాణాన్ని బుక్ చేసుకోండి',
    heroFastBooking: 'తక్షణ ధృవీకరణ & ప్రత్యక్ష PNR జారీ',

    searchCardTitle: 'రైలు టిక్కెట్లు బుక్ చేసుకోండి',
    searchFromStation: 'ప్రారంభ స్టేషన్',
    searchToStation: 'గమ్యస్థాన స్టేషన్',
    searchJourneyDate: 'ప్రయాణ తేదీ',
    searchTravelClass: 'తరగతి',
    searchQuota: 'కోటా',
    searchBtn: 'రైళ్లను శోధించండి',
    searchSwapStations: 'స్టేషన్లను మార్చండి',
    searchAllClasses: 'అన్ని తరగతులు',
    searchGeneralQuota: 'సాధారణ (GN)',
    searchTatkalQuota: 'తత్కాల్ (TQ)',
    searchLadiesQuota: 'మహిళలు (LD)',
    searchSeniorCitizenQuota: 'సీనియర్ సిటిజన్ (SS)',
    searchSameStationError: 'ప్రారంభ మరియు గమ్యస్థాన స్టేషన్లు ఒకేలా ఉండకూడదు.',
    searchPastDateError: 'గతించిన తేదీని ప్రయాణ తేదీగా ఎంచుకోలేరు.',
    searchSelectBothError: 'దయచేసి ప్రారంభ మరియు గమ్యస్థాన స్టేషన్లను ఎంచుకోండి.',

    availResultsTitle: 'లభ్యమయ్యే రైళ్లు',
    availTrainsFound: 'రైళ్లు అందుబాటులో ఉన్నాయి',
    availNoTrainsFound: 'రైళ్లు కనుగొనబడలేదు',
    availNoTrainsMsg: 'ఎంచుకున్న మార్గంలో రైళ్లు లభ్యం కాలేదు. మరొక తేదీని ఎంచుకోండి లేదా స్టేషన్లను మార్చండి.',
    availDeparture: 'బయలుదేరే సమయం',
    availArrival: 'చేరుకునే సమయం',
    availDuration: 'ప్రయాణ సమయం',
    availRunsOn: 'నడిచే రోజులు',
    availSortBy: 'క్రమబద్ధీకరించు',
    availSortTime: 'సమయం ప్రకారం',
    availSortFare: 'తక్కువ ధర',
    availSortDuration: 'ప్రయాణ నిడివి',
    availFilterClass: 'తరగతి ప్రకారం ఫిల్టర్',
    availBookNow: 'ఇప్పుడే బుక్ చేయండి',
    availSeatsAvailable: 'అందుబాటులో ఉంది',
    availWaitingList: 'వెయిటింగ్ లిస్ట్',
    availRAC: 'RAC',

    bookingTitle: 'ప్రయాణీకులు & టికెట్ రిజర్వేషన్',
    bookingJourneySummary: 'ప్రయాణ వివరాలు',
    bookingTrainDetails: 'రైలు వివరాలు',
    bookingClassLabel: 'ఎంచుకున్న తరగతి',
    bookingPassengerDetails: 'ప్రయాణీకుల వివరాలు',
    bookingAddPassenger: '+ ప్రయాణీకుడిని జోడించండి',
    bookingRemovePassenger: 'తొలగించు',
    bookingMaxPassengers: 'ఒక బుకింగ్‌కు గరిష్టంగా 6 మంది ప్రయాణీకులు మాత్రమే',
    bookingPassengerName: 'పూర్తి పేరు',
    bookingPassengerAge: 'వయస్సు',
    bookingPassengerGender: 'లింగం',
    bookingPassengerBerth: 'బెర్త్ ప్రాధాన్యత',
    bookingMale: 'పురుషుడు',
    bookingFemale: 'స్త్రీ',
    bookingOther: 'ఇతర',
    bookingNoPreference: 'ప్రాధాన్యత లేదు',
    bookingLower: 'దిగువ బెర్త్ (Lower)',
    bookingMiddle: 'మధ్య బెర్త్ (Middle)',
    bookingUpper: 'ఎగువ బెర్త్ (Upper)',
    bookingSideLower: 'సైడ్ లోయర్ (Side Lower)',
    bookingSideUpper: 'సైడ్ అప్పర్ (Side Upper)',
    bookingWindow: 'కిటికీ సీటు (Window)',
    bookingFareSummary: 'ఛార్జీల గణన',
    bookingBaseFare: 'ప్రాథమిక ఛార్జీ',
    bookingGst: 'వస్తు మరియు సేవల పన్ను (GST 5%)',
    bookingConvenienceFee: 'IRCTC సేవా రుసుము',
    bookingTotalAmount: 'మొత్తం ఛార్జీ',
    bookingConfirmPay: 'ధృవీకరించి చెల్లించండి',
    bookingAgreeTerms: 'నేను భారతీయ రైల్వే నిబంధనలు మరియు రద్దు విధానానికి అంగీకరిస్తున్నాను',
    bookingSimulatedNotice: 'విద్యా ప్రాజెక్ట్ నోటీసు: ఇది ప్రదర్శన ప్రాజెక్ట్. ఎలాంటి వాస్తవ బ్యాంక్ లావాదేవీ జరగదు.',

    confirmSuccessTitle: 'బుకింగ్ విజయవంతంగా ధృవీకరించబడింది!',
    confirmSuccessSubtitle: 'మీ ఇ-టికెట్ రిజర్వేషన్ పూర్తయింది. ఒక కాపీ మీ ఖాతాలో భద్రపరచబడింది.',
    confirmPnr: 'PNR సంఖ్య',
    confirmBookingId: 'బుకింగ్ ఐడి',
    confirmBookingStatus: 'బుకింగ్ స్థితి',
    confirmStatusConfirmed: 'ధృవీకరించబడింది (CONFIRMED)',
    confirmPassengerList: 'ప్రయాణీకుల జాబితా',
    confirmCoachSeat: 'కోచ్ / బెర్త్',
    confirmDownloadTicket: 'టికెట్ డౌన్‌లోడ్ (PDF)',
    confirmPrintTicket: 'ఇ-టికెట్ ప్రింట్ చేయండి',
    confirmBackHome: 'హోమ్‌కు తిరిగి వెళ్లండి',
    confirmViewMyBookings: 'నా బుకింగ్‌లు చూడండి',
    confirmDisclaimer: 'గమనిక: ఇది విద్యా ప్రయోజనాల కోసం రూపొందించబడిన టికెట్. ప్రయాణ సమయంలో చెల్లుబాటు అయ్యే గుర్తింపు కార్డును కలిగి ఉండండి.',

    myBookingsTitle: 'నా రైల్వే బుకింగ్‌లు',
    myBookingsSubtitle: 'మీ రిజర్వ్ చేసిన ప్రయాణాల ఇ-టిక్కెట్లను వీక్షించండి, డౌన్‌లోడ్ చేయండి లేదా రద్దు చేయండి.',
    myBookingsEmpty: 'ఎటువంటి బుకింగ్‌లు లేవు',
    myBookingsEmptySub: 'మీరు ఇంకా ఎటువంటి రైలు టిక్కెట్లను రిజర్వ్ చేసుకోలేదు. రైళ్లను శోధించి మీ ప్రయాణాన్ని ప్రారంభించండి.',
    myBookingsBookTrainBtn: 'రైలు టికెట్ బుక్ చేసుకోండి',
    myBookingsViewTicket: 'టికెట్ వీక్షించండి',
    myBookingsCancelTicket: 'టికెట్ రద్దు చేయండి',
    myBookingsCancelConfirmTitle: 'టికెట్ రద్దును ధృవీకరించండి',
    myBookingsCancelConfirmMsg: 'మీరు ఖచ్చితంగా ఈ బుకింగ్‌ను రద్దు చేయాలనుకుంటున్నారా? భారతీయ రైల్వే నిబంధనల ప్రకారం రద్దు ఛార్జీలు వర్తిస్తాయి.',
    myBookingsCancelProceed: 'అవును, టికెట్ రద్దు చేయండి',
    myBookingsKeepBooking: 'కాదు, బుకింగ్ ఉంచండి',
    myBookingsStatusCancelled: 'రద్దు చేయబడింది (CANCELLED)',
    myBookingsRefundAmount: 'వాపసు మొత్తం',
    myBookingsCancellationCharges: 'రద్దు ఛార్జీలు',

    pnrTitle: 'మీ PNR స్థితిని తనిఖీ చేయండి',
    pnrSubtitle: 'మీ 10-అంకెల భారతీయ రైల్వే PNR కోసం ప్రత్యక్ష ధృవీకరణ మరియు సీటు స్థితిని పొందండి.',
    pnrInputLabel: '10-అంకెల PNR సంఖ్యను నమోదు చేయండి',
    pnrInputPlaceholder: 'ఉదా. 4528931047',
    pnrCheckBtn: 'స్థితిని తనిఖీ చేయండి',
    pnrClearBtn: 'క్లియర్ చేయండి',
    pnrQuickTest: 'నమూనా డెమో PNR:',
    pnrInvalidError: 'దయచేసి సరైన 10-అంకెల సంఖ్యాత్మక PNR సంఖ్యను నమోదు చేయండి.',
    pnrNotFoundError: 'రిజర్వేషన్ డేటాబేస్‌లో PNR సంఖ్య కనుగొనబడలేదు. దయచేసి సంఖ్యను తనిఖీ చేయండి.',
    pnrDetailsTitle: 'PNR రిజర్వేషన్ వివరాలు',
    pnrChartStatus: 'చార్ట్ తయారీ స్థితి',
    pnrChartNotPrepared: 'చార్ట్ ఇంకా సిద్ధం కాలేదు',

    loginTitle: 'ప్రయాణీకుల లాగిన్',
    loginSubtitle: 'మీ రిజర్వేషన్‌లు, బుకింగ్ చరిత్ర మరియు ఇ-టిక్కెట్లను యాక్సెస్ చేయండి.',
    loginEmailLabel: 'ఇమెయిల్ చిరునామా',
    loginPasswordLabel: 'పాస్‌వర్డ్',
    loginBtn: 'ఖాతాలోకి లాగిన్ అవ్వండి',
    loginNoAccount: 'IRCTC ఖాతా లేదా?',
    loginRegisterLink: 'కొత్త ప్రయాణీకుడిగా నమోదు చేసుకోండి',
    registerTitle: 'ప్రయాణీకుల నమోదు',
    registerSubtitle: 'రైల్వే రిజర్వేషన్ల కోసం మీ ప్రయాణీకుల ప్రొఫైల్‌ను సృష్టించండి.',
    registerFullName: 'పూర్తి పేరు',
    registerMobile: 'మొబైల్ సంఖ్య (10 అంకెలు)',
    registerConfirmPassword: 'పాస్‌వర్డ్ నిర్ధారణ',
    registerGender: 'లింగం',
    registerBtn: 'ఖాతాను సృష్టించండి',
    registerHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    registerLoginLink: 'ఇక్కడ సైన్ ఇన్ చేయండి',
    authFillAllFields: 'దయచేసి అవసరమైన అన్ని వివరాలను పూరించండి.',
    authInvalidEmail: 'దయచేసి సరైన ఇమెయిల్ చిరునామాను నమోదు చేయండి.',
    authInvalidMobile: 'దయచేసి సరైన 10-అంకెల భారతీయ మొబైల్ సంఖ్యను నమోదు చేయండి.',
    authPasswordMismatch: 'పాస్‌వర్డ్ మరియు నిర్ధారణ పాస్‌వర్డ్ సరిపోలడం లేదు.',
    authPasswordLength: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.',

    featTitle: 'రైల్ యాత్రను ఎందుకు ఎంచుకోవాలి?',
    featSubtitle: 'యాంగ్యులర్ స్టాండ్‌అలోన్ కాంపోనెంట్స్ మరియు బహుభాషా మద్దతుతో నిర్మించబడింది.',
    featVandeBharat: 'అతివేగ ఎక్స్‌ప్రెస్ నెట్‌వర్క్',
    featVandeBharatDesc: 'వందే భారత్, రాజధాని, శతాబ్ది రైళ్ల నిజ-సమయ షెడ్యూల్ మరియు సీట్ల లభ్యత.',
    featPnrTracking: 'తక్షణ PNR ట్రాకింగ్',
    featPnrTrackingDesc: 'ఖచ్చితమైన ప్రయాణీకుల బెర్త్ స్థితి మరియు కోచ్ నంబర్ వివరాలు.',
    featMultilingual: 'పూర్తి బహుభాషా మద్దతు',
    featMultilingualDesc: 'ఇంగ్లీష్, తెలుగు మరియు హిందీ మధ్య తక్షణ భాషా మార్పిడి.',
    featSecureBooking: 'పారదర్శక ఛార్జీల లెక్కింపు',
    featSecureBookingDesc: 'ప్రాథమిక ఛార్జీ, జీఎస్టీ మరియు ఐఆర్‌సిటిసి సేవా రుసుములతో కూడిన పూర్తి వివరాలు.',

    routesTitle: 'ప్రసిద్ధ భారతీయ రైల్వే మార్గాలు',
    routesSubtitle: 'భారతదేశ ప్రధాన నగరాల మధ్య ప్రముఖ ఎక్స్‌ప్రెస్ రైలు మార్గాలు.',

    footerAboutTitle: 'రైల్ యాత్ర - భారతీయ రైల్వే IRCTC క్లోన్',
    footerAboutText: 'యాంగ్యులర్ స్టాండ్‌అలోన్ భాగాలు, రియాక్టివ్ ఫారమ్‌లు, రౌట్ గార్డులు, లోకల్ స్టోరేజ్ మరియు XLIFF ఇంటర్నేషనలైజేషన్‌తో నిర్మించబడిన అకడమిక్ ప్రాజెక్ట్.',
    footerQuickLinks: 'త్వరిత లింకులు',
    footerHelplineTitle: 'ప్రయాణీకుల మద్దతు',
    footerHelplineText: '24x7 కస్టమర్ కేర్: 139 | ఈమెయిల్: care@railyatra.gov.in | భద్రత: 182',
    footerSecurityText: 'ధృవీకరించబడిన సురక్షిత రైల్వే పోర్టల్',
    footerAcademicNotice: 'విద్యా ప్రాజెక్ట్ నోటీసు: ఇది కేవలం ప్రదర్శన కోసం మాత్రమే. IRCTC లేదా రైల్వే మంత్రిత్వ శాఖతో సంబంధం లేదు.',
    footerCopyright: '© 2026 రైల్ యాత్ర పోర్టల్. విశ్వవిద్యాలయ అకడమిక్ ప్రాజెక్ట్ ప్రదర్శన కోసం అభివృద్ధి చేయబడింది.',
  },

  hi: {
    brandName: 'रेल यात्रा',
    brandTagline: 'भारतीय रेल आरक्षण प्रणाली',
    navHome: 'होम',
    navTrainSearch: 'ट्रेन खोज',
    navPnrStatus: 'पीएनआर स्थिति',
    navMyBookings: 'मेरी बुकिंग्स',
    navLogin: 'लॉग इन',
    navRegister: 'पंजीकरण',
    navLogout: 'लॉग आउट',
    navAcademicHub: 'एंगुलर आर्किटेक्चर एवं प्रोजेक्ट हब',
    emergencyAlert: 'आईआरसीटीसी हेल्पलाइन: 139 | सुरक्षा हेल्पलाइन: 182 | रेलमदद शिकायत पोर्टल',

    heroTitle: 'आपकी सुखद यात्रा यहीं से शुरू होती है',
    heroSubtitle: 'वास्तविक समय में सीट उपलब्धता, त्वरित पीएनआर ट्रैकिंग और प्रामाणिक भारतीय रेल आरक्षण अनुभव के साथ पूरे भारत में ट्रेन टिकट बुक करें।',
    heroBookJourneyBtn: 'अपनी यात्रा बुक करें',
    heroFastBooking: 'त्वरित पुष्टि एवं सीधा पीएनआर आवंटन',

    searchCardTitle: 'ट्रेन टिकट बुक करें',
    searchFromStation: 'प्रारंभिक स्टेशन',
    searchToStation: 'गंतव्य स्टेशन',
    searchJourneyDate: 'यात्रा तिथि',
    searchTravelClass: 'श्रेणी',
    searchQuota: 'कोटा',
    searchBtn: 'ट्रेन खोजें',
    searchSwapStations: 'स्टेशनों को बदलें',
    searchAllClasses: 'सभी श्रेणियां',
    searchGeneralQuota: 'सामान्य (GN)',
    searchTatkalQuota: 'तत्काल (TQ)',
    searchLadiesQuota: 'महिला (LD)',
    searchSeniorCitizenQuota: 'वरिष्ठ नागरिक (SS)',
    searchSameStationError: 'स्रोत और गंतव्य स्टेशन समान नहीं हो सकते।',
    searchPastDateError: 'यात्रा की तिथि अतीत में नहीं हो सकती।',
    searchSelectBothError: 'कृपया स्रोत और गंतव्य दोनों स्टेशनों का चयन करें।',

    availResultsTitle: 'उपलब्ध ट्रेनें',
    availTrainsFound: 'ट्रेनें उपलब्ध हैं',
    availNoTrainsFound: 'कोई ट्रेन नहीं मिली',
    availNoTrainsMsg: 'चयनित मार्ग और तिथि पर कोई सीधी ट्रेन नहीं मिली। कृपया कोई अन्य तिथि चुनें या स्टेशन बदलें।',
    availDeparture: 'प्रस्थान समय',
    availArrival: 'आगमन समय',
    availDuration: 'यात्रा अवधि',
    availRunsOn: 'संचालन दिवस',
    availSortBy: 'क्रमबद्ध करें',
    availSortTime: 'प्रस्थान समय अनुसार',
    availSortFare: 'न्यूनतम किराया',
    availSortDuration: 'यात्रा अवधि अनुसार',
    availFilterClass: 'श्रेणी अनुसार फ़िल्टर',
    availBookNow: 'अभी बुक करें',
    availSeatsAvailable: 'उपलब्ध',
    availWaitingList: 'प्रतीक्षा सूची (WL)',
    availRAC: 'आरएसी (RAC)',

    bookingTitle: 'यात्री विवरण एवं टिकट आरक्षण',
    bookingJourneySummary: 'यात्रा सारांश',
    bookingTrainDetails: 'ट्रेन विवरण',
    bookingClassLabel: 'चयनित यात्रा श्रेणी',
    bookingPassengerDetails: 'यात्री विवरण',
    bookingAddPassenger: '+ नया यात्री जोड़ें',
    bookingRemovePassenger: 'हटाएं',
    bookingMaxPassengers: 'प्रति बुकिंग अधिकतम 6 यात्रियों की अनुमति है',
    bookingPassengerName: 'पूरा नाम',
    bookingPassengerAge: 'आयु',
    bookingPassengerGender: 'लिंग',
    bookingPassengerBerth: 'बर्थ प्राथमिकता',
    bookingMale: 'पुरुष',
    bookingFemale: 'महिला',
    bookingOther: 'अन्य',
    bookingNoPreference: 'कोई प्राथमिकता नहीं',
    bookingLower: 'निचली बर्थ (Lower)',
    bookingMiddle: 'मध्य बर्थ (Middle)',
    bookingUpper: 'ऊपरी बर्थ (Upper)',
    bookingSideLower: 'साइड लोअर (Side Lower)',
    bookingSideUpper: 'साइड अपर (Side Upper)',
    bookingWindow: 'खिड़की वाली सीट (Window)',
    bookingFareSummary: 'किराया गणना',
    bookingBaseFare: 'मूल किराया',
    bookingGst: 'वस्तु एवं सेवा कर (GST 5%)',
    bookingConvenienceFee: 'आईआरसीटीसी सुविधा शुल्क',
    bookingTotalAmount: 'कुल देय किराया',
    bookingConfirmPay: 'पुष्टि करें और भुगतान करें',
    bookingAgreeTerms: 'मैं भारतीय रेलवे के आरक्षण नियमों और रद्दीकरण नीति से सहमत हूँ',
    bookingSimulatedNotice: 'शैक्षणिक प्रोजेक्ट सूचना: यह एक शैक्षणिक प्रदर्शन प्रोजेक्ट है। कोई वास्तविक बैंक लेनदेन नहीं होगा।',

    confirmSuccessTitle: 'बुकिंग सफलतापूर्वक पुष्ट हो गई!',
    confirmSuccessSubtitle: 'आपका ई-टिकट आरक्षण पूरा हो गया है। एक प्रति आपके खाते में सुरक्षित कर दी गई है।',
    confirmPnr: 'पीएनआर नंबर',
    confirmBookingId: 'बुकिंग आईडी',
    confirmBookingStatus: 'बुकिंग स्थिति',
    confirmStatusConfirmed: 'पुष्ट (CONFIRMED)',
    confirmPassengerList: 'पुष्ट यात्रियों की सूची',
    confirmCoachSeat: 'कोच / सीट नंबर',
    confirmDownloadTicket: 'टिकट डाउनलोड (PDF)',
    confirmPrintTicket: 'ई-टिकट प्रिंट करें',
    confirmBackHome: 'होम पेज पर जाएं',
    confirmViewMyBookings: 'मेरी बुकिंग्स देखें',
    confirmDisclaimer: 'सूचना: यह टिकट शैक्षणिक प्रदर्शन के लिए उत्पन्न किया गया है। यात्रा के दौरान वैध सरकारी पहचान पत्र साथ रखें।',

    myBookingsTitle: 'मेरी रेलवे बुकिंग्स',
    myBookingsSubtitle: 'अपनी आरक्षित यात्राओं के ई-टिकट देखें, डाउनलोड करें या रद्दीकरण प्रबंधित करें।',
    myBookingsEmpty: 'कोई बुकिंग उपलब्ध नहीं है',
    myBookingsEmptySub: 'आपने अभी तक कोई ट्रेन टिकट बुक नहीं किया है। ट्रेनें खोजें और अपनी यात्रा की योजना बनाएं।',
    myBookingsBookTrainBtn: 'ट्रेन टिकट बुक करें',
    myBookingsViewTicket: 'टिकट देखें',
    myBookingsCancelTicket: 'टिकट रद्द करें',
    myBookingsCancelConfirmTitle: 'टिकट रद्दीकरण की पुष्टि करें',
    myBookingsCancelConfirmMsg: 'क्या आप वाकई इस बुकिंग को रद्द करना चाहते हैं? भारतीय रेलवे के नियमों के अनुसार मानक रद्दीकरण शुल्क काटा जाएगा।',
    myBookingsCancelProceed: 'हाँ, टिकट रद्द करें',
    myBookingsKeepBooking: 'नहीं, बुकिंग रखें',
    myBookingsStatusCancelled: 'रद्द (CANCELLED)',
    myBookingsRefundAmount: 'वापसी राशि (Refund)',
    myBookingsCancellationCharges: 'रद्दीकरण शुल्क',

    pnrTitle: 'अपनी पीएनआर स्थिति जांचें',
    pnrSubtitle: 'अपने 10-अंकीय भारतीय रेलवे पीएनआर के लिए वास्तविक समय आरक्षण एवं कोच/बर्थ स्थिति प्राप्त करें।',
    pnrInputLabel: '10-अंकीय पीएनआर नंबर दर्ज करें',
    pnrInputPlaceholder: 'उदा. 4528931047',
    pnrCheckBtn: 'स्थिति जांचें',
    pnrClearBtn: 'साफ़ करें',
    pnrQuickTest: 'डेमो पीएनआर से जांचें:',
    pnrInvalidError: 'कृपया एक मान्य 10-अंकीय संख्यात्मक पीएनआर नंबर दर्ज करें।',
    pnrNotFoundError: 'आरक्षण डेटाबेस में यह पीएनआर नंबर नहीं मिला। कृपया नंबर जांचें या नया टिकट बुक करें।',
    pnrDetailsTitle: 'पीएनआर आरक्षण विवरण',
    pnrChartStatus: 'चार्ट स्थिति',
    pnrChartNotPrepared: 'चार्ट अभी तैयार नहीं हुआ है',

    loginTitle: 'यात्री लॉगिन',
    loginSubtitle: 'अपने आरक्षण, बुकिंग इतिहास और ई-टिकट डाउनलोड तक पहुंच प्राप्त करें।',
    loginEmailLabel: 'ईमेल पता',
    loginPasswordLabel: 'पासवर्ड',
    loginBtn: 'खाते में साइन इन करें',
    loginNoAccount: 'क्या आपके पास खाता नहीं है?',
    loginRegisterLink: 'नए यात्री के रूप में पंजीकरण करें',
    registerTitle: 'यात्री पंजीकरण',
    registerSubtitle: 'सहज रेलवे आरक्षण के लिए अपना यात्री प्रोफाइल बनाएं।',
    registerFullName: 'पूरा नाम',
    registerMobile: 'मोबाइल नंबर (10 अंक)',
    registerConfirmPassword: 'पासवर्ड की पुष्टि करें',
    registerGender: 'लिंग',
    registerBtn: 'खाता बनाएं',
    registerHaveAccount: 'क्या पहले से खाता है?',
    registerLoginLink: 'यहाँ साइन इन करें',
    authFillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
    authInvalidEmail: 'कृपया एक वैध ईमेल पता दर्ज करें।',
    authInvalidMobile: 'कृपया एक वैध 10-अंकीय भारतीय मोबाइल नंबर दर्ज करें।',
    authPasswordMismatch: 'पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।',
    authPasswordLength: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',

    featTitle: 'रेल यात्रा क्यों चुनें?',
    featSubtitle: 'एंगुलर स्टैंडअलोन कंपोनेंट्स एवं बहुभाषी सहयोग के साथ विकसित।',
    featVandeBharat: 'हाई-स्पीड एक्सप्रेस नेटवर्क',
    featVandeBharatDesc: 'वंदे भारत, राजधानी और शताब्दी ट्रेनों की वास्तविक समय अनुसूची एवं सीट उपलब्धता।',
    featPnrTracking: 'त्वरित पीएनआर ट्रैकिंग',
    featPnrTrackingDesc: 'सटीक यात्री बर्थ स्थिति, कोच नंबर एवं चार्टिंग अपडेट।',
    featMultilingual: 'पूर्ण बहुभाषी सहयोग',
    featMultilingualDesc: 'अंग्रेजी, तेलुगु और हिंदी में वास्तविक समय भाषा परिवर्तन एवं स्थानीयकरण।',
    featSecureBooking: 'पारदर्शी किराया गणना',
    featSecureBookingDesc: 'मूल किराया, जीएसटी और मानक आईआरसीटीसी सुविधा शुल्क का स्पष्ट विवरण।',

    routesTitle: 'प्रमुख भारतीय रेल मार्ग',
    routesSubtitle: 'भारत के प्रमुख वाणिज्यिक एवं तकनीकी केंद्रों के बीच लोकप्रिय रेल संपर्क।',

    footerAboutTitle: 'रेल यात्रा - भारतीय रेल आईआरसीटीसी क्लोन',
    footerAboutText: 'एंगुलर स्टैंडअलोन घटकों, रिएक्टिव फॉर्म्स, रूट गार्ड्स, लोकल स्टोरेज और XLIFF अंतर्राष्ट्रीयकरण के साथ निर्मित शैक्षणिक प्रोजेक्ट।',
    footerQuickLinks: 'त्वरित लिंक',
    footerHelplineTitle: 'यात्री सहायता',
    footerHelplineText: '24x7 ग्राहक सेवा: 139 | ईमेल: care@railyatra.gov.in | सुरक्षा: 182',
    footerSecurityText: 'सत्यापित सुरक्षित रेलवे पोर्टल',
    footerAcademicNotice: 'शैक्षणिक प्रोजेक्ट सूचना: केवल प्रदर्शन के लिए निर्मित। आईआरसीटीसी या रेल मंत्रालय से संबद्ध नहीं।',
    footerCopyright: '© 2026 रेल यात्रा पोर्टल। विश्वविद्यालय शैक्षणिक प्रदर्शन हेतु विकसित।',
  },
};
