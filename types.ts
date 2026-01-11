export interface ChartDataPoint {
  year: number;
  balance: number;
  invested: number;
  interest: number;
}

export interface CalculationResult {
  finalBalance: number;
  totalInvested: number;
  totalInterest: number;
  breakdown: ChartDataPoint[];
}

export interface CalculatorInputs {
  initialAmount: number;
  monthlyContribution: number;
  annualReturn: number;
  years: number;
}