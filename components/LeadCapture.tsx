import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const LeadCapture: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 rounded-xl p-8 text-center animate-fade-in border border-green-100">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-navy-900 mb-2">Plan Requested!</h3>
        <p className="text-slate-600">
          We've sent a confirmation email. One of our advisors will be in touch with your personalized roadmap shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-100 mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left md:flex-1">
          <h3 className="text-lg font-bold text-navy-900 mb-1">Want a personalized plan?</h3>
          <p className="text-sm text-slate-500">
            Get a detailed report customized to your financial goals sent to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="First Name"
            required
            className="px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm w-full sm:w-40"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm w-full sm:w-56"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 min-w-[120px]"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Get Plan <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadCapture;