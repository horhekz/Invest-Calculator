import { CalculationResult, ChartDataPoint, CalculatorInputs } from '../types';

export const calculateGrowth = (inputs: CalculatorInputs): CalculationResult => {
  const { initialAmount, monthlyContribution, annualReturn, years } = inputs;
  
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = years * 12;
  
  let currentBalance = initialAmount;
  let totalInvested = initialAmount;
  
  const breakdown: ChartDataPoint[] = [];

  // Add initial point
  breakdown.push({
    year: 0,
    balance: Math.round(currentBalance),
    invested: Math.round(totalInvested),
    interest: 0
  });

  for (let i = 1; i <= totalMonths; i++) {
    // Apply interest first (start of period vs end of period depends on preference, usually end)
    // Formula: (Previous Balance + Contribution) * (1 + rate) assuming contribution at start of month
    // OR: Previous Balance * (1+rate) + Contribution if contribution at end.
    // Let's assume contribution happens at the beginning of the month for compounding.
    
    currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
    totalInvested += monthlyContribution;

    // We only capture data points per year for the chart to keep it clean
    if (i % 12 === 0) {
      breakdown.push({
        year: i / 12,
        balance: Math.round(currentBalance),
        invested: Math.round(totalInvested),
        interest: Math.round(currentBalance - totalInvested)
      });
    }
  }

  return {
    finalBalance: currentBalance,
    totalInvested: totalInvested,
    totalInterest: currentBalance - totalInvested,
    breakdown
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};