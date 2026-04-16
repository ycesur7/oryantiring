"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { checkBadgeEligibility } from '@/utils/badgeChecker';
import { ArrowLeft, Trophy, QrCode, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckpointsPage() {
  const { checkpoints, progress, setCheckpoints, completeCheckpoint, earnBadge, demoMode } = useGameStore();
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [lastFeedback, setLastFeedback] = useState('');
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [manualCode, setManualCode] = useState('');

  useEffect(() => {
    fetch('/models/checkpoints.json')
      .then(res => res.json())
      .then(data => {
        const checkpointsWithStatus = data.map((cp: any) => ({
          ...cp,
          completed: checkpoints.find(c => c.id === cp.id)?.completed || false,
          score: checkpoints.find(c => c.id === cp.id)?.score,
        }));
        setCheckpoints(checkpointsWithStatus);
      });
  }, []);

  const handleCheckpointClick = (checkpointId: number) => {
    const checkpoint = checkpoints.find(cp => cp.id === checkpointId);
    if (checkpoint && !checkpoint.completed) {
      setSelectedCheckpoint(checkpointId);
    }
  };

  const handleAnswerSelect = (points: number, feedback: string) => {
    if (selectedCheckpoint === null) return;

    setLastScore(points);
    setLastFeedback(feedback);
    setShowResult(true);

    completeCheckpoint(selectedCheckpoint, points);

    const eligibleBadges = checkBadgeEligibility(progress);
    const newlyEarned = eligibleBadges.filter(badgeId => !progress.earnedBadges.includes(badgeId));
    
    newlyEarned.forEach(badgeId => earnBadge(badgeId));
    setNewBadges(newlyEarned);

    setTimeout(() => {
      setShowResult(false);
      setSelectedCheckpoint(null);
      setNewBadges([]);
    }, 4000);
  };

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkpointId = checkpoints.find(cp => cp.qrCode === manualCode.toUpperCase())?.id;
    if (checkpointId) {
      handleCheckpointClick(checkpointId);
      setManualCode('');
      setShowQRScanner(false);
    } else {
      alert('Geçersiz kod! Lütfen kontrol noktasındaki kodu girin.');
    }
  };

  const currentCheckpoint = checkpoints.find(cp => cp.id === selectedCheckpoint);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <button className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white hover:bg-slate-800/60 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/badges">
              <button className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white hover:bg-slate-800/60 transition-colors">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="hidden sm:inline">Rozetler</span>
              </button>
            </Link>

            <button
              onClick={() => setShowQRScanner(!showQRScanner)}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full text-white transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Kod Gir</span>
            </button>
          </div>
        </div>

        {/* Puan Kartı */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Kontrol Noktaları</h1>
              <p className="text-slate-400">QR kod okut veya kod girerek görevleri aç</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {progress.totalPoints}
              </div>
              <div className="text-sm text-slate-400">Toplam Puan</div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(progress.completedCheckpoints / checkpoints.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-white font-medium">{progress.completedCheckpoints}/{checkpoints.length}</span>
          </div>
        </motion.div>

        {/* QR Kod Giriş */}
        <AnimatePresence>
          {showQRScanner && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Kontrol Noktası Kodu</h3>
              <form onSubmit={handleManualCodeSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Örn: CHECKPOINT_1_HONESTY"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium transition-colors"
                >
                  Aç
                </button>
              </form>
              <p className="text-sm text-slate-500 mt-2">
                Demo modunda tüm noktalar açık. Gerçek kullanımda QR kod okutun.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kontrol Noktaları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checkpoints.map((checkpoint, index) => (
            <motion.div
              key={checkpoint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card rounded-2xl p-6 transition-all ${
                checkpoint.completed
                  ? 'border-2 border-green-500/50'
                  : demoMode
                  ? 'hover:scale-105 cursor-pointer'
                  : 'opacity-60'
              }`}
              onClick={() => (demoMode || checkpoint.completed) && handleCheckpointClick(checkpoint.id)}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{checkpoint.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{checkpoint.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{checkpoint.description}</p>

                {checkpoint.completed ? (
                  <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Tamamlandı ({checkpoint.score} puan)</span>
                  </div>
                ) : demoMode ? (
                  <button
                    onClick={() => handleCheckpointClick(checkpoint.id)}
                    className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium transition-colors"
                  >
                    Görevi Başlat
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-yellow-400">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm">QR Kod Gerekli</span>
                  </div>
                )}

                <div className="mt-3 text-xs text-slate-500">
                  Kod: {checkpoint.qrCode}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Görev Modal */}
        <AnimatePresence>
          {selectedCheckpoint && currentCheckpoint && !showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
              onClick={() => setSelectedCheckpoint(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{currentCheckpoint.icon}</div>
                  <h2 className="text-3xl font-bold text-white mb-2">{currentCheckpoint.name}</h2>
                  <p className="text-slate-400">{currentCheckpoint.description}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">{currentCheckpoint.scenario.title}</h3>
                  <p className="text-slate-300 mb-6">{currentCheckpoint.scenario.question}</p>

                  <div className="space-y-3">
                    {currentCheckpoint.scenario.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option.points, option.feedback)}
                        className="w-full text-left p-4 rounded-lg bg-slate-700/50 hover:bg-indigo-500/20 border-2 border-transparent hover:border-indigo-500 transition-all text-white"
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option.text}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCheckpoint(null)}
                  className="w-full py-3 glass-card rounded-lg text-white hover:bg-slate-800/60 transition-colors"
                >
                  İptal
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sonuç Modal */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="glass-card rounded-2xl p-8 max-w-md w-full text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-8xl mb-4"
                >
                  {lastScore >= 90 ? '🏆' : lastScore >= 70 ? '⭐' : lastScore >= 50 ? '👍' : '💪'}
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-2">+{lastScore} Puan!</h3>
                <p className="text-slate-300 mb-6">{lastFeedback}</p>

                {newBadges.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border-2 border-yellow-500/50"
                  >
                    <div className="text-2xl mb-2">🎉</div>
                    <div className="text-yellow-400 font-bold">Yeni Rozet Kazandın!</div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
