import React, { useState, useRef, useEffect } from "react";
import { checkResume } from "../services/api";

export default function UploadForm({ setResult, resetTrigger }) {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form when resetTrigger changes
  useEffect(() => {
    if (resetTrigger) {
      setFile(null);
      setJobDesc("");
      setIsDragOver(false);
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [resetTrigger]);

  const handleSubmit = async () => {
    if (!file || !jobDesc) return alert("Please upload a file and enter job description.");
    
    setIsLoading(true);

    try {
      const data = await checkResume(file, jobDesc);
      setResult(data);
    } catch (error) {
      alert("Error checking resume. Please try again.");
      console.error("Resume check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
      
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => handleFileChange(e.target.files[0])}
        className="hidden"
      />
      
      
      <div
        onClick={openFileSelector}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full border-2 border-dashed rounded-lg sm:rounded-xl cursor-pointer
          transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex-shrink-0
          mobile-upload-compact
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 shadow-lg' 
            : file 
              ? 'border-green-500 bg-green-50 shadow-md' 
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
          }
        `}
      >
        <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-3">
          {/* Upload icon with animation */}
          <div className={`
            relative transition-all duration-300 ease-in-out
            ${isDragOver ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
          `}>
            {file ? (
              <svg className="w-6 h-6 sm:w-12 sm:h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
            
            {/* Animated pulse ring */}
            {!file && (
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
            )}
          </div>

          {/* Text content */}
          <div className="text-center">
            {file ? (
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-semibold text-green-700">
                  ✓ {file.name}
                </p>
                <p className="text-xs text-green-600">
                  File uploaded successfully! Click to change.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-semibold text-gray-700">
                  {isDragOver ? "Drop your resume here!" : "Upload Your Resume"}
                </p>
                <p className="text-xs text-gray-500">
                  Drag and drop your PDF file here, or{" "}
                  <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    click to browse
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  Only PDF files are accepted
                </p>
              </div>
            )}
          </div>

          {/* Upload button with animation */}
          {!file && (
            <button
              type="button"
              className="
                inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600
                text-white font-medium rounded-lg shadow-md hover:shadow-lg
                transform hover:scale-105 transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              "
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Choose File
            </button>
          )}
        </div>
      </div>

      {/* Job description textarea */}
      <div className="flex-1 flex flex-col min-h-0">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          placeholder="Paste the job description here to analyze your resume compatibility..."
          onChange={e => setJobDesc(e.target.value)}
          value={jobDesc}
          className="
            w-full p-3 border border-gray-300 rounded-lg resize-none
            focus:outline-none focus:border-black
            transition-all duration-200 ease-in-out
            placeholder-gray-400 text-gray-700 text-sm
            overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400
            mobile-textarea-expand
          "
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9CA3AF #F3F4F6'
          }}
        />
      </div>

      {/* Submit button */}
      <div className="flex-shrink-0 mobile-button-bottom">
        <button
          onClick={handleSubmit}
          disabled={!file || !jobDesc || isLoading}
          className={`
            w-full relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-white text-sm sm:text-base
            focus:outline-none focus:ring-4 focus:ring-blue-300
            ${(!file || !jobDesc || isLoading)
              ? 'bg-gray-400 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'
            }
          `}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing Resume...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Check Resume</span>
          </div>
        )}
        </button>
      </div>
    </div>
  );
}