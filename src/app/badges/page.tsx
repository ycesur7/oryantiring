"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { generateValueProfile } from '@/utils/badgeChecker';
import { ArrowLeft, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function BadgesPage() {
  const { badges, progress, setBadges } = useGameStore();

  useEffect(() => {
    fetch('/models/badges.json')
      .then(res => res.json())
      .then(data => {
        const badgesWithStatus = data.map((badge: any) => ({
          ...badge,
          earned: progress.earnedBadges.includes(badge.id),
        }));
        setBadges(badgesWithStatus);
      });
  }, [progress.earnedBadges]);

  const earnedBadges = badges.filter(b => b.earned);
  const profile = generateValueProfile(progress);

  const chartData = Object.entries(progress.valueScores).map(([value, score]) => ({
    name: value.charAt(0).toUpperCase() + value.slice(1),
    value: score,
  }));

  const COLORS = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <button className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white hover:bg-slate-800/60 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Haritaya Dön
            </button>
          </Link>

          <div className="glass-card px-6 py-3 rounded-full">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">{earnedBadges.length}/{badges.length} Rozet</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            Rozet Koleksiyonum
          </h1>
          <p className="text-xl text-slate-300">Değer yolculuğundaki başarıların</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Rozetler */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Kazanılan Rozetler
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-xl p-6 border-2 transition-all ${
                      badge.earned
                        ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                        : 'bg-slate-800/30 border-slate-700/50 opacity-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-6xl mb-3 ${badge.earned ? 'animate-bounce-slow' : 'grayscale'}`}>
                        {badge.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{badge.name}</h3>
                      <p className="text-sm text-slate-400 mb-3">{badge.description}</p>
                      
                      {badge.earned ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-xs font-medium">
                          ✓ Kazanıldı
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500">{badge.requirement}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="space-y-6">
            {/* Genel İstatistikler */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                İstatistikler
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Toplam Puan</span>
                  <span className="text-2xl font-bold text-white">{progress.totalPoints}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tamamlanan Görev</span>
                  <span className="text-2xl font-bold text-white">{progress.completedCheckpoints}/5</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Ortalama Puan</span>
                  <span className="text-2xl font-bold text-white">{profile.average}</span>
                </div>

                {profile.strongest && (
                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-sm text-slate-400 mb-2">En Güçlü Değer</div>
                    <div className="text-xl font-bold text-indigo-400 capitalize">
                      {profile.strongest.value}
                    </div>
                    <div className="text-sm text-slate-500">{profile.strongest.score} puan</div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* İlerleme */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Değer Dağılımı</h3>

              {chartData.some(d => d.value > 0) ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  Henüz görev tamamlanmadı
                </div>
              )}

              <div className="mt-4 space-y-2">
                {Object.entries(progress.valueScores).map(([value, score], index) => (
                  <div key={value} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-slate-300 capitalize">{value}</span>
                    </div>
                    <span className="text-white font-medium">{score}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Motivasyon Mesajı */}
        {earnedBadges.length === badges.length ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 text-center bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">Tebrikler!</h2>
            <p className="text-xl text-slate-300">
              Tüm rozetleri topladın! Değerler yolculuğunu mükemmel tamamladın.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-4">💪</div>
            <h2 className="text-2xl font-bold text-white mb-2">Devam Et!</h2>
            <p className="text-slate-300">
              Daha {badges.length - earnedBadges.length} rozet kazanman gerekiyor. Haritaya dön ve görevleri tamamla!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
