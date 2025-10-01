import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";

export default function App() {
  const [result, setResult] = useState(null);
  const [resetCounter, setResetCounter] = useState(0);

  const handleCheckAnother = () => {
    setResult(null);
    setResetCounter(prev => prev + 1); // Trigger form reset
  };

  return (
    <div 
      className="h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 overflow-hidden scrollbar-none"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div 
        className="h-full overflow-y-auto p-4 scrollbar-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center py-2 sm:py-8 mb-2 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-1 sm:mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI ATS
              </span>{" "}
              Resume Checker
            </h1>
            <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Optimize your resume for Applicant Tracking Systems and increase your chances of landing your dream job
            </p>
          </div>

       
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-stretch">
          
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-6 md:p-8 h-full mobile-card-height sm:min-h-[800px] flex flex-col">
              <UploadForm setResult={setResult} resetTrigger={resetCounter} />
            </div>
          </div>

          
          <div className="w-full lg:w-1/2">
            {result ? (
              <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-6 md:p-8 h-full mobile-card-height sm:min-h-[800px] flex flex-col">
                <ResultCard result={result} onCheckAnother={handleCheckAnother} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-6 md:p-8 border-2 border-dashed border-gray-200 h-full mobile-card-height sm:min-h-[800px] flex flex-col justify-center">
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-500">
                    Your ATS analysis results will appear here after you upload your resume and job description.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        
        {/* Footer */}
        <footer className="mt-20 py-6 border-t border-gray-100">
      <div class="text-center">
        <p class="text-gray-400 text-xs">
          © 2025 Built by {' '}
          <a 
            href="https://www.shahinasareen.tech" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Shahina Sareen {' '}
          </a>
           • All rights reserved
        </p>
      </div>
    </footer>
  </div>
      </div>
    </div>
  );
}
