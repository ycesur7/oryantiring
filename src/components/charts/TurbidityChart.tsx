"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TurbidityChartProps {
  data: Array<{ time: string; value: number }>;
}

export default function TurbidityChart({ data }: TurbidityChartProps) {
  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Bulanıklık Değişimi (NTU)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <ReferenceLine y={3} stroke="#10b981" strokeDasharray="3 3" label="Hedef" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ fill: '#06b6d4', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
