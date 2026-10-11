import React, { useState } from 'react';
import { Shirt, Sun, CloudRain, Thermometer, RefreshCw, AlertTriangle, Clock, Footprints, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { getOutfitForCityAndVibe, getWeatherAndTipsForCity } from '../data/cityData';
import { VibeType, WeatherInfo } from '../types';

interface OutfitGuideProps {
  currentVibe: VibeType;
  weather: WeatherInfo;
  setWeather: React.Dispatch<React.SetStateAction<WeatherInfo>>;
  darkMode: boolean;
  selectedCity: string;
}

export const OutfitGuide: React.FC<OutfitGuideProps> = ({
  currentVibe,
  weather,
  setWeather,
  darkMode,
  selectedCity,
}) => {
  const [selectedVibe, setSelectedVibe] = useState<VibeType>(currentVibe);
  const [isFetchingLive, setIsFetchingLive] = useState(false);

  const outfit = getOutfitForCityAndVibe(selectedCity, selectedVibe);
  const cityTips = getWeatherAndTipsForCity(selectedCity);

  // Refresh Live Weather via Server Endpoint
  const handleRefreshLiveWeather = async () => {
    setIsFetchingLive(true);
    try {
      const res = await fetch(`/api/chennai-live?city=${encodeURIComponent(selectedCity)}`);
      const data = await res.json();
      if (data && data.weather) {
        setWeather({
          temp: data.weather.temp || '30°C',
          condition: data.weather.condition || 'Partly Cloudy',
          humidity: data.weather.humidity || '68%',
          recommendation: data.weather.recommendation || `Plan outdoor spots post 4:30 PM in ${selectedCity}.`,
          isLive: true,
        });
      }
    } catch (err) {
      console.error('Failed to fetch live weather:', err);
    } finally {
      setIsFetchingLive(false);
    }
  };

  return (
    <div className="space-y-10 py-6">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold uppercase tracking-wide">
          <Shirt className="w-4 h-4" />
          <span>{selectedCity} Weather & Styling Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Outfit & Weather Intelligence
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Look effortlessly stylish while staying comfortable in {selectedCity}’s weekend weather.
        </p>
      </div>

      {/* Vibe Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(['chill', 'thrill', 'foodie', 'party', 'beach'] as const).map(vibeKey => {
          const isActive = selectedVibe === vibeKey;
          return (
            <button
              key={vibeKey}
              onClick={() => setSelectedVibe(vibeKey)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold capitalize transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {vibeKey} Vibe
            </button>
          );
        })}
      </div>

      {/* Main Outfit Showcase Card */}
      <div className={`p-6 sm:p-10 rounded-3xl border transition-all ${
        darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Outfit Banner */}
          <div className="lg:col-span-5 relative h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={outfit.image}
              alt={outfit.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500 text-slate-900">
                {outfit.vibe.toUpperCase()} FIT • {selectedCity}
              </span>
              <h3 className="text-xl font-extrabold">{outfit.title}</h3>
              <p className="text-xs text-slate-300 leading-snug">{outfit.subtitle}</p>
            </div>
          </div>

          {/* Detailed Outfit Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Recommended Look for {selectedCity}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {outfit.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase text-indigo-500 mb-1">Top wear</p>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">{outfit.top}</p>
              </div>

              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase text-indigo-500 mb-1">Bottom wear</p>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">{outfit.bottom}</p>
              </div>

              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase text-indigo-500 mb-1">Footwear</p>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">{outfit.footwear}</p>
              </div>

              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase text-indigo-500 mb-1">Accessories</p>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">{outfit.accessories}</p>
              </div>

            </div>

            {/* Vibe Tip Banner */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Styling Pro-Tip:</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{outfit.vibeTip}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Live Weather Widget */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-lg'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {selectedCity} Weekend Weather
                </h3>
                {weather.isLive && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                    Live Grounded
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Real-time condition & humidity tracker for {selectedCity}</p>
            </div>
          </div>

          <button
            onClick={handleRefreshLiveWeather}
            disabled={isFetchingLive}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isFetchingLive ? 'animate-spin' : ''}`} />
            <span>{isFetchingLive ? 'Searching Grounded Weather...' : `Fetch Live ${selectedCity} Weather`}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <Thermometer className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <span className="text-2xl font-black text-slate-900 dark:text-white">{weather.temp}</span>
            <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Temperature</p>
          </div>

          <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <CloudRain className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{weather.condition}</span>
            <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Sky Condition</p>
          </div>

          <div className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <ShieldCheck className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{weather.humidity}</span>
            <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Humidity Level</p>
          </div>
        </div>
      </div>

      {/* POINTS TO NOTE SECTION - STRICT MAXIMUM OF 3 CARDS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Points To Note ({selectedCity} Tips)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cityTips.tips.map((tip, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-4">
                {idx === 0 ? <Sun className="w-5 h-5" /> : idx === 1 ? <Clock className="w-5 h-5" /> : <Footprints className="w-5 h-5" />}
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
                {idx + 1}. {tip.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

