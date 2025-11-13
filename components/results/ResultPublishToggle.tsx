'use client';

import React, { useState } from 'react';

interface ResultPublishToggleProps {
  term: string;
  currentStatus: 'Published' | 'Draft';
  onStatusChange: (newStatus: 'Published' | 'Draft') => Promise<void>;
  publishedCount?: number;
  draftCount?: number;
}

export default function ResultPublishToggle({ term, currentStatus, onStatusChange, publishedCount = 0, draftCount = 0 }: ResultPublishToggleProps) {
  const [isPublished, setIsPublished] = useState(currentStatus === 'Published');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setShowConfirmation(true);
  };

  const confirmChange = async () => {
    setLoading(true);
    try {
      const newStatus = isPublished ? 'Draft' : 'Published';
      await onStatusChange(newStatus);
      setIsPublished(!isPublished);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error changing status:', error);
      alert('Failed to change status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Result Publication Status</h3>
          <p className="text-sm text-gray-600 mb-4">
            {term} results are currently <span className={`font-semibold ${isPublished ? 'text-green-600' : 'text-yellow-600'}`}>{isPublished ? 'Published' : 'Draft'}</span>
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <div className="text-xs font-semibold text-green-700 uppercase mb-1">Published</div>
              <div className="text-2xl font-bold text-green-900">{publishedCount}</div>
              <div className="text-xs text-green-600 mt-1">Visible to students</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <div className="text-xs font-semibold text-yellow-700 uppercase mb-1">Draft</div>
              <div className="text-2xl font-bold text-yellow-900">{draftCount}</div>
              <div className="text-xs text-yellow-600 mt-1">Not yet visible</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handleToggle} disabled={loading} className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isPublished ? 'bg-green-600 focus:ring-green-500' : 'bg-gray-300 focus:ring-gray-400'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${isPublished ? 'translate-x-11' : 'translate-x-1'}`} />
            </button>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">
                {isPublished ? 'Results are Published' : 'Results are in Draft'}
              </div>
              <div className="text-sm text-gray-600">
                {isPublished ? 'Students can view their results' : 'Results hidden from students'}
              </div>
            </div>
          </div>

          {isPublished && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-green-800">
                <div className="font-semibold">Results are live!</div>
                <div>Students and parents can now view {term} results. SMS notifications have been sent.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full ${isPublished ? 'bg-yellow-100' : 'bg-green-100'} flex items-center justify-center`}>
                <svg className={`w-6 h-6 ${isPublished ? 'text-yellow-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {isPublished ? 'Unpublish Results?' : 'Publish Results?'}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {isPublished 
                    ? `Are you sure you want to unpublish ${term} results? Students will no longer be able to view their results.`
                    : `Are you sure you want to publish ${term} results? All students will be able to view their results and SMS notifications will be sent.`
                  }
                </p>
                <div className="flex gap-3">
                  <button onClick={confirmChange} disabled={loading} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${isPublished ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {loading ? 'Processing...' : isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => setShowConfirmation(false)} disabled={loading} className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
