"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Droplets, Zap, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import { calculateWaterSavings, calculateEfficiency } from "@/lib/calculations";

export default function Analytics() {
  const dailyUsage = 120; // litre
  const savings = calculateWaterSavings(dailyUsage);
  const efficiency = calculateEfficiency(45.2, 2.1);

  const weeklyData = [
    { day: 'Pzt', treated: 115, saved: 98 },
    { day: 'Sal', treated: 122, saved: 104 },
    { day: 'Çar', treated: 118, saved: 100 },
    { day: 'Per', treated: 125, saved: 106 },
    { day: 'Cum', treated: 120, saved: 102 },
    { day: 'Cmt', treated: 135, saved: 115 },
    { day: 'Paz', treated: 130, saved: 111 },
  ];

  const usageDistribution = [
    { name: 'Bahçe Sulama', value: 65, color: '#10b981' },
    { name: 'Tuvalet Rezervuarı', value: 25, color: '#06b6d4' },
    { name: 'Araç Yıkama', value: 10, color: '#8b5cf6' },
  ];

  const monthlyComparison = [
    { month: 'Oca', before: 3600, after: 540 },
    { month: 'Şub', before: 3400, after: 510 },
    { month: 'Mar', before: 3700, after: 555 },
    { month: 'Nis', before: 3650, after: 548 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-white">Veri Analizi ve Raporlar</h1>
          <p className="text-slate-400">Sistem performansı ve tasarruf istatistikleri</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Droplets}
            title="Yıllık Su Tasarrufu"
            value={`${(savings.yearly / 1000).toFixed(1)} m³`}
            subtitle={`${dailyUsage} L/gün`}
            color="text-cyan-400"
          />
          <StatCard
            icon={DollarSign}
            title="Maliyet Tasarrufu"
            value={`₺${savings.cost.toLocaleString('tr-TR')}`}
            subtitle="Yıllık"
            color="text-green-400"
          />
          <StatCard
            icon={TrendingDown}
            title="Arıtma Verimi"
            value={`%${efficiency.toFixed(1)}`}
            subtitle="45.2 → 2.1 NTU"
            color="text-purple-400"
          />
          <StatCard
            icon={Zap}
            title="Enerji Tüketimi"
            value="2.4 kWh"
            subtitle="Günlük ortalama"
            color="text-orange-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="glass-effect rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Haftalık Arıtma Performansı</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="treated" fill="#06b6d4" name="Arıtılan (L)" />
                <Bar dataKey="saved" fill="#10b981" name="Tasarruf (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Kullanım Dağılımı</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: %${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {usageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Aylık Su Tüketimi Karşılaştırması</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="before" fill="#ef4444" name="Sistem Öncesi (L)" />
              <Bar dataKey="after" fill="#10b981" name="Sistem Sonrası (L)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center text-sm text-slate-400">
            Ortalama %85 su tasarrufu sağlanmaktadır
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, color }: {
  icon: any;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <h3 className="text-sm text-slate-400 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </motion.div>
  );
}
