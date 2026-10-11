import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  onNavigate: (tab: 'home' | 'survey' | 'itinerary' | 'outfit' | 'saved') => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, onNavigate }) => {
  return (
    <footer className={`border-t transition-colors duration-300 mt-20 ${
      darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-black dark:text-white">
                FunWeeknd
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              The ultimate multi-city weekend activity & itinerary planner designed specifically for college students and young adults.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-500">
              <Heart className="w-3.5 h-3.5 fill-amber-500" />
              <span>Tested by students across IITM, Anna Univ, Loyola, SRM, VIT & SSN</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-500 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('survey')} className="hover:text-amber-500 transition-colors">
                  Mood Survey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('itinerary')} className="hover:text-amber-500 transition-colors">
                  Itinerary Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('outfit')} className="hover:text-amber-500 transition-colors">
                  Outfit & Weather
                </button>
              </li>
            </ul>
          </div>

          {/* Hotspots */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
              Chennai Hotspot Hubs
            </h4>
            <ul className="space-y-1 text-xs">
              <li>• Besant Nagar (Elliot&apos;s Beach)</li>
              <li>• ECR & Kovalam Beachfront</li>
              <li>• Nungambakkam & Harrington Rd</li>
              <li>• Sowcarpet Food Walk Trail</li>
              <li>• Guindy Kathipara Urban Square</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FunWeeknd. All rights reserved.</p>
          <p className="font-semibold text-amber-500">Turn Your Confusion Plans Into An Unforgettable Weekend!</p>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-200/40 dark:border-slate-800/60 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
          Created with Vibes and Love by AARYA JAIN ❤️
        </div>

      </div>
    </footer>
  );
};
