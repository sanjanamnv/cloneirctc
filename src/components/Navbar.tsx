import React, { useState } from 'react';
import { 
  Train, 
  Search, 
  Ticket, 
  FileText, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Globe, 
  Menu, 
  X, 
  GraduationCap,
  PhoneCall
} from 'lucide-react';
import { Language, User } from '../types';
import { Translations } from '../services/i18n';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  translations: Translations;
  onOpenAcademicHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  currentUser,
  onLogout,
  currentLang,
  onLanguageChange,
  translations: t,
  onOpenAcademicHub,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Train },
    { id: 'search', label: t.navTrainSearch, icon: Search },
    { id: 'pnr', label: t.navPnrStatus, icon: Ticket },
    { id: 'bookings', label: t.navMyBookings, icon: FileText, authRequired: true },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English (IN)' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు (IN)' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी (IN)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f2d59] text-white shadow-md border-b border-[#1b3d73] no-print">
      {/* Top Utility Ticker Bar */}
      <div className="bg-[#0a1e3b] text-slate-300 text-xs py-1.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>IRCTC Helpline: 139</span>
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline">Security Helpline: 182</span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline">RailMadad Complaint & Suggestion Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAcademicHub}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 font-medium transition-colors"
              title="View Angular Standalone project architecture & code"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Angular Academic Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo Zone */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white">{t.brandName}</span>
                <span className="text-[10px] font-semibold uppercase bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded tracking-wider">
                  IRCTC
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-wide font-normal">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold shadow-inner'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Language Selector Zone */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {languages.find(l => l.code === currentLang)?.nativeName || 'English'}
                </span>
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setLangDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black/10 py-1 z-20 text-slate-900 border border-slate-200 animate-in fade-in duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Select Language (భాష / भाषा)
                    </div>
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          currentLang === lang.code ? 'font-bold text-[#0f2d59] bg-blue-50/60' : 'text-slate-700'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        {currentLang === lang.code && (
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* User Session Zone */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/10 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{currentUser.fullName.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/10 py-1.5 z-20 text-slate-900 border border-slate-200">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900">{currentUser.fullName}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleNavClick('bookings');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>{t.navMyBookings}</span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 mt-1"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>{t.navLogout}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>{t.navLogin}</span>
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t.navRegister}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c2447] border-t border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Language Switcher */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Language / భాష / भाषा</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`py-1.5 text-xs rounded-md text-center font-medium ${
                    currentLang === lang.code
                      ? 'bg-white text-slate-900 font-bold'
                      : 'bg-white/10 text-slate-200 hover:bg-white/15'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Auth Status */}
          <div className="pt-2 border-t border-white/10">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1 text-sm text-slate-200">
                  <UserIcon className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">{currentUser.fullName}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-500/20 text-rose-300 text-sm font-medium hover:bg-rose-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.navLogout}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="py-2 text-center rounded-lg bg-white/10 text-white text-sm font-medium"
                >
                  {t.navLogin}
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="py-2 text-center rounded-lg bg-amber-400 text-slate-950 text-sm font-medium"
                >
                  {t.navRegister}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
