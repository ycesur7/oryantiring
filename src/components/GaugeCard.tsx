"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GaugeCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: string;
  min?: number;
  max?: number;
  optimal?: { min: number; max: number };
}

export default function GaugeCard({ title, value, unit, icon: Icon, color, min = 0, max = 100, optimal }: GaugeCardProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const isOptimal = optimal ? value >= optimal.min && value <= optimal.max : true;

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value.toFixed(1)}</span>
          <span className="text-slate-400">{unit}</span>
        </div>
      </div>

      <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full ${isOptimal ? 'bg-green-500' : 'bg-yellow-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {optimal && (
        <div className="mt-2 text-xs text-slate-500">
          Optimal: {optimal.min} - {optimal.max} {unit}
        </div>
      )}
    </div>
  );
}
