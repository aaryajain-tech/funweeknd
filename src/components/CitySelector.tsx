import React, { useState } from 'react';
import { MapPin, Search, Check, ChevronDown, Sparkles, Building2, Globe } from 'lucide-react';
import { SUPPORTED_CITIES } from '../data/cityData';

interface CitySelectorProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  darkMode?: boolean;
  variant?: 'navbar' | 'hero' | 'compact';
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onSelectCity,
  darkMode = true,
  variant = 'navbar',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customCityInput, setCustomCityInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChooseCity = (city: string) => {
    onSelectCity(city);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleAddCustomCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    const formatted = customCityInput.trim();
    onSelectCity(formatted);
    setCustomCityInput('');
    setIsOpen(false);
  };

  const filteredCities = SUPPORTED_CITIES.filter(c =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left">
      
      {/* Trigger Button */}
      {variant === 'hero' ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-teal-500/20 hover:from-amber-500/30 hover:to-teal-500/30 border-2 border-amber-500/40 font-black text-sm shadow-xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>Active City: <strong className={darkMode ? 'text-amber-500' : 'text-amber-600'}>{selectedCity}</strong></span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
            darkMode
              ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-amber-500/50 hover:bg-slate-800'
              : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-amber-500/50 hover:bg-slate-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span className="truncate max-w-[110px] sm:max-w-[150px]">{selectedCity}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Modal / Dropdown Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`fixed sm:absolute left-1/2 sm:left-auto right-auto sm:right-0 top-24 sm:top-full mt-2 -translate-x-1/2 sm:translate-x-0 w-[92vw] sm:w-80 rounded-3xl border shadow-2xl z-50 p-4 space-y-4 animate-fade-in ${
          darkMode ? 'bg-slate-900/95 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Select Your Weekend City
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search or type custom city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Featured Cities */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Top Indian Metro Hubs
            </p>
            {filteredCities.map(city => {
              const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleChooseCity(city)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-900 font-black shadow-md'
                      : darkMode
                      ? 'hover:bg-slate-800 text-slate-300'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-900' : 'text-amber-500'}`} />
                    <span>{city}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-slate-900" />}
                </button>
              );
            })}
          </div>

          {/* Custom City Form */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Custom City / Global Location
            </p>
            <form onSubmit={handleAddCustomCity} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Pune, Jaipur, Tokyo..."
                value={customCityInput}
                onChange={e => setCustomCityInput(e.target.value)}
                className={`flex-1 px-3 py-1.5 rounded-xl text-xs border ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-black transition-all cursor-pointer shrink-0"
              >
                Go
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
