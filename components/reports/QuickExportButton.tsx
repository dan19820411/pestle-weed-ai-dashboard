'use client';

import React, { useState } from 'react';

interface QuickExportButtonProps {
  reportType: string;
  reportData: any;
  defaultFormat?: 'PDF' | 'Excel' | 'CSV';
  showFormatSelector?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function QuickExportButton({
  reportType,
  reportData,
  defaultFormat = 'PDF',
  showFormatSelector = true,
  size = 'md'
}: QuickExportButtonProps) {
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'Excel' | 'CSV'>(defaultFormat);
  const [showDropdown, setShowDropdown] = useState(false);
  const [exporting, setExporting] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const handleExport = async () => {
    setExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, trigger actual export based on format
      console.log(`Exporting ${reportType} as ${selectedFormat}`, reportData);
      
      // Show success message
      alert(`${reportType} exported successfully as ${selectedFormat}!`);
      
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting report. Please try again.');
    } finally {
      setExporting(false);
      setShowDropdown(false);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M14 2v6h6" fill="white" />
          </svg>
        );
      case 'Excel':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M9 15l3-3m0 0l3 3m-3-3v8" fill="white" />
          </svg>
        );
      case 'CSV':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path d="M9 13h6M9 17h6" stroke="white" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF':
        return 'text-red-600';
      case 'Excel':
        return 'text-green-600';
      case 'CSV':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <button
          onClick={handleExport}
          disabled={exporting}
          className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${sizeClasses[size]} shadow-md hover:shadow-lg`}
        >
          {exporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export as {selectedFormat}</span>
            </>
          )}
        </button>

        {showFormatSelector && (
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={exporting}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-50 px-3 py-2"
            title="Change format"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {showDropdown && showFormatSelector && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
            Export Format
          </div>
          
          {(['PDF', 'Excel', 'CSV'] as const).map((format) => (
            <button
              key={format}
              onClick={() => {
                setSelectedFormat(format);
                setShowDropdown(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between gap-3 transition-colors ${
                selectedFormat === format ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={getFormatColor(format)}>
                  {getFormatIcon(format)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{format}</div>
                  <div className="text-xs text-gray-500">
                    {format === 'PDF' && 'Portable Document Format'}
                    {format === 'Excel' && 'Microsoft Excel Spreadsheet'}
                    {format === 'CSV' && 'Comma Separated Values'}
                  </div>
                </div>
              </div>
              
              {selectedFormat === format && (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </div>
  );
}
