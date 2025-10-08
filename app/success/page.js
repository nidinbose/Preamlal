'use client';

import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl ring-1 ring-white/20 p-8 text-center">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-white">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-gray-900">Welcome to UNSTUCK!</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Payment successful! You're now enrolled in the UNSTUCK Masterclass.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6 border border-green-200">
            <p className="text-gray-700 font-medium">
              🎉 Congratulations! You've taken the first step to transform your productivity.
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Redirecting to homepage in <span className="font-bold text-indigo-600">{countdown}</span> seconds...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
            <a 
              href="/" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Go to Homepage Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}



