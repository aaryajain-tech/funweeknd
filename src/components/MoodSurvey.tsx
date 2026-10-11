import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Wallet, Bike, Users, Sparkles, Check, ArrowRight, Leaf, Dog } from 'lucide-react';
import { BudgetTier, CommuteMode, GroupSize, StartingLocation, SurveyState, VibeType } from '../types';
import { getStartingHubsForCity } from '../data/cityData';

interface MoodSurveyProps {
  onGenerate: (survey: SurveyState) => void;
  darkMode: boolean;
  selectedCity: string;
}

export const MoodSurvey: React.FC<MoodSurveyProps> = ({ onGenerate, darkMode, selectedCity }) => {
  const cityHubs = getStartingHubsForCity(selectedCity);

  const [survey, setSurvey] = useState<SurveyState>({
    vibe: 'chill',
    startingPoint: cityHubs[0]?.name || selectedCity,
    budget: 'reasonable',
    commute: 'rapido',
    groupSize: 'squad',
    city: selectedCity,
  });

  const [customArea, setCustomArea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default starting location when city changes
  useEffect(() => {
    const hubs = getStartingHubsForCity(selectedCity);
    setSurvey(prev => ({
      ...prev,
      startingPoint: hubs[0]?.name || selectedCity,
      city: selectedCity,
    }));
  }, [selectedCity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const finalSurvey = {
      ...survey,
      startingPoint: customArea.trim() ? customArea.trim() : survey.startingPoint,
      city: selectedCity,
    };
    setTimeout(() => {
      onGenerate(finalSurvey);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wide">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>30-Second Vibe Matching • {selectedCity}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Customize Your {selectedCity} Weekend
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Answer 5 quick questions below so we can tailor the perfect Saturday afternoon to Sunday evening plan for your squad in {selectedCity}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* QUESTION 1: Current Vibe */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-900 font-extrabold flex items-center justify-center text-sm shadow-md">
              1
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                What&apos;s the energy level?
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Select your primary weekend mood</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { id: 'chill', label: 'Chill & Aesthetic', desc: 'Courtyard cafes & quiet walks', icon: '🌿' },
              { id: 'thrill', label: 'Thrill & Action', desc: 'Water sports, games & outdoors', icon: '⚡' },
              { id: 'foodie', label: 'Foodie Rampage', desc: 'Street food trails & regional feasts', icon: '🍕' },
              { id: 'party', label: 'Party & Nightlife', desc: 'Microbreweries & live music', icon: '🎉' },
              { id: 'beach', label: 'Beach & Sunset', desc: 'Promenades, lakes & sunset decks', icon: '🌅' },
            ].map(opt => {
              const isSelected = survey.vibe === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSurvey({ ...survey, vibe: opt.id as VibeType })}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between h-32 relative cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                      : darkMode ? 'border-slate-700 hover:border-slate-600 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{opt.icon}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-500 font-bold" />}
                  </div>
                  <div>
                    <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{opt.label}</p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUESTION 2: Starting Point (Dynamic City Hubs) */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-900 font-extrabold flex items-center justify-center text-sm shadow-md">
              2
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Where are you starting from after 1 PM Saturday in {selectedCity}?
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Choose your starting neighborhood / area hub</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            {cityHubs.map(hub => {
              const isSelected = survey.startingPoint === hub.name && !customArea;
              return (
                <button
                  type="button"
                  key={hub.id}
                  onClick={() => {
                    setCustomArea('');
                    setSurvey({ ...survey, startingPoint: hub.name });
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between h-28 cursor-pointer ${
                    isSelected
                      ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/30'
                      : darkMode ? 'border-slate-700 hover:border-slate-600 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <MapPin className={`w-5 h-5 ${isSelected ? 'text-teal-500' : 'text-slate-500 dark:text-slate-400'}`} />
                  <div>
                    <p className="font-extrabold text-xs text-slate-900 dark:text-white">{hub.name}</p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">{hub.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Neighborhood Input Fallback */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              Or type a specific neighborhood in {selectedCity}:
            </p>
            <input
              type="text"
              placeholder={`e.g. My College Campus / ${selectedCity} Area Name`}
              value={customArea}
              onChange={e => {
                setCustomArea(e.target.value);
                if (e.target.value) {
                  setSurvey({ ...survey, startingPoint: e.target.value });
                }
              }}
              className={`w-full px-4 py-2.5 rounded-2xl text-xs border ${
                darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* QUESTION 3: Budget Category */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-900 font-extrabold flex items-center justify-center text-sm shadow-md">
              3
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                What&apos;s the pocket damage?
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Budget tier per person for the entire weekend</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'broke', title: 'Broke Student', range: '₹200 - ₹500', desc: 'Street food, free park/beach vibes, budget stalls' },
              { id: 'reasonable', title: 'Reasonable', range: '₹500 - ₹1,200', desc: 'Balanced cafes, movies, watersports, pizza' },
              { id: 'splurge', title: 'Splurge Weekend', range: '₹1,500+', desc: 'Gourmet dining, restobars, craft breweries' },
            ].map(opt => {
              const isSelected = survey.budget === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSurvey({ ...survey, budget: opt.id as BudgetTier })}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                      : darkMode ? 'border-slate-700 hover:border-slate-600 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <Wallet className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400'}`} />
                  <div>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      {opt.range}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1.5">{opt.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUESTION 4: Commute Mode */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500 text-slate-900 font-extrabold flex items-center justify-center text-sm shadow-md">
              4
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                How are you rolling around {selectedCity}?
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Primary mode of transport</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'bike', label: 'Bike / Scooter', desc: 'Breezy drives & easy parking' },
              { id: 'metro', label: `${selectedCity} Metro / Bus`, desc: 'Traffic-free & budget friendly' },
              { id: 'rapido', label: 'Rapido / Auto', desc: 'Quick door-to-door hops' },
              { id: 'cab', label: 'Cab with Friends', desc: 'AC chill with full squad' },
            ].map(opt => {
              const isSelected = survey.commute === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSurvey({ ...survey, commute: opt.id as CommuteMode })}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                      : darkMode ? 'border-slate-700 hover:border-slate-600 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <Bike className={`w-5 h-5 mb-2 ${isSelected ? 'text-indigo-500' : 'text-slate-500 dark:text-slate-400'}`} />
                  <p className="font-extrabold text-xs text-slate-900 dark:text-white">{opt.label}</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUESTION 5: Group Size */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-slate-900 font-extrabold flex items-center justify-center text-sm shadow-md">
              5
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Who&apos;s in the squad?
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Total size of your group</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'solo', label: 'Solo Explorer', desc: 'Me, myself & peaceful vibes' },
              { id: 'duo', label: 'Duo / Date', desc: 'Cozy seats & aesthetic cafes' },
              { id: 'squad', label: 'Squad (3-5)', desc: 'Standard college group fun' },
              { id: 'gang', label: 'Big Gang (6+)', desc: 'Large tables & food sharing' },
            ].map(opt => {
              const isSelected = survey.groupSize === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSurvey({ ...survey, groupSize: opt.id as GroupSize })}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30'
                      : darkMode ? 'border-slate-700 hover:border-slate-600 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <Users className={`w-5 h-5 mb-2 ${isSelected ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`} />
                  <p className="font-extrabold text-xs text-slate-900 dark:text-white">{opt.label}</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUESTION 6: Dietary & Pet Filters */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-900 font-extrabold flex items-center justify-center text-sm shadow-md">
              6
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Dietary & Pet Preferences
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Apply strict filters to your itinerary</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strict Veg Toggle */}
            <button
              type="button"
              onClick={() => setSurvey({ ...survey, vegOnly: !survey.vegOnly })}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                survey.vegOnly
                  ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                  : darkMode ? 'border-slate-700 hover:border-slate-600 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/80 text-slate-800'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${survey.vegOnly ? 'bg-emerald-500 text-slate-900' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-500'}`}>
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Strict 100% Pure Veg & Veg-Friendly
                  </h3>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    survey.vegOnly ? 'bg-emerald-500 border-emerald-500 text-slate-900' : 'border-slate-400'
                  }`}>
                    {survey.vegOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Recommends ONLY pure veg or veg-friendly cafes with guaranteed 100% vegetarian specialty dishes & badges.
                </p>
              </div>
            </button>

            {/* Pet-Friendly Toggle */}
            <button
              type="button"
              onClick={() => setSurvey({ ...survey, petFriendlyOnly: !survey.petFriendlyOnly })}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                survey.petFriendlyOnly
                  ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                  : darkMode ? 'border-slate-700 hover:border-slate-600 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/80 text-slate-800'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${survey.petFriendlyOnly ? 'bg-amber-500 text-slate-900' : 'bg-amber-500/20 text-amber-600 dark:text-amber-500'}`}>
                <Dog className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Verified Pet-Friendly Spots Only 🐾
                  </h3>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    survey.petFriendlyOnly ? 'bg-amber-500 border-amber-500 text-slate-900' : 'border-slate-400'
                  }`}>
                    {survey.petFriendlyOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Strictly verifies pet permission in outdoor/garden seating with specific pet guidelines on every card.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Submit Form Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-600 text-white font-black text-lg shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-6 h-6 animate-spin text-amber-200" />
                <span>Building Your Custom {selectedCity} Plan...</span>
              </>
            ) : (
              <>
                <Compass className="w-6 h-6 text-amber-200" />
                <span>Generate My Customized Itinerary for {selectedCity}</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

