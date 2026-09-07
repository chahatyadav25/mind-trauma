import React, { useState } from 'react';
import { INITIAL_RESOURCES } from '../data/screeningData';
import { ResourceItem } from '../types';
import { 
  Search, 
  Phone, 
  Bookmark, 
  ArrowUpRight, 
  Sparkles,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

interface ResourcesViewProps {
  onOpenGrounding: () => void;
  onOpenCrisis: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onOpenGrounding, onOpenCrisis }) => {
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [activeCategory, setActiveCategory] = useState<'all' | 'crisis' | 'grounding' | 'care' | 'sleep'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBookmark = (id: string) => {
    setResources(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const filteredResources = resources.filter(res => {
    const matchesCategory = activeCategory === 'all' || res.category === activeCategory;
    const matchesQuery =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-red-600 font-bold uppercase tracking-wider font-display">
            Evidence-Based Directory
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-medium">
            Vetted Trauma Resources
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-950 font-display">
          Support &amp; Recovery Resources
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
          Verified national helplines, specialized clinical trauma directories, and interactive somatic regulation exercises vetted by mental health clinicians.
        </p>
      </div>

      {/* Emergency Crisis India Callout Card */}
      <div className="bg-gradient-to-r from-red-50 via-white to-red-50/40 p-5 sm:p-6 rounded-3xl border border-red-200 shadow-2xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-950 font-display">
                Tele-MANAS: National Tele Mental Health Helpline
              </h2>
              <span className="text-[10px] uppercase font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-full border border-red-200">
                14416 • 24/7 Free &amp; Confidential
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Govt of India 24/7 mental health counseling across 20+ regional Indian languages. For immediate emergency danger, dial 112.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <a
            href="tel:14416"
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs sm:text-sm font-bold hover:bg-red-700 transition-colors whitespace-nowrap shadow-xs text-center"
          >
            Call 14416
          </a>
          <button
            type="button"
            onClick={onOpenCrisis}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white text-red-700 border border-red-200 text-xs sm:text-sm font-bold hover:bg-red-50 transition-colors whitespace-nowrap shadow-2xs text-center cursor-pointer"
          >
            All Helplines
          </button>
        </div>
      </div>

      {/* Controls Bar: Search & Category Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'crisis', label: 'Crisis Support' },
            { id: 'grounding', label: 'Somatic & Grounding' },
            { id: 'care', label: 'Professional Care' },
            { id: 'sleep', label: 'Sleep & Calming' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-black text-white font-semibold shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 font-medium border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-2 w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, topics..."
            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Resource Cards Grid (3 Columns on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filteredResources.map((res) => (
          <article
            key={res.id}
            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-bold border border-teal-200/70">
                  {res.badge}
                </span>
                <button
                  type="button"
                  onClick={() => toggleBookmark(res.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    res.isBookmarked
                      ? 'text-black bg-gray-100'
                      : 'text-gray-400 hover:text-black hover:bg-gray-50'
                  }`}
                  title={res.isBookmarked ? 'Bookmarked' : 'Bookmark resource'}
                >
                  <Bookmark className={`w-4 h-4 ${res.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h2 className="text-base font-bold text-gray-950 mb-2 font-display leading-tight">
                {res.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-medium">{res.meta}</span>

              {res.actionType === 'modal' ? (
                <button
                  type="button"
                  onClick={onOpenGrounding}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-900 text-xs font-semibold hover:bg-teal-100 transition-colors inline-flex items-center gap-1 cursor-pointer border border-teal-200/60"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>{res.actionLabel}</span>
                </button>
              ) : (
                <a
                  href={res.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-900 text-xs font-semibold hover:bg-gray-200 transition-colors inline-flex items-center gap-1 border border-gray-200"
                >
                  <span>{res.actionLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 px-4 bg-white rounded-3xl border border-gray-200 text-gray-500 text-sm">
          No resources found matching your search. Try adjusting keywords or selecting "All Resources".
        </div>
      )}
    </div>
  );
};
