import React from 'react';
import { Compass, Sparkles, Navigation, Utensils, Shirt, Sun, ArrowRight, Flame, HeartHandshake, Star } from 'lucide-react';
import { getSpotsForCity } from '../data/cityData';
import { getVenueRatingStats } from '../utils/reviewsManager';
import { CitySelector } from './CitySelector';

interface HeroSectionProps {
  onStartSurvey: () => void;
  onSelectSpot: (spotId: string) => void;
  darkMode: boolean;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSurvey,
  onSelectSpot,
  darkMode,
  selectedCity,
  onSelectCity,
}) => {
  const trendingSpots = getSpotsForCity(selectedCity).slice(0, 4);

  return (
    <div className="space-y-16 py-6 pb-12">
      
      {/* Main Hero Header Banner */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-teal-500/5 to-indigo-600/10 shadow-2xl backdrop-blur-xl">
        
        {/* Background Decorative Glow Blobs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          {/* Top Pill Badges with City Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>FunWeeknd Multi-City Planner</span>
            </div>

            {/* City Selector embedded right on Hero */}
            <CitySelector
              selectedCity={selectedCity}
              onSelectCity={onSelectCity}
              darkMode={darkMode}
              variant="hero"
            />
          </div>

          {/* Hero Title */}
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Turn Your Confusion Plans In{' '}
            <span className={`underline underline-offset-4 ${darkMode ? 'text-amber-500 decoration-amber-500/40' : 'text-amber-600 decoration-amber-600/40'}`}>
              {selectedCity}
            </span>{' '}
            Into An{' '}
            <span className="bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
              Unforgettable Weekend!
            </span>
          </h1>

          <p className={`text-base sm:text-lg font-normal leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Ditch the boring &quot;where should we go?&quot; WhatsApp loops. Answer 5 quick vibe questions to get a customized, 
            chronological itinerary in <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{selectedCity}</strong> with exact dish recommendations, 
            commute calculations, and outfit guides!
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartSurvey}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-600 text-white font-extrabold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-amber-200 animate-spin-slow" />
              <span>Plan My Weekend in {selectedCity}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#features"
              className={`px-6 py-4 rounded-2xl font-bold text-sm border transition-all ${
                darkMode
                  ? 'border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              Explore Features
            </a>
          </div>

          {/* Trust Metrics */}
          <div className={`flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Curated Aesthetic Spots for {selectedCity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-teal-500" />
              <span>Tested by Local College Squads & Young Adults</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Overview Cards Section */}
      <section id="features" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Everything You Need For The Ultimate Weekend
          </h2>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Engineered specifically for {selectedCity} climate, traffic networks, and budget tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Mood Matching */}
          <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
            darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className={`font-extrabold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Mood Matching</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Match your exact vibe: Chill Beach, Foodie Rampage, Thrill & Watersports, or Party Nightlife in {selectedCity}.
            </p>
          </div>

          {/* Card 2: Route & Distance Calc */}
          <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
            darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-3">
              <Navigation className="w-5 h-5" />
            </div>
            <h3 className={`font-extrabold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Route & Distance Calc</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Calculates exact transit times between consecutive spots based on bike, metro, or cab in {selectedCity}.
            </p>
          </div>

          {/* Card 3: Specialty Dishes */}
          <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
            darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className={`font-extrabold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Specialty Dishes</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Never order blind — highlighted MUST-TRY dishes for every venue tailored to local {selectedCity} specialties.
            </p>
          </div>

          {/* Card 4: Outfit Visualizer */}
          <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
            darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
              <Shirt className="w-5 h-5" />
            </div>
            <h3 className={`font-extrabold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Outfit Visualizer</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Style guides matched to {selectedCity} microclimate and venue vibes so you look camera-ready.
            </p>
          </div>

          {/* Card 5: Weather Alert */}
          <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
            darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className={`font-extrabold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Weather Alert</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Live temperature conditions and crucial traffic warnings for {selectedCity} so you stay ahead.
            </p>
          </div>

        </div>
      </section>

      {/* Trending Spots Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              🔥 Trending Hot Spots In {selectedCity}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Handpicked aesthetic favorites across {selectedCity} neighborhoods
            </p>
          </div>
          <button
            onClick={onStartSurvey}
            className="text-xs font-bold text-amber-500 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
          >
            Generate Full Plan <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingSpots.map(spot => {
            const stats = getVenueRatingStats(spot.name);
            return (
              <div
                key={spot.id}
                onClick={() => onSelectSpot(spot.id)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 ${
                  darkMode ? 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50' : 'bg-white border-slate-200 shadow-md hover:shadow-xl'
                }`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-900/80 text-amber-400 backdrop-blur-md border border-amber-400/30">
                      {spot.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                    ₹{spot.avgCost} / person
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{spot.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-black shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{stats.avgRating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-amber-500 flex items-center gap-1">
                    <span>📍</span> {spot.area}
                  </p>

                  {/* Must Try Dish Banner */}
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-slate-700 dark:text-amber-200 font-medium">
                    <span className="font-bold text-amber-600 dark:text-amber-400">Must-Try:</span> {spot.mustTry}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

