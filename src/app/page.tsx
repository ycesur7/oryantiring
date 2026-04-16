"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { QrCode, Trophy, Target, Sparkles, Play, Users } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: QrCode,
      title: "QR Kod Sistemi",
      description: "Kontrol noktalarındaki QR kodları okut",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Değer Görevleri",
      description: "Her noktada farklı bir değer deneyimi",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Trophy,
      title: "Rozet Kazan",
      description: "Başarılarını dijital rozetlerle kutla",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Sparkles,
      title: "Kişisel Profil",
      description: "Değer güçlerini keşfet",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <QrCode className="w-20 h-20 text-indigo-400" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dijital Değerler Rotası
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
            Okul bahçesinde değer odaklı bir maceraya hazır mısın? Her kontrol noktasında yeni bir değer keşfedecek, görevleri tamamlayacak ve rozetler kazanacaksın!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/checkpoints">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition-shadow flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Yolculuğa Başla
              </motion.button>
            </Link>
            
            <Link href="/badges">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-card rounded-full text-white font-bold text-lg hover:bg-slate-800/60 transition-colors flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                Rozetlerim
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-indigo-400" />
            <h2 className="text-3xl font-bold text-white">Nasıl Çalışır?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">1</div>
              <h3 className="font-semibold text-white mb-2">Kontrol Noktasına Git</h3>
              <p className="text-sm text-slate-400">Okul bahçesindeki değer noktalarını bul</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">2</div>
              <h3 className="font-semibold text-white mb-2">QR Kod Okut</h3>
              <p className="text-sm text-slate-400">Noktadaki QR kodu okut veya kodu gir</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">3</div>
              <h3 className="font-semibold text-white mb-2">Görevi Tamamla</h3>
              <p className="text-sm text-slate-400">Değer senaryolarını çöz ve rozet kazan</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm">5 Kontrol Noktası • 7 Rozet • Sınırsız Değer</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
