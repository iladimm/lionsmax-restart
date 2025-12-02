import React, { useState, useEffect } from 'react';

const UnderConstruction: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thanks for your interest! We\'ll notify you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo / Title */}
        <h1 className="text-4xl font-bold text-white mb-2">LionsMax</h1>
        <p className="text-xl text-amber-400 mb-8">Coming Soon</p>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-8">
          Your ultimate wellness companion for adults 40+. Premium supplements, expert guides, and lifestyle coaching.
        </p>

        {/* Countdown Timer */}
        <div className="mb-8">
          <p className="text-gray-400 mb-4 text-sm">Launching in:</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-amber-400">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-xs text-gray-400">Days</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-amber-400">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs text-gray-400">Hours</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs text-gray-400">Minutes</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs text-gray-400">Seconds</div>
            </div>
          </div>
        </div>

        {/* Email Signup */}
        <form onSubmit={handleEmailSubmit} className="mb-8">
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors"
            >
              Notify
            </button>
          </div>
        </form>

        {/* FTC Disclaimer */}
        <div className="bg-slate-700 rounded-lg p-4 text-xs text-gray-400">
          <p className="mb-2">
            <strong>Disclosure:</strong> LionsMax is a participant in the Amazon Services LLC Associates Program and other affiliate programs.
          </p>
          <p>
            We may earn commissions from qualifying purchases. These statements have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
