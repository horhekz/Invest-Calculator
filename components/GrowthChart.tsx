import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { ChartDataPoint } from '../types';
import { formatCurrency } from '../utils/calculations';

interface GrowthChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-900 border border-navy-800 text-white p-3 rounded shadow-lg text-sm">
        <p className="font-semibold mb-2 text-gold-400">Year {label}</p>
        <div className="space-y-1">
          <p className="flex justify-between gap-4">
            <span className="text-gray-300">Total Value:</span>
            <span className="font-bold">{formatCurrency(payload[0].value as number)}</span>
          </p>
          <p className="flex justify-between gap-4">
            <span className="text-gray-400">Invested:</span>
            <span>{formatCurrency(payload[1].value as number)}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
            tick={{ fill: '#64748b', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#f59e0b" // gold-500
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBalance)"
            activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="invested"
            stroke="#94a3b8" // slate-400
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#colorInvested)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;