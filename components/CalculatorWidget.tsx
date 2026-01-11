import React, { useState, useMemo } from 'react';
import { DollarSign, Calendar, TrendingUp, PieChart, Info } from 'lucide-react';
import GrowthChart from './GrowthChart';
import LeadCapture from './LeadCapture';
import { calculateGrowth, formatCurrency } from '../utils/calculations';
import { CalculatorInputs } from '../types';

const CalculatorWidget: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialAmount: 10000,
    monthlyContribution: 500,
    annualReturn: 7,
    years: 20
  });

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const results = useMemo(() => calculateGrowth(inputs), [inputs]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden font-sans border border-slate-200">
      
      {/* Header */}
      <div className="bg-navy-950 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center border-b-4 border-gold-500">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Investment Growth</h2>
          <p className="text-slate-400 text-sm mt-1">Visualize your wealth potential over time.</p>
        </div>
        <div className="hidden sm:block">
           {/* Decorative Icon or Brand Element */}
           <TrendingUp className="text-gold-500 w-10 h-10 opacity-80" />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-0">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-4 bg-slate-50 p-6 sm:p-8 border-r border-slate-200 space-y-8">
          
          {/* Starting Amount */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-navy-900 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gold-600" /> Starting Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={inputs.initialAmount}
                onChange={(e) => handleInputChange('initialAmount', Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-navy-900 font-semibold text-lg bg-white"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-navy-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-600" /> Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={inputs.monthlyContribution}
                onChange={(e) => handleInputChange('monthlyContribution', Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-navy-900 font-semibold text-lg bg-white"
              />
            </div>
          </div>

          {/* Annual Return */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-navy-900 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold-600" /> Annual Return
            </label>
            <div className="relative">
              <select
                value={inputs.annualReturn}
                onChange={(e) => handleInputChange('annualReturn', Number(e.target.value))}
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all text-navy-900 font-semibold text-lg bg-white appearance-none cursor-pointer"
              >
                <option value={5}>5% (Conservative)</option>
                <option value={7}>7% (Balanced)</option>
                <option value={10}>10% (Aggressive)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Time Horizon Slider */}
          <div className="space-y-4 pt-2">
             <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-navy-900 uppercase tracking-wider">
                  Time Horizon
                </label>
                <span className="bg-navy-900 text-gold-400 text-xs font-bold px-2 py-1 rounded">
                  {inputs.years} Years
                </span>
             </div>
             <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={inputs.years}
              onChange={(e) => handleInputChange('years', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400"
             />
             <div className="flex justify-between text-xs text-slate-400 font-medium">
               <span>5 Years</span>
               <span>30 Years</span>
             </div>
          </div>

        </div>

        {/* Right Column: Visualization */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-white flex flex-col justify-between">
          
          {/* Top Stats */}
          <div className="mb-8">
            <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide mb-2">Projected Future Value</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
                {formatCurrency(results.finalBalance)}
              </span>
              <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-sm flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +{Math.round(((results.finalBalance - results.totalInvested) / results.totalInvested) * 100)}%
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Estimated total value after {inputs.years} years at {inputs.annualReturn}% return.
            </p>
          </div>

          {/* Chart Area */}
          <div className="flex-1 min-h-[300px] mb-8 relative">
             <GrowthChart data={results.breakdown} />
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
               <div className="flex items-center gap-2 mb-1 text-slate-500 text-xs uppercase font-bold tracking-wide">
                 <div className="w-2 h-2 rounded-full bg-slate-400" />
                 Total Invested
               </div>
               <div className="text-xl font-bold text-slate-700">
                 {formatCurrency(results.totalInvested)}
               </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
               <div className="flex items-center gap-2 mb-1 text-amber-700 text-xs uppercase font-bold tracking-wide">
                 <div className="w-2 h-2 rounded-full bg-amber-500" />
                 Total Earnings
               </div>
               <div className="text-xl font-bold text-amber-600">
                 +{formatCurrency(results.totalInterest)}
               </div>
            </div>
          </div>

          {/* Lead Capture Footer */}
          <LeadCapture />

        </div>
      </div>
    </div>
  );
};

export default CalculatorWidget;