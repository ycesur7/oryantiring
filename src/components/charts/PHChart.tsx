"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface PHChartProps {
  data: Array<{ time: string; value: number }>;
}

export default function PHChart({ data }: PHChartProps) {
  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">pH Değişimi</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis domain={[0, 14]} stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <ReferenceLine y={6.5} stroke="#f59e0b" strokeDasharray="3 3" />
          <ReferenceLine y={8.5} stroke="#f59e0b" strokeDasharray="3 3" />
          <ReferenceLine y={7.2} stroke="#10b981" strokeDasharray="3 3" label="Optimal" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
