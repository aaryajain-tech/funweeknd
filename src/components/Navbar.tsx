import React from 'react';
import { Compass, Sparkles, Shirt, Bookmark, Sun, Moon, MapPin } from 'lucide-react';
import { WeatherInfo } from '../types';
import { CitySelector } from './CitySelector';

interface NavbarProps {
  activeTab: 'home' | 'survey' | 'itinerary' | 'outfit' | 'saved';
  setActiveTab: (tab: 'home' | 'survey' | 'itinerary' | 'outfit' | 'saved') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  weather: WeatherInfo;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  weather,
  selectedCity,
  onSelectCity,
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      darkMode ? 'bg-slate-900/85 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo & City Selector */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-teal-500 to-indigo-600 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
                  FunWeeknd
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none">Multi-City Weekend Planner</p>
            </div>
          </div>

          {/* City Selector Component in Header */}
          <div className="hidden lg:block border-l pl-3 border-slate-700/60">
            <CitySelector
              selectedCity={selectedCity}
              onSelectCity={onSelectCity}
              darkMode={darkMode}
              variant="navbar"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg transition-all ${
              activeTab === 'home'
                ? 'bg-amber-500/10 text-amber-500 font-bold'
                : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('survey')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'survey'
                ? 'bg-amber-500/10 text-amber-500 font-bold'
                : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500" />
            Mood Survey
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'itinerary'
                ? 'bg-amber-500/10 text-amber-500 font-bold'
                : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-teal-500" />
            Itinerary
          </button>
          <button
            onClick={() => setActiveTab('outfit')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'outfit'
                ? 'bg-amber-500/10 text-amber-500 font-bold'
                : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shirt className="w-4 h-4 text-indigo-500" />
            Outfit & Weather
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-amber-500/10 text-amber-500 font-bold'
                : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-4 h-4 text-rose-500" />
            Saved Plans
          </button>
        </nav>

        {/* Right Header Widget: City Selector (Medium screens), Weather & Theme Toggle */}
        <div className="flex items-center gap-2">
          
          <div className="lg:hidden">
            <CitySelector
              selectedCity={selectedCity}
              onSelectCity={onSelectCity}
              darkMode={darkMode}
              variant="compact"
            />
          </div>

          {/* Live Weather Badge */}
          <div 
            onClick={() => setActiveTab('outfit')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold cursor-pointer hover:bg-amber-500/20 transition-all"
            title="Click to view live weather & outfit guide"
          >
            <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>{weather.temp}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">| {weather.condition}</span>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className={`md:hidden flex items-center justify-around border-t py-2 px-2 text-xs font-medium ${
        darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'home' ? 'text-amber-500 font-bold' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('survey')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'survey' ? 'text-amber-500 font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Survey</span>
        </button>
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'itinerary' ? 'text-amber-500 font-bold' : 'text-slate-500'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Itinerary</span>
        </button>
        <button
          onClick={() => setActiveTab('outfit')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'outfit' ? 'text-amber-500 font-bold' : 'text-slate-500'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>Outfit</span>
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'saved' ? 'text-amber-500 font-bold' : 'text-slate-500'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
      </div>
    </header>
  );
};

