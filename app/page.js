'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 300 }) // ₹3 in paise
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: 'UNSTUCK Masterclass',
          description: '2-Hour Masterclass to Hack Your Lazy Brain into Maximum Productivity',
          order_id: data.order.id,
          handler: function (response) {
            // Payment successful, redirect to success page
            window.location.href = '/success';
          },
          theme: {
            color: '#4F46E5',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      alert('Payment failed: ' + error.message);
    } finally {
      setIsLoading(false);
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Stop Procrastinating. Get Unstuck.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            <em>The 2-Hour Masterclass to Hack Your Lazy Brain into Maximum Productivity.</em>
          </p>
          
          {/* Floating Payment Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg"
            >
              <span className="text-2xl">₹2</span>
              <span>Join Masterclass</span>
            </button>
          </div>
        </div>

        {/* Problem Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-red-400">
            The Problem: Why You're Stuck
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-lg leading-relaxed mb-6">
              You have talent, drive, and huge goals. But every morning, your brain tells you to hit the snooze button on your life. You delay, you feel guilty, and you watch your most important ambitions gather dust.
            </p>
            <p className="text-lg leading-relaxed font-semibold text-yellow-400">
              It's not a lack of willpower; it's a glitch in your system. Your brain is designed to save energy, and it sees hard work as a threat. The UNSTUCK Masterclass is the solution.
            </p>
          </div>
        </div>

        {/* Promise Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-400">
            The Promise: Your 2-Hour Transformation
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-lg leading-relaxed mb-8">
              In just <strong className="text-yellow-400">120 minutes</strong>, this intense, actionable Masterclass gives you the psychological tools to <strong className="text-yellow-400">transform your life</strong> and instantly overcome procrastination. We focus on <strong className="text-yellow-400">brain chemistry, not calendars.</strong>
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="font-bold text-lg">Instant Start Trigger</h3>
                    <p className="text-gray-300">Master the one simple 5-minute technique that forces your brain to stop resisting and start executing any task immediately.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <h3 className="font-bold text-lg">Rewire Motivation</h3>
                    <p className="text-gray-300">Learn how to tap into your natural dopamine cycles so that being productive actually feels easier and more rewarding than procrastinating.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="font-bold text-lg">Master Deep Focus</h3>
                    <p className="text-gray-300">Get the proven framework to build blocks of "unbreakable" focus, eliminating mental noise and digital distractions without burning out.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔓</span>
                  <div>
                    <h3 className="font-bold text-lg">Unlock Time</h3>
                    <p className="text-gray-300">Stop wasting hours fighting yourself. Free up significant time and mental energy to pursue the activities and goals that truly matter.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-400">
            This Masterclass is for You if:
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">•</span>
                <span>You constantly plan your week but never finish your priorities.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">•</span>
                <span>You feel stressed and guilty about the things you know you should be doing.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">•</span>
                <span>You start projects strong but always lose momentum halfway through.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-xl">•</span>
                <span>You need a <strong className="text-yellow-400">fast, proven fix</strong>—not a lengthy, drawn-out course.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Class Details */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-purple-400">
            Class Details & Enrollment
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-center">The UNSTUCK 2-Hour Live Masterclass</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="pb-4 pr-4 font-bold">Feature</th>
                    <th className="pb-4 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  <tr className="border-b border-white/10">
                    <td className="py-4 pr-4 font-semibold">Duration</td>
                    <td className="py-4">Just 2 Hours (Intense & Actionable)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 pr-4 font-semibold">Date & Time</td>
                    <td className="py-4">Coming Soon - Live Online Session</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 pr-4 font-semibold">Format</td>
                    <td className="py-4">Live Online Session (Recording provided)</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-semibold">Bonus</td>
                    <td className="py-4">"Momentum Activation" Workbook & Checklist</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
              <p className="text-lg font-semibold text-center">
                Stop losing your best ideas to procrastination. Invest 2 hours. Transform your life.
              </p>
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-400">
            Meet Your Instructor
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-lg leading-relaxed">
              Hi, I'm Abimanue Analytix. I designed this 2-hour hack after years of studying behavioral psychology and neuroscience. My goal is to give you the most powerful tools <strong className="text-yellow-400">without the fluff</strong>. If you're ready to stop fighting your brain and start using its full power, I'll see you in the Masterclass.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Complete Your Purchase</h3>
            <p className="text-gray-600 mb-6">
              You're about to join the UNSTUCK Masterclass for just ₹3. This will redirect you to Razorpay for secure payment.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Pay ₹3'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
