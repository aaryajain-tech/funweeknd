import React, { useState } from 'react';
import { Bookmark, Share2, Trash2, Calendar, MapPin, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { ItineraryPlan } from '../types';

interface SavedPlansProps {
  savedPlans: ItineraryPlan[];
  onLoadPlan: (plan: ItineraryPlan) => void;
  onDeletePlan: (planId: string) => void;
  darkMode: boolean;
}

export const SavedPlans: React.FC<SavedPlansProps> = ({
  savedPlans,
  onLoadPlan,
  onDeletePlan,
  darkMode,
}) => {
  const [selectedPlanForShare, setSelectedPlanForShare] = useState<ItineraryPlan | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate WhatsApp Clean Text Format
  const generateShareableText = (plan: ItineraryPlan) => {
    let text = `🔥 *VIBEWEEK CHENNAI SQUAD PLAN* 🔥\n`;
    text += `*Vibe:* ${plan.survey.vibe.toUpperCase()} | *Starting:* ${plan.survey.startingPoint.toUpperCase()}\n`;
    text += `*Est. Cost:* ${plan.totalEstCost} / person\n\n`;

    plan.items.forEach((item, idx) => {
      text += `📍 *${idx + 1}. ${item.day} ${item.time} - ${item.venue}* (${item.neighborhood})\n`;
      text += `   • *Must-Try:* ${item.mustTry}\n`;
      text += `   • *Avg Cost:* ${item.estCostPerPerson}\n\n`;
    });

    text += `⚡ Planned via VibeWeek Chennai!`;
    return text;
  };

  const handleCopyText = (plan: ItineraryPlan) => {
    const text = generateShareableText(plan);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-wide">
          <Bookmark className="w-4 h-4" />
          <span>Local Storage Bookmarks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Saved Squad Itineraries
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Access your saved weekend plans or share formatted WhatsApp breakdowns directly with your squad.
        </p>
      </div>

      {/* Saved Plans List */}
      {savedPlans.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4`}>
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl">
            📍
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Saved Plans Yet</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Generate a custom weekend itinerary from the Mood Survey page and click &quot;Save Plan&quot; to bookmark it here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedPlans.map(plan => (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl border transition-all space-y-4 relative ${
                darkMode ? 'bg-slate-800/80 border-slate-700 hover:border-amber-500/40' : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[10px] font-black uppercase tracking-wider">
                    {plan.survey.vibe} Vibe
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                    {plan.name}
                  </h3>
                </div>

                <button
                  onClick={() => onDeletePlan(plan.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Delete saved plan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 border-y py-3 border-slate-200 dark:border-slate-700">
                <p className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Created {plan.createdAt}</span>
                </p>
                <p className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-teal-500" />
                  <span>{plan.items.length} Venues • Est. {plan.totalEstCost} / person</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onLoadPlan(plan)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs transition-all cursor-pointer shadow-md"
                >
                  View Itinerary
                </button>

                <button
                  onClick={() => setSelectedPlanForShare(plan)}
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {selectedPlanForShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className={`max-w-lg w-full p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-5 ${
            darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                Share Plan With Squad
              </h3>
              <button
                onClick={() => setSelectedPlanForShare(null)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Copy this clean WhatsApp format to paste directly into your college group chat:
            </p>

            <textarea
              readOnly
              rows={10}
              value={generateShareableText(selectedPlanForShare)}
              className={`w-full p-4 rounded-2xl border text-xs font-mono leading-relaxed ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCopyText(selectedPlanForShare)}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text for WhatsApp'}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(generateShareableText(selectedPlanForShare))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <span>Open WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
