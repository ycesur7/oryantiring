"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const QRGenerator = dynamic(() => import('@/components/QRGenerator'), {
  ssr: false,
});

interface Checkpoint {
  id: number;
  name: string;
  qrCode: string;
  icon: string;
  color: string;
}

export default function AdminPage() {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

  useEffect(() => {
    fetch('/models/checkpoints.json')
      .then(res => res.json())
      .then(data => setCheckpoints(data));
  }, []);

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link href="/">
            <button className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white hover:bg-slate-800/60 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </button>
          </Link>

          <button
            onClick={handlePrintAll}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-full text-white font-medium transition-colors"
          >
            <Printer className="w-5 h-5" />
            Tümünü Yazdır
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 print:hidden"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            QR Kod Yönetimi
          </h1>
          <p className="text-slate-400">
            Kontrol noktaları için QR kodlarını indirin ve okul bahçesine yerleştirin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checkpoints.map((checkpoint, index) => (
            <motion.div
              key={checkpoint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="print:break-inside-avoid"
            >
              <QRGenerator
                checkpointId={checkpoint.id}
                checkpointName={checkpoint.name}
                qrCode={checkpoint.qrCode}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl p-8 print:hidden"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Kurulum Talimatları</h2>
          
          <div className="space-y-4 text-slate-300">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center">1</div>
              <div>
                <h3 className="font-semibold text-white mb-1">QR Kodları İndirin</h3>
                <p className="text-sm text-slate-400">Her kontrol noktası için QR kodunu indirin veya tümünü yazdırın</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center">2</div>
              <div>
                <h3 className="font-semibold text-white mb-1">Lamine Edin</h3>
                <p className="text-sm text-slate-400">QR kodları hava koşullarına dayanıklı hale getirmek için lamine edin</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center">3</div>
              <div>
                <h3 className="font-semibold text-white mb-1">Okul Bahçesine Yerleştirin</h3>
                <p className="text-sm text-slate-400">Her kontrol noktasını uygun bir yere asın veya yapıştırın</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white font-bold flex items-center justify-center">4</div>
              <div>
                <h3 className="font-semibold text-white mb-1">Test Edin</h3>
                <p className="text-sm text-slate-400">Öğrencilerle birlikte sistemi test edin ve geri bildirim alın</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400">
              <strong>Not:</strong> Demo modunda QR kod okutmaya gerek yoktur. Gerçek kullanımda demo modunu kapatın.
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .glass-card {
            background: white;
            border: 2px solid #000;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
