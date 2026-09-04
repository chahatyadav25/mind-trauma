import React, { useState } from 'react';
import { INITIAL_RESOURCES } from '../data/screeningData';
import { ResourceItem } from '../types';
import { Search, Phone, Bookmark, ArrowUpRight, Sparkles } from 'lucide-react';

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
    <div className="flex flex-col w-full max-w-[46rem] mx-auto px-4 py-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 font-display">Support &amp; Resources</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
          Verified helplines, clinical treatment directories, and somatic grounding tools vetted by trauma specialists.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-2 mb-3.5">
        <Search className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search coping techniques, helplines, therapists..."
          className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none"
        />
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {[
          { id: 'all', label: 'All' },
          { id: 'crisis', label: 'Crisis Support' },
          { id: 'grounding', label: 'Coping & Grounding' },
          { id: 'care', label: 'Professional Care' },
          { id: 'sleep', label: 'Sleep & Calming' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap shrink-0 ${
              activeCategory === cat.id
                ? 'bg-black text-white font-semibold shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Direct 988 Card */}
      <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-2xl border border-red-200 shadow-2xs mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-display">988 Suicide &amp; Crisis Lifeline</h3>
            <p className="text-xs text-gray-600">Available 24/7 across the US &amp; Canada • Free &amp; Confidential</p>
          </div>
        </div>
        <a
          href="tel:988"
          className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors whitespace-nowrap shadow-xs"
        >
          Call 988 Now
        </a>
      </div>

      {/* Resource Cards List */}
      <div className="flex flex-col gap-3 mb-6">
        {filteredResources.map((res) => (
          <article
            key={res.id}
            className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row gap-3 justify-between items-start"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
                  {res.badge}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">{res.meta}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 font-display">{res.title}</h3>
              <p className="text-xs text-gray-600 mb-2.5 leading-relaxed">{res.description}</p>

              {res.actionType === 'modal' ? (
                <button
                  type="button"
                  onClick={onOpenGrounding}
                  className="text-black text-xs font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>{res.actionLabel}</span>
                </button>
              ) : (
                <a
                  href={res.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black text-xs font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>{res.actionLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
                </a>
              )}
            </div>

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
              <Bookmark className={`w-5 h-5 ${res.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </article>
        ))}

        {filteredResources.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-xs bg-white rounded-2xl border border-gray-200">
            No resources match your search criteria. Try selecting "All" or searching for "grounding".
          </div>
        )}
      </div>
    </div>
  );
};
