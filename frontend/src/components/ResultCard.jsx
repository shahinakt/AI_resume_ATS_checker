import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function ResultCard({ result, onCheckAnother }) {
  const progressRef = useRef();

  useEffect(() => {
    animate(progressRef.current, { width: `${result.score}%` }, { duration: 1 });
  }, [result.score]);

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6 overflow-hidden">
      {/* Score Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ATS Score</h2>
        <div className="text-4xl font-bold text-gray-900 mb-2">{result.score}%</div>
        <div className="text-sm text-gray-600 font-medium">{getScoreLabel(result.score)}</div>
        
        {/* Progress Bar */}
        <div className="bg-gray-200 h-3 w-full rounded-full mt-4 overflow-hidden">
          <div
            ref={progressRef}
            className={`h-3 rounded-full transition-all duration-1000 ${getScoreColor(result.score)}`}
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>

      {/* Results Content */}
      <div className="flex-1 space-y-3 overflow-hidden min-h-0 flex flex-col">
        {/* Matches and Missing sections - compact */}
        <div className="flex-shrink-0 space-y-2">
          {/* Matches Section */}
          <div className="border rounded-lg p-3">
            <h3 className="font-semibold text-green-700 mb-2 flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Matched Keywords ({result.matches.length})
            </h3>
            <div className="text-xs text-gray-700 max-h-16 overflow-hidden">
              {result.matches.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {result.matches.slice(0, 6).map((match, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {match}
                    </span>
                  ))}
                  {result.matches.length > 6 && (
                    <span className="text-green-600 text-xs">+{result.matches.length - 6} more</span>
                  )}
                </div>
              ) : (
                <span className="text-gray-500">None found</span>
              )}
            </div>
          </div>

          {/* Missing Section */}
          <div className="border rounded-lg p-3">
            <h3 className="font-semibold text-red-700 mb-2 flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Missing Keywords ({result.missing.length})
            </h3>
            <div className="text-xs text-gray-700 max-h-16 overflow-hidden">
              {result.missing.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {result.missing.slice(0, 6).map((missing, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      {missing}
                    </span>
                  ))}
                  {result.missing.length > 6 && (
                    <span className="text-red-600 text-xs">+{result.missing.length - 6} more</span>
                  )}
                </div>
              ) : (
                <span className="text-green-600">All keywords matched!</span>
              )}
            </div>
          </div>
        </div>

        {/* AI Suggestion Section - Expandable like job description */}
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center flex-shrink-0 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Suggestions
          </h3>
          <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg overflow-y-auto overflow-x-hidden border border-gray-200 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 mobile-textarea-expand"
               style={{
                 scrollbarWidth: 'thin',
                 scrollbarColor: '#9CA3AF #F3F4F6'
               }}>
            {result.ai_suggestion || "No AI suggestions available for this resume."}
          </div>
        </div>
      </div>

      {/* Action Button - Fixed at bottom */}
      <div className="flex-shrink-0 mobile-button-bottom">
        <button 
          onClick={onCheckAnother}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Check Another Resume</span>
        </button>
      </div>

      {/* Privacy Note */}
      <div className="text-xs text-gray-500 text-center border-t pt-2 sm:pt-4 flex-shrink-0">
        {result.privacy_note}
      </div>
    </div>
  );
}
