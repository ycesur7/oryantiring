"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, Activity, BarChart3, Microscope, Settings, Play } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Activity,
      title: "Canlı İzleme",
      description: "Gerçek zamanlı sensör verileri ve sistem durumu",
      href: "/dashboard",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Play,
      title: "Simülasyon",
      description: "Arıtma sürecini interaktif olarak deneyimleyin",
      href: "/simulation",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Veri Analizi",
      description: "Detaylı grafikler ve performans raporları",
      href: "/analytics",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Microscope,
      title: "Bilimsel Veriler",
      description: "Elektrokoagülasyon ve UV-C dezenfeksiyon detayları",
      href: "/science",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Settings,
      title: "Sistem Ayarları",
      description: "Parametreler ve kalibrasyon ayarları",
      href: "/settings",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Droplets className="w-16 h-16 text-cyan-400 animate-pulse-slow" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Evsel Gri Su Arıtma Sistemi
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Elektrokoagülasyon ve UV-C Dezenfeksiyon ile Sürdürülebilir Su Yönetimi
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Sistem Aktif
            </span>
            <span>•</span>
            <span>Arduino Mega 2560</span>
            <span>•</span>
            <span>TÜBİTAK 2204-A</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Proje Hakkında</h2>
            <p className="text-slate-300 leading-relaxed">
              Bu sistem, evsel gri suları (duş, lavabo, çamaşır makinesi) arıtarak bahçe sulama ve tuvalet rezervuarı 
              gibi amaçlarla yeniden kullanılabilir hale getirir. Elektrokoagülasyon yöntemiyle askıda katı maddelerin 
              çökeltilmesi ve UV-C dezenfeksiyon ile mikroorganizmaların %99.9 oranında inaktive edilmesi sağlanır.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-500/20 rounded-full text-sm text-blue-300">pH: 7.2</span>
              <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Bulanıklık: &lt;3 NTU</span>
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-sm text-purple-300">UV Dozajı: 62.6 mJ/cm²</span>
              <span className="px-4 py-2 bg-green-500/20 rounded-full text-sm text-green-300">Verim: %85</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
