"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Droplets, Zap, Filter, Sun } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useSystemStore } from "@/store/systemStore";

export default function Simulation() {
  const { isRunning, mode, sensorData, startSimulation, stopSimulation, setMode, updateSensorData } = useSystemStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Mod geçişleri
        if (newProgress === 20) {
          setMode('ec');
          updateSensorData({ ecVoltage: 12.5 });
        } else if (newProgress === 40) {
          setMode('filtering');
          updateSensorData({ turbidity: 15.3 });
        } else if (newProgress === 60) {
          setMode('uv');
          updateSensorData({ uvIntensity: 8.3, turbidity: 2.8 });
        } else if (newProgress === 80) {
          updateSensorData({ ph: 7.2, turbidity: 2.1 });
        } else if (newProgress >= 100) {
          setMode('complete');
          stopSimulation();
          return 100;
        }

        // Sensör değerlerini güncelle
        if (mode === 'filling') {
          updateSensorData({ waterLevel: newProgress * 5 });
        } else if (mode === 'ec') {
          const turbidityReduction = 45.2 - ((newProgress - 20) / 20) * 30;
          updateSensorData({ turbidity: Math.max(turbidityReduction, 15) });
        } else if (mode === 'uv') {
          const phAdjustment = 6.8 + ((newProgress - 60) / 20) * 0.4;
          updateSensorData({ ph: Math.min(phAdjustment, 7.2) });
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const handleStart = () => {
    setProgress(0);
    setMode('filling');
    updateSensorData({
      ph: 6.8,
      turbidity: 45.2,
      waterLevel: 0,
      uvIntensity: 0,
      ecVoltage: 0,
    });
    startSimulation();
  };

  const handleReset = () => {
    stopSimulation();
    setProgress(0);
    setMode('idle');
    updateSensorData({
      ph: 6.8,
      turbidity: 45.2,
      waterLevel: 0,
      uvIntensity: 0,
      ecVoltage: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-white">İnteraktif Simülasyon</h1>
          <p className="text-slate-400">Arıtma sürecini adım adım izleyin</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Arıtma Süreci</h2>
                <div className="flex gap-2">
                  <button
                    onClick={isRunning ? stopSimulation : handleStart}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      isRunning
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isRunning ? 'Durdur' : 'Başlat'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Sıfırla
                  </button>
                </div>
              </div>

              <div className="relative h-96 bg-slate-800/50 rounded-lg overflow-hidden">
                {/* Su Tankı */}
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end">
                  <motion.div
                    className="w-full water-gradient opacity-30"
                    initial={{ height: 0 }}
                    animate={{ height: `${sensorData.waterLevel}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Aşama Göstergeleri */}
                <div className="relative z-10 h-full flex flex-col justify-around p-8">
                  <ProcessStage
                    icon={Droplets}
                    title="1. Gri Su Girişi"
                    active={mode === 'filling'}
                    completed={progress > 20}
                    description="Bulanıklık: 45.2 NTU"
                  />
                  <ProcessStage
                    icon={Zap}
                    title="2. Elektrokoagülasyon"
                    active={mode === 'ec'}
                    completed={progress > 40}
                    description="12.5V - Çökelme başladı"
                  />
                  <ProcessStage
                    icon={Filter}
                    title="3. Filtrasyon"
                    active={mode === 'filtering'}
                    completed={progress > 60}
                    description="500/100 mikron filtreler"
                  />
                  <ProcessStage
                    icon={Sun}
                    title="4. UV-C Dezenfeksiyon"
                    active={mode === 'uv'}
                    completed={progress > 80}
                    description="240 nm - %99.9 inaktivasyon"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">İlerleme</span>
                  <span className="text-sm text-white font-medium">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Anlık Değerler</h3>
              <div className="space-y-4">
                <DataRow label="pH" value={sensorData.ph.toFixed(1)} unit="pH" />
                <DataRow label="Bulanıklık" value={sensorData.turbidity.toFixed(1)} unit="NTU" />
                <DataRow label="Su Seviyesi" value={sensorData.waterLevel.toFixed(0)} unit="%" />
                <DataRow label="UV Yoğunluğu" value={sensorData.uvIntensity.toFixed(1)} unit="mW/cm²" />
                <DataRow label="EC Voltajı" value={sensorData.ecVoltage.toFixed(1)} unit="V" />
              </div>
            </div>

            {mode === 'complete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect rounded-xl p-6 border-2 border-green-500/50"
              >
                <h3 className="text-lg font-semibold mb-2 text-green-400">✓ Arıtma Tamamlandı</h3>
                <p className="text-sm text-slate-300">
                  Su artık sulama ve tuvalet rezervuarı için kullanıma hazır!
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verim:</span>
                    <span className="text-white font-medium">%95.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Süre:</span>
                    <span className="text-white font-medium">~20 dakika</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStage({ icon: Icon, title, active, completed, description }: {
  icon: any;
  title: string;
  active: boolean;
  completed: boolean;
  description: string;
}) {
  return (
    <motion.div
      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
        active ? 'bg-cyan-500/20 border-2 border-cyan-500' : completed ? 'bg-green-500/10' : 'bg-slate-800/50'
      }`}
      animate={active ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: active ? Infinity : 0, duration: 2 }}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        active ? 'bg-cyan-500' : completed ? 'bg-green-500' : 'bg-slate-700'
      }`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      {completed && <div className="text-green-400 text-2xl">✓</div>}
    </motion.div>
  );
}

function DataRow({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-white font-medium">{value} <span className="text-slate-500">{unit}</span></span>
    </div>
  );
}
