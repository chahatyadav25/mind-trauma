import React, { useState } from 'react';
import { WeeklyTrendDay } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

interface WeeklyMoodGraphProps {
  days: WeeklyTrendDay[];
  onStartAssessment?: () => void;
}

const SCORE_LEVELS = [
  { score: 5, label: 'Optimal', emoji: '😊' },
  { score: 4, label: 'Good', emoji: '🙂' },
  { score: 3, label: 'Moderate', emoji: '😐' },
  { score: 2, label: 'Low', emoji: '🙁' },
  { score: 1, label: 'Very Low', emoji: '😔' },
];

export const WeeklyMoodGraph: React.FC<WeeklyMoodGraphProps> = ({ days, onStartAssessment }) => {
  const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);

  // SVG Chart Geometry
  const svgWidth = 640;
  const svgHeight = 230;
  const padLeft = 85;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 45;

  const chartWidth = svgWidth - padLeft - padRight;
  const chartHeight = svgHeight - padTop - padBottom;

  // Y Coordinate for Assessment score (0 to 5, where 5 is top and 0 is baseline)
  const getY = (score: number) => {
    const clamped = Math.max(0, Math.min(5, score));
    return padTop + chartHeight - (clamped / 5) * chartHeight;
  };

  // X Coordinate for Day Index (0 to 6)
  const getX = (index: number) => {
    return padLeft + (index / 6) * chartWidth;
  };

  // Group contiguous segments of days that have recorded assessment scores
  const segments: { index: number; x: number; y: number; score: number }[][] = [];
  let currentSegment: { index: number; x: number; y: number; score: number }[] = [];

  days.forEach((day, index) => {
    if (day.assessment && typeof day.assessment.score === 'number') {
      currentSegment.push({
        index,
        x: getX(index),
        y: getY(day.assessment.score),
        score: day.assessment.score
      });
    } else {
      if (currentSegment.length > 0) {
        segments.push(currentSegment);
        currentSegment = [];
      }
    }
  });
  if (currentSegment.length > 0) {
    segments.push(currentSegment);
  }

  // Active selected day for details card (default to today if has assessment or last recorded)
  const selectedDay = activeDayIndex !== null 
    ? days[activeDayIndex] 
    : days.find(d => d.isToday && d.assessment) || [...days].reverse().find(d => d.assessment) || days.find(d => d.isToday) || days[0];

  const recordedCount = days.filter(d => d.assessment).length;

  return (
    <div className="flex flex-col w-full">
      {/* SVG Canvas Container */}
      <div className="relative w-full overflow-x-auto select-none bg-gradient-to-b from-gray-50/50 to-white rounded-2xl p-2 border border-gray-100">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto min-w-[500px]"
          aria-label="Weekly Well-Being & Mood Trend Graph"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <filter id="pointShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Background Grid Lines & Score Labels */}
          {SCORE_LEVELS.map(level => {
            const y = getY(level.score);
            return (
              <g key={level.score} className="text-gray-400">
                {/* Subtle horizontal gridline */}
                <line
                  x1={padLeft - 10}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                {/* Y-axis Score Label & Emoji */}
                <text
                  x={padLeft - 16}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[11px] font-sans fill-gray-500 font-medium"
                >
                  <tspan className="text-[12px]">{level.emoji} </tspan>
                  <tspan>{level.score}/5</tspan>
                </text>
              </g>
            );
          })}

          {/* Baseline (0 score line) */}
          <line
            x1={padLeft - 10}
            y1={getY(0)}
            x2={svgWidth - padRight}
            y2={getY(0)}
            stroke="#F3F4F6"
            strokeWidth="1"
          />

          {/* Today Highlight Column */}
          {days.map((day, idx) => {
            if (!day.isToday) return null;
            const x = getX(idx);
            return (
              <g key="today-highlight">
                <rect
                  x={x - 22}
                  y={padTop - 10}
                  width="44"
                  height={chartHeight + 20}
                  rx="10"
                  fill="#0D9488"
                  fillOpacity="0.05"
                  stroke="#0D9488"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Line Segments between Contiguous Recorded Days */}
          {segments.map((seg, sIdx) => {
            if (seg.length < 2) return null;
            const pathD = seg.reduce((acc, pt, i) => {
              return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
            }, '');

            return (
              <g key={`seg-${sIdx}`}>
                {/* Thick background line for glow */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#0D9488"
                  strokeOpacity="0.2"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Primary Trend Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {/* Day Nodes & X-Axis Column Headers */}
          {days.map((day, idx) => {
            const x = getX(idx);
            const hasAssessment = !!day.assessment;
            const hasNumericScore = hasAssessment && typeof day.assessment?.score === 'number';
            const y = hasNumericScore ? getY(day.assessment!.score) : null;
            const isSelected = selectedDay && selectedDay.dateStr === day.dateStr;

            return (
              <g
                key={day.dateStr}
                className="cursor-pointer group"
                onClick={() => setActiveDayIndex(idx)}
              >
                {/* Vertical subtle guide */}
                <line
                  x1={x}
                  y1={padTop}
                  x2={x}
                  y2={padTop + chartHeight}
                  stroke="#F3F4F6"
                  strokeWidth="1"
                />

                {/* Data Point Node */}
                {hasNumericScore && y !== null ? (
                  <g filter="url(#pointShadow)">
                    {/* Pulsing selection ring */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="none"
                        stroke="#0D9488"
                        strokeWidth="2.5"
                        strokeDasharray="3 3"
                      />
                    )}
                    {/* Node base circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="7.5"
                      fill="#0D9488"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="transition-transform group-hover:scale-125"
                    />
                    {/* Inner core */}
                    <circle cx={x} cy={y} r="2.5" fill="#FFFFFF" />

                    {/* Small score label badge above node */}
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="text-[10px] font-bold fill-teal-800 font-sans select-none"
                    >
                      {day.assessment!.score}/5
                    </text>
                  </g>
                ) : (
                  /* Missing Day (No Invented Data) */
                  <g opacity="0.6">
                    <circle
                      cx={x}
                      cy={padTop + chartHeight / 2}
                      r="4.5"
                      fill="none"
                      stroke="#D1D5DB"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  </g>
                )}

                {/* X-Axis Labels */}
                <text
                  x={x}
                  y={svgHeight - padBottom + 18}
                  textAnchor="middle"
                  className={`text-xs font-sans font-bold transition-colors ${
                    day.isToday
                      ? 'fill-teal-800'
                      : isSelected
                      ? 'fill-gray-900'
                      : 'fill-gray-500'
                  }`}
                >
                  {day.dayName}
                </text>

                <text
                  x={x}
                  y={svgHeight - padBottom + 32}
                  textAnchor="middle"
                  className={`text-[11px] font-sans ${
                    day.isToday
                      ? 'fill-teal-700 font-bold'
                      : 'fill-gray-400 font-medium'
                  }`}
                >
                  {day.dayOfMonth}
                </text>

                {/* Today Small Pill */}
                {day.isToday && (
                  <rect
                    x={x - 13}
                    y={svgHeight - padBottom + 36}
                    width="26"
                    height="3"
                    rx="1.5"
                    fill="#0D9488"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend & Missing Day Assurance */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 mt-2 px-1">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block shadow-2xs" />
            <span className="font-medium text-gray-700">Recorded Assessment</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-gray-400 inline-block" />
            <span>Unrecorded Day (No data invented)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-50 border border-teal-300 inline-block" />
            <span className="text-teal-800 font-semibold">Today</span>
          </span>
        </div>

        <span className="text-gray-400 text-[11px]">
          {recordedCount} of 7 days completed this week
        </span>
      </div>

      {/* Interactive Inspector Card for Selected Day */}
      {selectedDay && (
        <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2.5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-bold text-gray-950 font-display">
                {selectedDay.fullDayName}, {selectedDay.dateStr}
              </span>
              {selectedDay.isToday && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                  Today
                </span>
              )}
            </div>

            {selectedDay.assessment ? (
              <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                Assessment Recorded
              </span>
            ) : (
              <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                No entry recorded
              </span>
            )}
          </div>

          {selectedDay.assessment ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span className="text-[11px] text-gray-500 block">Well-Being Score</span>
                <span className="font-bold text-gray-900 text-sm flex items-center gap-1 mt-0.5">
                  <span>{selectedDay.assessment.score} / 5</span>
                </span>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span className="text-[11px] text-gray-500 block">Assessment Status</span>
                <span className="font-semibold text-gray-900 block mt-0.5 truncate" title={selectedDay.assessment.statusText}>
                  {selectedDay.assessment.statusText}
                </span>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span className="text-[11px] text-gray-500 block">Anxiety (GAD-7)</span>
                <span className="font-semibold text-gray-900 block mt-0.5 truncate">
                  {selectedDay.assessment.gad7Score !== undefined ? `${selectedDay.assessment.gad7Score} / 21` : 'N/A'}
                </span>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span className="text-[11px] text-gray-500 block">Risk Triage</span>
                <span className="font-semibold text-gray-900 block mt-0.5 capitalize truncate">
                  {selectedDay.assessment.riskLevel || 'Routine'}
                </span>
              </div>

              {selectedDay.assessment.summary && (
                <div className="col-span-2 sm:col-span-4 bg-teal-50/60 p-2.5 rounded-xl border border-teal-100 text-xs text-teal-950">
                  <span className="font-bold text-teal-800 mr-1">Summary:</span>
                  <span>{selectedDay.assessment.summary}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-500 py-1">
              <span>
                {selectedDay.isFuture
                  ? 'This day is in the future. You can complete your well-being check when this day arrives.'
                  : selectedDay.isToday
                  ? 'No assessment was recorded yet for today. Use the Daily Well-Being Check button above to log today\'s entry.'
                  : 'No assessment was recorded on this day. We keep it blank without guessing.'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
